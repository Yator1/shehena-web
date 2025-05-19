import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShoppingBag, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi'
import { useCart } from '../contexts/CartContext'

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, totalAmount, clearCart } = useCart()
  
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-dark-700 rounded-full mb-6">
            <FiShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-display font-bold text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-400 mb-6">
            Add some products to your cart and come back here to checkout!
          </p>
          <Link
            to="/"
            className="btn btn-accent"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    )
  }
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-display font-bold text-white">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {/* Header - Desktop */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-dark-700 rounded-t-lg text-sm text-gray-300">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>
          
          {/* Items */}
          <div className="bg-dark-700 rounded-lg md:rounded-t-none overflow-hidden divide-y divide-dark-600">
            {cartItems.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center"
              >
                {/* Product */}
                <div className="md:col-span-6 flex items-center mb-4 md:mb-0">
                  <div className="w-20 h-20 flex-shrink-0 bg-dark-600 rounded-md overflow-hidden mr-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-400">{item.brand} • {item.size}</p>
                  </div>
                </div>
                
                {/* Price - Desktop */}
                <div className="hidden md:block md:col-span-2 text-center text-white">
                  KES {item.price}
                </div>
                
                {/* Mobile View - Price & Total */}
                <div className="md:hidden flex justify-between items-center mb-3">
                  <span className="text-gray-400">Price:</span>
                  <span className="text-white">KES {item.price}</span>
                </div>
                
                {/* Quantity */}
                <div className="md:col-span-2 flex justify-center mb-3 md:mb-0">
                  <div className="flex items-center rounded-md bg-dark-600 p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-gray-300 hover:text-accent-400 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <FiMinus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-gray-300 hover:text-accent-400 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <FiPlus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {/* Subtotal & Remove - Desktop */}
                <div className="hidden md:flex md:col-span-2 md:justify-end md:items-center">
                  <span className="text-white mr-3">
                    KES {item.price * item.quantity}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-error transition-colors"
                    aria-label="Remove item"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Mobile View - Subtotal & Remove */}
                <div className="md:hidden flex justify-between items-center">
                  <span className="text-gray-400">Subtotal:</span>
                  <div className="flex items-center">
                    <span className="text-white mr-3">
                      KES {item.price * item.quantity}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-error transition-colors"
                      aria-label="Remove item"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex justify-between mt-4">
            <Link
              to="/"
              className="inline-flex items-center text-gray-300 hover:text-accent-400 transition-colors"
            >
              ← Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="inline-flex items-center text-gray-300 hover:text-error transition-colors"
            >
              <FiTrash2 className="h-4 w-4 mr-1" />
              Clear Cart
            </button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-dark-700 rounded-lg p-6">
            <h2 className="text-xl font-display font-bold text-white mb-4">
              Order Summary
            </h2>
            
            <div className="space-y-3 border-b border-dark-600 pb-4 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-300">Subtotal</span>
                <span className="text-white">KES {totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Shipping</span>
                <span className="text-white">KES 250</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Tax</span>
                <span className="text-white">KES {Math.round(totalAmount * 0.16)}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <span className="text-white font-semibold">Total</span>
              <span className="text-xl text-accent-400 font-bold">
                KES {totalAmount + 250 + Math.round(totalAmount * 0.16)}
              </span>
            </div>
            
            <Link
              to="/checkout"
              className="block w-full py-3 px-4 bg-accent-500 text-dark-900 text-center rounded-md font-medium hover:bg-accent-400 transition-colors"
            >
              Proceed to Checkout
            </Link>
            
            <div className="mt-4 text-center text-xs text-gray-400">
              <p>Secure payment powered by MPesa and Card</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage