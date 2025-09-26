// lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!
};

let app: FirebaseApp;
let analytics: ReturnType<typeof getAnalytics> | undefined;
let initialized = false;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  initialized = true;
  if (typeof window !== "undefined") {
    isSupported().then((yes) => {
      if (yes) analytics = getAnalytics(app);
    });
  }
} catch (error) {
  initialized = false;
  console.error("Erro ao inicializar o Firebase:", error);
}

export { app, analytics };

export function isFirebaseInitialized() {
  return initialized;
}