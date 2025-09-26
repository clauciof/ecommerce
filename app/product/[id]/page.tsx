"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Star, ShoppingBag, Minus, Plus, ArrowLeft } from "lucide-react"
import productDetailStyles from "../../styles/productDetail.module.css"
import { ProductModel } from "@/models/product"
import { getProductById } from "../../../services/products_service"

// Mock product data
// const product = {
//   id: 1,
//   name: "Boho Crochet Skirt",
//   price: 89.99,
//   category: "skirts",
//   images: [
//     "/placeholder.svg?height=500&width=500",
//     "/placeholder.svg?height=500&width=500",
//     "/placeholder.svg?height=500&width=500",
//   ],
//   rating: 5,
//   reviews: 12,
//   colors: ["Cream", "Sage", "Terracotta"],
//   sizes: ["XS", "S", "M", "L", "XL"],
//   description:
//     "This beautiful boho-style crochet skirt is handcrafted with premium cotton yarn. Perfect for summer days or layered for cooler weather. The intricate stitch pattern creates a flowing, feminine silhouette that's both comfortable and stylish.",
//   features: [
//     "100% premium cotton yarn",
//     "Handcrafted with traditional techniques",
//     "Comfortable elastic waistband",
//     "Machine washable (gentle cycle)",
//     "Made to order - allow 2-3 weeks",
//   ],
//   careInstructions:
//     "Machine wash cold on gentle cycle. Lay flat to dry. Do not bleach or iron directly on crochet work.",
// }

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null)
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const params = useParams()
  const id = params.id as string

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProductById(id)
      console.log(product)
      setSelectedProduct(product)
    }

    fetchProduct()
  }, [id])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-semibold text-gray-900">
              Ponto Final
            </Link>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Product Menu Bar */}
      <div className="bg-gray-50 border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-12 space-x-8 overflow-x-auto">
            <Link
              href="/products"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium whitespace-nowrap py-2 px-3 rounded-md hover:bg-white"
            >
              All Products
            </Link>
            <Link
              href="/products?category=skirts"
              className="text-gray-900 font-medium text-sm whitespace-nowrap py-2 px-3 rounded-md bg-white shadow-sm"
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
        {/* Breadcrumb */}
        <div className={productDetailStyles.breadcrumb}>
          <Link href="/" className={productDetailStyles.breadcrumbLink}>
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className={productDetailStyles.breadcrumbLink}>
            Products
          </Link>
          <span>/</span>
          <span className={productDetailStyles.breadcrumbCurrent}>{selectedProduct?.Name}</span>
        </div>

        <div className={productDetailStyles.productDetailGrid}>
          {/* Product Images */}
          <div>
            <div className="mb-6">
              <Image
                src={selectedProduct?.image_url[selectedImage] || "/placeholder.svg"}
                alt={selectedProduct?.Name || "Product image"}
                width={100}
                height={100}
                className={productDetailStyles.productImageMain}
              />
            </div>
            <div className={productDetailStyles.productImageThumbnails}>
              {selectedProduct?.image_url.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`${productDetailStyles.productImageThumbnail} ${
                    selectedImage === index
                      ? productDetailStyles.productImageThumbnailActive
                      : productDetailStyles.productImageThumbnailInactive
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${selectedProduct?.Name} ${index + 1}`}
                    width={100}
                    height={100}
                    className={productDetailStyles.productImageThumbnailImage}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className={productDetailStyles.productDetailInfo}>
              <Badge className={productDetailStyles.productDetailBadge}>{selectedProduct?.Category}</Badge>
              <h1 className={productDetailStyles.productDetailTitle}>{selectedProduct?.Name}</h1>
              {/* <div className={productDetailStyles.productDetailRating}>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < product.rating ? "text-blue-500 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 ml-2">({product.reviews} reviews)</span>
              </div> */}
              <p className={productDetailStyles.productDetailPrice}>${selectedProduct?.Price}</p>
            </div>

            <div className={productDetailStyles.productOptions}>
              {/* Color Selection */}
              {/* <div>
                <label className={productDetailStyles.productOptionLabel}>Color</label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger className={productDetailStyles.productOptionSelect}>
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}

              {/* Size Selection */}
              {/* <div>
                <label className={productDetailStyles.productOptionLabel}>Size</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className={productDetailStyles.productOptionSelect}>
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}

              {/* Quantity */}
              <div>
                <label className={productDetailStyles.productOptionLabel}>Quantity</label>
                <div className={productDetailStyles.quantityControls}>
                  <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className={productDetailStyles.quantityDisplay}>{quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className={productDetailStyles.productActions}>
                <Link href="/checkout" className="flex-1">
                  <Button
                    size="lg"
                    className={productDetailStyles.buyNowButton}
                    disabled={!selectedColor || !selectedSize}
                  >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Buy Now
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className={productDetailStyles.productTabs}>
          <Tabs defaultValue="description" className="w-full">
            <TabsList className={productDetailStyles.productTabsList}>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="care">Care Instructions</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className={productDetailStyles.productTabsContent}>
              <div className="prose max-w-none">
                <p className={productDetailStyles.productDescription}>{selectedProduct?.Description}</p>
              </div>
            </TabsContent>
            {/* <TabsContent value="features" className={productDetailStyles.productTabsContent}>
              <ul className={productDetailStyles.productFeaturesList}>
                {product.features.map((feature, index) => (
                  <li key={index} className={productDetailStyles.productFeatureItem}>
                    <span className={productDetailStyles.productFeatureBullet}></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </TabsContent> */}
            {/* <TabsContent value="care" className={productDetailStyles.productTabsContent}>
              <p className={productDetailStyles.productDescription}>{product.careInstructions}</p>
            </TabsContent> */}
          </Tabs>
        </div>

        {/* Back to Products */}
        <div className="mt-16">
          <Link href="/products">
            <Button variant="outline" className={productDetailStyles.backButton}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
