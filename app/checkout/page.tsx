"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, CreditCard, Smartphone, Lock, ShoppingBag, Heart } from "lucide-react"

import styles from "../styles/navigation.module.css"
import checkoutStyles from "../styles/checkout.module.css"

// Mock cart data
const cartItems = [
  {
    id: 1,
    name: "Boho Crochet Skirt",
    price: 89.99,
    quantity: 1,
    color: "Sage",
    size: "M",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("credit")
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    pixKey: "",
  })

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 15.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle payment processing here
    alert(`Payment processed via ${paymentMethod === "credit" ? "Credit Card" : "PIX"}!`)
  }

  return (
    <div className={checkoutStyles.checkoutContainer}>
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
      <nav className={styles.navigation}>
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
      </nav>

      <div className={checkoutStyles.checkoutContent}>
        {/* Header */}
        <div className={checkoutStyles.checkoutHeader}>
          <Link href="/products" className={checkoutStyles.checkoutBackLink}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shopping
          </Link>
          <h1 className={checkoutStyles.checkoutTitle}>Checkout</h1>
        </div>

        <div className={checkoutStyles.checkoutGrid}>
          {/* Checkout Form */}
          <div>
            <form onSubmit={handleSubmit} className={checkoutStyles.checkoutForm}>
              {/* Contact Information */}
              <Card className={checkoutStyles.checkoutCard}>
                <CardHeader className={checkoutStyles.checkoutCardHeader}>
                  <CardTitle className={checkoutStyles.checkoutCardTitle}>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className={checkoutStyles.checkoutCardContent}>
                  <div>
                    <Label htmlFor="email" className={checkoutStyles.checkoutLabel}>
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className={checkoutStyles.checkoutInput}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className={checkoutStyles.checkoutCard}>
                <CardHeader className={checkoutStyles.checkoutCardHeader}>
                  <CardTitle className={checkoutStyles.checkoutCardTitle}>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className={checkoutStyles.checkoutCardContent}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select onValueChange={(value) => handleInputChange("state", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sp">São Paulo</SelectItem>
                          <SelectItem value="rj">Rio de Janeiro</SelectItem>
                          <SelectItem value="mg">Minas Gerais</SelectItem>
                          <SelectItem value="rs">Rio Grande do Sul</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className={checkoutStyles.checkoutCard}>
                <CardHeader className={checkoutStyles.checkoutCardHeader}>
                  <CardTitle className={checkoutStyles.checkoutCardTitle}>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="credit" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Credit Card
                      </TabsTrigger>
                      <TabsTrigger value="pix" className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        PIX
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="credit" className="space-y-4 mt-6">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={(e) => handleInputChange("cvv", e.target.value)}
                            required
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="pix" className="space-y-4 mt-6">
                      <div className="text-center p-6 bg-gray-50 rounded-lg">
                        <Smartphone className="h-12 w-12 mx-auto mb-4 text-gray-600" />
                        <h3 className="text-lg font-semibold mb-2">Pay with PIX</h3>
                        <p className="text-gray-600 mb-4">
                          After clicking "Complete Order", you'll receive a QR code to complete your payment via PIX.
                        </p>
                        <div className="text-sm text-gray-500">
                          <p>• Instant payment confirmation</p>
                          <p>• Available 24/7</p>
                          <p>• Secure and encrypted</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Complete Order Button */}
              <Button type="submit" size="lg" className={checkoutStyles.completeOrderButton}>
                <Lock className="h-5 w-5 mr-2" />
                Complete Order - ${total.toFixed(2)}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className={checkoutStyles.orderSummary}>
              <CardHeader>
                <CardTitle className={checkoutStyles.checkoutCardTitle}>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className={checkoutStyles.checkoutCardContent}>
                {/* Cart Items */}
                {cartItems.map((item) => (
                  <div key={item.id} className={checkoutStyles.orderItem}>
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className={checkoutStyles.orderItemImage}
                    />
                    <div className={checkoutStyles.orderItemInfo}>
                      <h3 className={checkoutStyles.orderItemName}>{item.name}</h3>
                      <p className={checkoutStyles.orderItemDetails}>
                        {item.color} • {item.size} • Qty: {item.quantity}
                      </p>
                      <p className={checkoutStyles.orderItemPrice}>${item.price}</p>
                    </div>
                  </div>
                ))}

                <Separator />

                {/* Order Totals */}
                <div className={checkoutStyles.orderTotals}>
                  <div className={checkoutStyles.orderTotalRow}>
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className={checkoutStyles.orderTotalRow}>
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className={checkoutStyles.orderTotalRow}>
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className={checkoutStyles.orderTotalFinal}>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Notice */}
                <div className={checkoutStyles.securityNotice}>
                  <div className={checkoutStyles.securityNoticeContent}>
                    <Lock className="h-4 w-4" />
                    <span>Your payment information is secure and encrypted</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
