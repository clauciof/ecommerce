"use client"
import { isFirebaseInitialized } from "@/lib/firebase"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag, Heart, Star } from "lucide-react"
import styles from "./styles/navigation.module.css"
import heroStyles from "./styles/hero.module.css"
import productStyles from "./styles/products.module.css"
import aboutStyles from "./styles/about.module.css"
import footerStyles from "./styles/footer.module.css"
import { useEffect, useState } from "react"
import { ProductModel } from "@/models/product"
import { getFeaturedProducts, getProducts } from "@/services/products_service"

// const featuredProducts = [
//   {
//     id: 1,
//     name: "Boho Crochet Skirt",
//     price: 89.99,
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 5,
//     reviews: 12,
//   },
//   {
//     id: 2,
//     name: "Chunky Knit Scarf",
//     price: 45.99,
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 5,
//     reviews: 8,
//   },
//   {
//     id: 3,
//     name: "Summer Bucket Hat",
//     price: 32.99,
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 4,
//     reviews: 15,
//   },
//   {
//     id: 4,
//     name: "Crochet Bucket Bag",
//     price: 65.99,
//     image: "/placeholder.svg?height=300&width=300",
//     rating: 5,
//     reviews: 9,
//   },
// ]

export default function HomePage() {
  const [featuredProducts, setfeaturedProducts] = useState<ProductModel[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getFeaturedProducts()
      setfeaturedProducts(products)
    }

    fetchProducts()
  }, [])

  // Checa inicialização do Firebase e faz log
  if (typeof window !== "undefined") {
    if (isFirebaseInitialized()) {
      console.log("Firebase inicializado com sucesso!");
    } else {
      console.error("Falha ao inicializar o Firebase.");
    }
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.navContent}>
            <Link href="/" className={styles.logo}>
              Ponto Final
            </Link>

            <div className={styles.navActions}>
              <Button variant="ghost" size="icon" className={styles.navButton}>
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className={styles.navButton}>
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Product Menu Bar */}
      <div className={styles.productMenuBar}>
        <div className={styles.productMenuContainer}>
          <div className={styles.productMenuContent}>
            <Link href="/products" className={styles.productMenuLink}>
              All Products
            </Link>
            <Link href="/products?category=skirts" className={styles.productMenuLink}>
              Skirts
            </Link>
            <Link href="/products?category=scarfs" className={styles.productMenuLink}>
              Scarfs
            </Link>
            <Link href="/products?category=buckets" className={styles.productMenuLink}>
              Buckets
            </Link>
            <Link href="/products?category=hats" className={styles.productMenuLink}>
              Hats
            </Link>
            <Link href="/products?category=cardigans" className={styles.productMenuLink}>
              Cardigans
            </Link>
            <Link href="/products?category=bags" className={styles.productMenuLink}>
              Bags
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className={heroStyles.heroSection}>
        <div className={heroStyles.heroContainer}>
          <div className={heroStyles.heroGrid}>
            <div>
              <h1 className={heroStyles.heroTitle}>Handcrafted with Love</h1>
              <p className={heroStyles.heroDescription}>
                Discover our collection of beautiful, handmade crochet pieces. Each item is carefully crafted with
                premium yarns and attention to detail.
              </p>
              <div className={heroStyles.heroActions}>
                <Button size="lg" className={heroStyles.heroPrimaryButton}>
                  Shop Collection
                </Button>
                <Button variant="outline" size="lg" className={heroStyles.heroSecondaryButton}>
                  Learn Our Story
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Beautiful crochet products"
                width={500}
                height={500}
                className={heroStyles.heroImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className={productStyles.productsSection}>
        <div className={productStyles.productsContainer}>
          <div className={productStyles.productsHeader}>
            <h2 className={productStyles.productsTitle}>Featured Products</h2>
            <p className={productStyles.productsDescription}>
              Explore our most popular handcrafted pieces, each one unique and made with care.
            </p>
          </div>

          <div className={productStyles.productsGrid}>
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <Card className={`group ${productStyles.productCard}`}>
                  <CardContent className="p-0">
                    <div className={productStyles.productImageContainer}>
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
                        className={`${productStyles.productFavoriteButton} group-hover:opacity-100`}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className={productStyles.productContent}>
                      <h3 className={productStyles.productName}>{product.Name}</h3>
                      <div className={productStyles.productRating}>
                        {/* <div className={productStyles.productStars}>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`${productStyles.productStar} ${
                                i < product.rating ? productStyles.productStarFilled : productStyles.productStarEmpty
                              }`}
                            />
                          ))}
                        </div> */}
                        {/* <span className={productStyles.productReviews}>({product.reviews})</span> */}
                      </div>
                      <p className={productStyles.productPrice}>${product.Price}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className={productStyles.loadMoreContainer}>
            <Link href="/products">
              <Button variant="outline" size="lg" className={productStyles.loadMoreButton}>
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={aboutStyles.aboutSection}>
        <div className={aboutStyles.aboutContainer}>
          <div className={aboutStyles.aboutGrid}>
            <div>
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Artisan at work"
                width={500}
                height={400}
                className={aboutStyles.aboutImage}
              />
            </div>
            <div>
              <h2 className={aboutStyles.aboutTitle}>Crafted by Hand, Made with Heart</h2>
              <p className={aboutStyles.aboutDescription}>
                Every piece in our collection is lovingly handcrafted using traditional crochet techniques passed down
                through generations. We use only the finest natural fibers and sustainable materials.
              </p>
              <p className={aboutStyles.aboutDescription}>
                From cozy scarfs perfect for chilly evenings to elegant skirts that make a statement, each item tells a
                story of craftsmanship and care.
              </p>
              <Button className={aboutStyles.aboutButton}>Learn More About Us</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={footerStyles.footer}>
        <div className={footerStyles.footerContainer}>
          <div className={footerStyles.footerGrid}>
            <div>
              <h3 className={footerStyles.footerBrand}>Ponto Final</h3>
              <p className={footerStyles.footerDescription}>
                Handcrafted crochet pieces made with love and attention to detail.
              </p>
            </div>
            <div>
              <h4 className={footerStyles.footerSectionTitle}>Shop</h4>
              <ul className={footerStyles.footerList}>
                <li>
                  <Link href="/products" className={footerStyles.footerLink}>
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=skirts" className={footerStyles.footerLink}>
                    Skirts
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=scarfs" className={footerStyles.footerLink}>
                    Scarfs
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=buckets" className={footerStyles.footerLink}>
                    Buckets
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className={footerStyles.footerSectionTitle}>Support</h4>
              <ul className={footerStyles.footerList}>
                <li>
                  <Link href="/contact" className={footerStyles.footerLink}>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className={footerStyles.footerLink}>
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className={footerStyles.footerLink}>
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/care" className={footerStyles.footerLink}>
                    Care Instructions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className={footerStyles.footerSectionTitle}>Connect</h4>
              <ul className={footerStyles.footerList}>
                <li>
                  <Link href="#" className={footerStyles.footerLink}>
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className={footerStyles.footerLink}>
                    Pinterest
                  </Link>
                </li>
                <li>
                  <Link href="#" className={footerStyles.footerLink}>
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className={footerStyles.footerLink}>
                    Newsletter
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={footerStyles.footerBottom}>
            <p>&copy; 2024 Ponto Final. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
