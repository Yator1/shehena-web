import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../../contexts/CartContext'
import { FiShoppingCart, FiPlus, FiMinus } from 'react-icons/fi'

const ProductCard = ({ product }) => {
  const { addToCart, cartItems, updateQuantity } = useCart()
  
  // Check if product is in cart
  const cartItem = cartItems.find(item => item.id === product.id)
  const isInCart = !!cartItem
  
  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }
  
  const incrementQuantity = (e) => {
    e.preventDefault()
    updateQuantity(product.id, cartItem.quantity + 1)
  }
  
  const decrementQuantity = (e) => {
    e.preventDefault()
    updateQuantity(product.id, cartItem.quantity - 1)
  }
  
  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        whileHover={{ y: -5 }}
        className="group bg-transparent rounded-lg overflow-hidden shadow-lg h-full flex flex-col"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          <div className="absolute top-2 right-2">
            {product.inStock ? (
              <span className="bg-success/90 text-white text-xs px-2 py-1 rounded-full">
                In Stock
              </span>
            ) : (
              <span className="bg-error/90 text-white text-xs px-2 py-1 rounded-full">
                Out of Stock
              </span>
            )}
          </div>
        </div>
        
        <div className="p-4 flex-grow">
          <div className="mb-2">
            <span className="text-sm text-gray-400">
              {product.brand}
            </span>
            <h3 className="text-lg font-semibold text-black group-hover:text-accent-400 transition-colors">
              {product.name}
            </h3>
          </div>
          
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="text-accent-500 font-semibold">
                KES {product.price}
              </span>
              <span className="text-gray-400 text-sm ml-2">
                {product.size}
              </span>
            </div>
            <span className="text-gray-400 text-sm">
              {product.alcoholContent}
            </span>
          </div>
        </div>
        
        <div className="p-4 pt-0">
          {isInCart ? (
            <div className="flex items-center justify-between rounded-md bg-dark-600 p-1">
              <button
                onClick={decrementQuantity}
                className="p-1 text-gray-300 hover:text-accent-400 transition-colors"
              >
                <FiMinus className="h-5 w-5" />
              </button>
              <span className="text-white font-medium">
                {cartItem.quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="p-1 text-gray-300 hover:text-accent-400 transition-colors"
              >
                <FiPlus className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium ${
                product.inStock
                  ? 'bg-accent-500 hover:bg-accent-600 text-dark-900'
                  : 'bg-dark-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              <FiShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </button>
          )}
        </div>
      </motion.div>
    </Link>
  )
}

export default ProductCard