import axios from "axios"

export async function getProducts() {
  let url = "http://localhost:5001/ponto-final-270d8/us-central1/api/products/"

  const res = await axios.get(url)
  if (res.status !== 200) throw new Error("Erro ao buscar produtos")

  return res.data
}

export async function getProductById(id: string) {
  let url = `http://localhost:5001/ponto-final-270d8/us-central1/api/product/${id}`

  const res = await axios.get(url)
  if (res.status !== 200) throw new Error("Erro ao buscar produto")

  return res.data
}

export async function getFeaturedProducts() {
  let url = `http://localhost:5001/ponto-final-270d8/us-central1/api/products/`

  const res = await axios.get(url)
  if (res.status !== 200) throw new Error("Erro ao buscar produto")

  return res.data
}

export async function createProduct(productData: {
  Name: string
  Description: string
  Price: number
  Category: string
  image_url: string[]
  storage_url: string[]
}) {
  let url = "http://localhost:5001/ponto-final-270d8/us-central1/api/products/"

  const res = await axios.post(url, productData)
  if (res.status !== 200 && res.status !== 201) throw new Error("Erro ao criar produto")

  return res.data
}