import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShoppingCart, FiPlus, FiMinus, FiArrowLeft } from 'react-icons/fi'
import { productService } from '../services/productService'
import { useCart } from '../contexts/CartContext'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ProductCard from '../components/products/ProductCard'

const ProductDetailPage = () => {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { addToCart, cartItems, updateQuantity } = useCart()
  
  // Check if product is in cart
  const cartItem = cartItems.find(item => item && product && item.id === product.id)
  const isInCart = !!cartItem
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Fetch product data
        const productData = await productService.getIndividualProduct(productId)
        setProduct(productData)
        
        // Fetch related products (same category)
        const categoryProducts = await productService.getProductsByCategory(productData.category)
        const filtered = categoryProducts.filter(p => p.id !== productId).slice(0, 4)
        const categories = await productService.getCategories();
        const found = categories.find(
          (cat) => cat.id === productData.category_id
        );
        productData.categoryName = found?.name || "Category";
        productData.categoryId = productData.category_id;
        setRelatedProducts(filtered)
      } catch (error) {
        console.error('Error fetching product data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [productId])
  
  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, value)
    setQuantity(newQuantity)
  }
  
  const handleAddToCart = () => {
    if (!product.variation_id || !product.product_id) {
      alert("Product variant not found.");
      return;
    }

    const enrichedProduct = {
      ...product,
      quantity,
    };

    if (isInCart) {
      updateQuantity(product.variation_id, cartItem.quantity + quantity);
    } else {
      addToCart(enrichedProduct, quantity);
    }
  };
  
  
  
  if (loading) {
    return <LoadingSpinner fullPage />
  }
  
  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-display font-bold text-white mb-2">
          Product not found
        </h2>
        <p className="text-gray-400">
          The product you are looking for does not exist.
        </p>
      </div>
    )
  }
  
  return (
    <div className="space-y-12">
      {/* Back Button */}
      <Link 
        to={`/category/${product.category_id}`}
        className="inline-flex items-center text-gray-300 hover:text-accent-400 transition-colors mb-4"
      >
        <FiArrowLeft className="mr-2" />
        Back
      </Link>
      
      {/* Product Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-lg">
          <motion.img
            initial={{ opacity: 0.8, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover aspect-square"
          />
          
          <div className="absolute top-4 right-4">
            {product.inStock ? (
              <span className="bg-success/90 text-white px-3 py-1 rounded-full text-sm">
                In Stock
              </span>
            ) : (
              <span className="bg-error/90 text-white px-3 py-1 rounded-full text-sm">
                Out of Stock
              </span>
            )}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-lg text-accent-400 mb-2">
              {product.brand}
            </p>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              {product.name}
            </h1>
            <p className="text-xl text-white mb-2">
              KES {product.price}
            </p>
            <div className="flex items-center space-x-4 text-gray-300">
              <span>{product.size}</span>
              <span>•</span>
              <span>{product.alcoholContent} ABV</span>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Description</h2>
            <p className="text-gray-300">
              {product.description}
            </p>
          </div>
          
          {/* Add to Cart */}
          <div className="pt-4 border-t border-dark-600">
            <div className="flex flex-wrap items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center rounded-md bg-dark-600 p-1 w-32">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 text-gray-300 hover:text-accent-400 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <FiMinus className="h-4 w-4" />
                </button>
                <span className="flex-grow text-center text-white font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 text-gray-300 hover:text-accent-400 transition-colors"
                  aria-label="Increase quantity"
                >
                  <FiPlus className="h-4 w-4" />
                </button>
              </div>
              
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-grow flex items-center justify-center py-3 px-6 rounded-md font-medium ${
                  product.inStock
                    ? 'bg-accent-500 hover:bg-accent-600 text-dark-900'
                    : 'bg-dark-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                <FiShoppingCart className="h-5 w-5 mr-2" />
                {isInCart ? 'Update Cart' : 'Add to Cart'}
              </button>
              
              {/* Buy Now Button */}
              <Link
                to="/checkout"
                className={`py-3 px-6 rounded-md font-medium border ${
                  product.inStock
                    ? 'border-primary-500 text-primary-400 hover:bg-primary-500/10'
                    : 'border-dark-600 text-gray-400 cursor-not-allowed'
                }`}
                onClick={(e) => {
                  if (!product.inStock) {
                    e.preventDefault()
                  } else if (!isInCart) {
                    handleAddToCart()
                  }
                }}
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-display font-bold text-black mb-6">
            You might also like
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetailPage