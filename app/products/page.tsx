"use client"
import { useState, useEffect, use } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Star, Filter, ShoppingBag } from "lucide-react"
import styles from "../styles/navigation.module.css"
import productStyles from "../styles/products.module.css"
import filterStyles from "../styles/filters.module.css"
import { getProducts } from "../../services/products_service"
import { ProductModel } from "../../models/product"

// const products = [
//   {
//     id: 1,
//     name: "Boho Crochet Skirt",
//     price: 89.99,
//     category: "skirts",
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 5,
//     reviews: 12,
//     colors: ["Cream", "Sage", "Terracotta"],
//   },
//   {
//     id: 2,
//     name: "Chunky Knit Scarf",
//     price: 45.99,
//     category: "scarfs",
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 5,
//     reviews: 8,
//     colors: ["Charcoal", "Oatmeal", "Rust"],
//   },
//   {
//     id: 3,
//     name: "Summer Bucket Hat",
//     price: 32.99,
//     category: "hats",
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 4,
//     reviews: 15,
//     colors: ["Natural", "Sage", "Lavender"],
//   },
//   {
//     id: 4,
//     name: "Crochet Bucket Bag",
//     price: 65.99,
//     category: "buckets",
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 5,
//     reviews: 9,
//     colors: ["Natural", "Black", "Sage"],
//   },
//   {
//     id: 5,
//     name: "Vintage Midi Skirt",
//     price: 95.99,
//     category: "skirts",
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 5,
//     reviews: 9,
//     colors: ["Sage", "Cream", "Terracotta"],
//   },
//   {
//     id: 6,
//     name: "Infinity Scarf",
//     price: 38.99,
//     category: "scarfs",
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 4,
//     reviews: 11,
//     colors: ["Oatmeal", "Charcoal", "Sage"],
//   },
//   {
//     id: 7,
//     name: "Market Bucket Tote",
//     price: 72.99,
//     category: "buckets",
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 5,
//     reviews: 14,
//     colors: ["Natural", "Cream", "Sage"],
//   },
//   {
//     id: 8,
//     name: "Open Front Cardigan",
//     price: 110.99,
//     category: "cardigans",
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 4,
//     reviews: 13,
//     colors: ["Cream", "Dusty Rose", "Sage"],
//   },
//   {
//     id: 9,
//     name: "Open Front Bag",
//     price: 110.99,
//     category: "bags",
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 4,
//     reviews: 13,
//     colors: ["Cream", "Dusty Rose", "Sage"],
//   },
//   {
//     id: 10,
//     name: "Open Front Shirt",
//     price: 110.99,
//     category: "shirts",
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 4,
//     reviews: 13,
//     colors: ["Cream", "Dusty Rose", "Sage"],
//   },
// ]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [products, setProducts] = useState<ProductModel[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";

  if (categoryParam) {
    useEffect(() => {
      setSelectedCategory(categoryParam)
    }, [categoryParam])
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts()
      setProducts(products)
    }

    fetchProducts()
  }, [])

  const filteredProducts = products.filter(
    (product) => selectedCategory === "all" || product.Category === selectedCategory,
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.Price - b.Price
      case "price-high":
        return b.Price - a.Price
      // case "rating":
      //   return b.Rating - a.Rating
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.navTitle}>
            Ponto Final
          </Link>

          <div className={styles.navButtons}>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
              <ShoppingBag className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Product Menu Bar */}
      <div className="bg-gray-50 border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-12 space-x-8 overflow-x-auto">
            <Link
              href="/products"
              className="text-gray-900 font-medium text-sm whitespace-nowrap py-2 px-3 rounded-md bg-white shadow-sm"
            >
              All Products
            </Link>
            <Link
              href="/products?category=skirts"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium whitespace-nowrap py-2 px-3 rounded-md hover:bg-white"
            >
              Skirts
            </Link>
            <Link
              href="/products?category=scarfs"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium whitespace-nowrap py-2 px-3 rounded-md hover:bg-white"
            >
              Scarfs
            </Link>
            <Link
              href="/products?category=buckets"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium whitespace-nowrap py-2 px-3 rounded-md hover:bg-white"
            >
              Buckets
            </Link>
            <Link
              href="/products?category=hats"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium whitespace-nowrap py-2 px-3 rounded-md hover:bg-white"
            >
              Hats
            </Link>
            <Link
              href="/products?category=cardigans"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium whitespace-nowrap py-2 px-3 rounded-md hover:bg-white"
            >
              Cardigans
            </Link>
            <Link
              href="/products?category=bags"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium whitespace-nowrap py-2 px-3 rounded-md hover:bg-white"
            >
              Bags
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">Our Collection</h1>
          <p className="text-gray-600 text-lg">
            Discover our handcrafted crochet pieces, each one unique and made with love.
          </p>
        </div>

        {/* Filters */}
        <div className={filterStyles.filtersContainer}>
          <div className={filterStyles.filtersLabel}>
            <Filter className={filterStyles.filtersIcon} />
            <span className={filterStyles.filtersText}>Filter by:</span>
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className={filterStyles.filterSelect}>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="skirts">Skirts</SelectItem>
              <SelectItem value="scarfs">Scarfs</SelectItem>
              <SelectItem value="buckets">Buckets</SelectItem>
              <SelectItem value="hats">Hats</SelectItem>
              <SelectItem value="shirts">Shirts</SelectItem>
              <SelectItem value="bags">Bags</SelectItem>
              <SelectItem value="cardigans">Cardigans</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className={filterStyles.filterSelect}>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              {/* <SelectItem value="rating">Highest Rated</SelectItem> */}
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div className={productStyles.productsGrid}>
          {sortedProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <Card className={`group ${productStyles.productCard}`}>
                <CardContent className={productStyles.productCardContent}>
                  <div className={productStyles.imageContainer}>
                    <Image
                      src={product.image_url[0] || "/placeholder.svg"}
                      alt={product.Name}
                      width={300}
                      height={300}
                      className={`${productStyles.productImage} group-hover:scale-105`}
                    />
                    <Button
                      size="icon"
                      variant="secondary"
                      className={`${productStyles.wishlistButton} group-hover:opacity-100`}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Badge className={productStyles.productBadge}>{product.Category}</Badge>
                  </div>
                  <div className={productStyles.productInfo}>
                    <h3 className={productStyles.productTitle}>{product.Name}</h3>
                    {/* <div className={productStyles.productRating}>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < product.rating ? "text-blue-500 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                    </div> */}
                    {/* <div className={productStyles.productColors}>
                      {product.colors.map((color) => (
                        <Badge key={color} variant="outline" className="text-xs">
                          {color}
                        </Badge>
                      ))}
                    </div> */}
                    <p className={productStyles.productPrice}>R${product.Price}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 bg-transparent hover:bg-gray-50">
            Load More Products
          </Button>
        </div>
      </div>
    </div>
  )
}
