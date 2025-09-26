"use client"

import type React from "react"
import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Plus, 
  Check, 
  AlertCircle, 
  ShoppingBag,
  Camera
} from "lucide-react"

import styles from "../styles/navigation.module.css"
import adminStyles from "../styles/admin.module.css"
import { createProduct } from "@/services/products_service"

// Product categories
const CATEGORIES = [
  { value: "skirts", label: "Saias" },
  { value: "scarfs", label: "Echarpes" },
  { value: "buckets", label: "Baldes" },
  { value: "hats", label: "Chapéus" },
  { value: "cardigans", label: "Cardigãs" },
  { value: "bags", label: "Bolsas" },
]

interface ProductFormData {
  name: string
  description: string
  price: string
  category: string
}

interface ImageFile {
  file: File
  preview: string
  id: string
}

export default function AdminPage() {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    category: "",
  })
  
  const [images, setImages] = useState<ImageFile[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [errors, setErrors] = useState<Partial<ProductFormData>>({})
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach(file => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Por favor, selecione apenas arquivos de imagem.' })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Imagem muito grande. Máximo 5MB por imagem.' })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const newImage: ImageFile = {
          file,
          preview: e.target?.result as string,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
        }
        setImages(prev => [...prev, newImage])
      }
      reader.readAsDataURL(file)
    })

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeImage = (imageId: string) => {
    setImages(prev => prev.filter(img => img.id !== imageId))
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome do produto é obrigatório"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Descrição é obrigatória"
    }

    if (!formData.price.trim()) {
      newErrors.price = "Preço é obrigatório"
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Preço deve ser um número válido maior que zero"
    }

    if (!formData.category) {
      newErrors.category = "Categoria é obrigatória"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const uploadImagesToStorage = async (images: ImageFile[]): Promise<string[]> => {
    // Simulated image upload - replace with actual upload logic
    // This would typically upload to Firebase Storage, AWS S3, etc.
    return images.map((_, index) => `https://storage.example.com/products/${Date.now()}_${index}.jpg`)
  }

  const createProductInAPI = async (productData: {
    Name: string
    Description: string
    Price: number
    Category: string
    image_url: string[]
    storage_url: string[]
  }) => {
    return await createProduct(productData)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (!validateForm()) {
      setMessage({ type: 'error', text: 'Por favor, corrija os erros no formulário.' })
      return
    }

    if (images.length === 0) {
      setMessage({ type: 'error', text: 'Adicione pelo menos uma imagem do produto.' })
      return
    }

    setIsSubmitting(true)

    try {
      // Upload images
      const imageUrls = await uploadImagesToStorage(images)
      
      // Prepare product data
      const productData = {
        Name: formData.name,
        Description: formData.description,
        Price: Number(formData.price),
        Category: formData.category,
        image_url: imageUrls,
        storage_url: imageUrls, // Same as image_url for now
      }

      // Create product
      await createProductInAPI(productData)

      // Success
      setMessage({ type: 'success', text: 'Produto criado com sucesso!' })
      
      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
      })
      setImages([])
      setErrors({})

    } catch (error) {
      console.error('Error creating product:', error)
      setMessage({ 
        type: 'error', 
        text: 'Erro ao criar produto. Tente novamente.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={adminStyles.adminContainer}>
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-semibold text-gray-900">
              Ponto Final
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className={adminStyles.adminContent}>
        {/* Header */}
        <div className={adminStyles.adminHeader}>
          <div className={adminStyles.navigationLinks}>
            <Link href="/" className={adminStyles.navigationLink}>
              <ArrowLeft className="h-4 w-4 mr-2 inline" />
              Voltar para loja
            </Link>
            <Link href="/products" className={adminStyles.navigationLink}>
              Ver produtos
            </Link>
          </div>
          <h1 className={adminStyles.adminTitle}>Painel Administrativo</h1>
          <p className={adminStyles.adminSubtitle}>
            Adicione novos produtos de roupas e artigos de crochê
          </p>
        </div>

        {/* Messages */}
        {message && (
          <div className={message.type === 'success' ? adminStyles.successMessage : adminStyles.errorMessage}>
            <div className={message.type === 'success' ? adminStyles.successMessageContent : adminStyles.errorMessageContent}>
              {message.type === 'success' ? (
                <Check className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <span>{message.text}</span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className={adminStyles.adminForm}>
          {/* Product Information */}
          <Card className={adminStyles.adminCard}>
            <CardHeader className={adminStyles.adminCardHeader}>
              <CardTitle className={adminStyles.adminCardTitle}>Informações do Produto</CardTitle>
            </CardHeader>
            <CardContent className={adminStyles.adminCardContent}>
              <div className={adminStyles.gridTwoColumns}>
                <div className={adminStyles.formGroup}>
                  <Label htmlFor="name" className={adminStyles.formLabel}>
                    Nome do Produto <span className={adminStyles.requiredIndicator}>*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={adminStyles.formInput}
                    placeholder="Ex: Saia Crochê Boho"
                  />
                  {errors.name && <div className={adminStyles.fieldError}>{errors.name}</div>}
                </div>

                <div className={adminStyles.formGroup}>
                  <Label htmlFor="category" className={adminStyles.formLabel}>
                    Categoria <span className={adminStyles.requiredIndicator}>*</span>
                  </Label>
                  <Select onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className={adminStyles.formSelect}>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <div className={adminStyles.fieldError}>{errors.category}</div>}
                </div>
              </div>

              <div className={adminStyles.formGroup}>
                <Label htmlFor="price" className={adminStyles.formLabel}>
                  Preço (R$) <span className={adminStyles.requiredIndicator}>*</span>
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className={adminStyles.formInput}
                  placeholder="0.00"
                />
                {errors.price && <div className={adminStyles.fieldError}>{errors.price}</div>}
              </div>

              <div className={adminStyles.formGroup}>
                <Label htmlFor="description" className={adminStyles.formLabel}>
                  Descrição <span className={adminStyles.requiredIndicator}>*</span>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className={adminStyles.formTextarea}
                  placeholder="Descreva o produto, materiais, tamanhos disponíveis, etc."
                  rows={4}
                />
                {errors.description && <div className={adminStyles.fieldError}>{errors.description}</div>}
              </div>
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card className={adminStyles.adminCard}>
            <CardHeader className={adminStyles.adminCardHeader}>
              <CardTitle className={adminStyles.adminCardTitle}>Imagens do Produto</CardTitle>
            </CardHeader>
            <CardContent className={adminStyles.adminCardContent}>
              <div className={adminStyles.imageUploadSection}>
                <div 
                  className={adminStyles.imageUploadArea}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className={adminStyles.imageUploadContent}>
                    <Camera className={adminStyles.imageUploadIcon} />
                    <div className={adminStyles.imageUploadText}>
                      Clique para adicionar imagens
                    </div>
                    <div className={adminStyles.imageUploadSubtext}>
                      PNG, JPG até 5MB cada
                    </div>
                  </div>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Image Previews */}
                {images.length > 0 && (
                  <div className={adminStyles.imagePreviewGrid}>
                    {images.map((image) => (
                      <div key={image.id} className={`${adminStyles.imagePreviewItem} group`}>
                        <Image
                          src={image.preview}
                          alt="Preview"
                          width={100}
                          height={100}
                          className={adminStyles.imagePreview}
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className={adminStyles.imageRemoveButton}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button 
            type="submit" 
            size="lg" 
            disabled={isSubmitting}
            className={`${adminStyles.submitButton} ${isSubmitting ? adminStyles.submitButtonLoading : ''}`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Criando produto...
              </>
            ) : (
              <>
                <Plus className="h-5 w-5" />
                Criar Produto
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
