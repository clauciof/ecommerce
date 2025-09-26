# ---- Base com Node 20 ----
FROM node:20-alpine AS base
WORKDIR /app
# libs comuns para Next/sharp no Alpine
RUN apk add --no-cache libc6-compat
# habilita pnpm via corepack
RUN corepack enable

# ---- Dependências (cache eficiente) ----
FROM base AS deps
# Ferramentas de build só nesta fase (se algum módulo nativo precisar)
RUN apk add --no-cache python3 make g++
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---- Build de produção ----
FROM base AS builder
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Build (se houver output 'standalone', Next vai gerar .next/standalone/server.js)
RUN pnpm build

# ---- Runner enxuto ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
# usuário não-root
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Se existir bundle standalone, copiamos ele; também copiamos assets estáticos e public
# Além disso, copiamos node_modules + package.json para fallback com `next start`
COPY --from=builder /app/.next/standalone ./        # pode não existir; ok
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=deps    /app/node_modules ./node_modules
# Copiamos também o .next/. Se standalone existir, não é estritamente necessário,
# mas ajuda no fallback quando for `next start`.
COPY --from=builder /app/.next ./.next

USER nextjs
EXPOSE 3000
# Tenta rodar standalone; se não existir server.js, cai para next start
CMD ["/bin/sh","-lc","(test -f server.js && node server.js) || (test -f ./server.js && node ./server.js) || pnpm start"]
