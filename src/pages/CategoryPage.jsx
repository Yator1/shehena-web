import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { productService } from '../services/productService'
import ProductCard from '../components/products/ProductCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const CategoryPage = () => {
  const { categoryId } = useParams()
  const [category, setCategory] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('name')
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Fetch category data and products
        const categories = await productService.getCategories()
        const categoryData = categories.find(cat => cat.id === categoryId)
        const productsData = await productService.getProductsByCategory(categoryId)
        
        setCategory(categoryData)
        setProducts(productsData)
      } catch (error) {
        console.error('Error fetching category data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [categoryId])
  
  const getSortedProducts = () => {
    switch (sortBy) {
      case 'name':
        return [...products].sort((a, b) => a.name.localeCompare(b.name))
      case 'price-low':
        return [...products].sort((a, b) => a.price - b.price)
      case 'price-high':
        return [...products].sort((a, b) => b.price - a.price)
      default:
        return products
    }
  }
  
  const sortedProducts = getSortedProducts()
  
  if (loading) {
    return <LoadingSpinner fullPage />
  }
  
  if (!category) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Category not found
        </h2>
        <p className="text-gray-400">
          The category you are looking for does not exist.
        </p>
      </div>
    )
  }
  
  return (
    <div className="space-y-8">
      {/* Category Header */}
      <div className="relative h-48 md:h-64 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 to-dark-800/40" />
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
              {category.name}
            </h1>
            <p className="text-gray-200 md:text-lg max-w-2xl">
              {category.description}
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Products Section */}
      <div>
        {/* Filters and Sorting */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="text-gray-300">
              {sortedProducts.length} products
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <label htmlFor="sort-by" className="text-gray-300 text-sm">
              Sort by:
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-dark-700 border-dark-600 text-gray-300 text-sm rounded-md focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="name">Name</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
            </select>
          </div>
        </div>
        
        {/* Product Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryPage