import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext(null)

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCartItems(parsedCart)
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error)
        localStorage.removeItem('cart')
      }
    }
  }, [])

  // Calculate totals whenever cart changes
  useEffect(() => {
    const items = cartItems.reduce((total, item) => total + item.quantity, 0)
    const amount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity, 
      0
    )
    
    setTotalItems(items)
    setTotalAmount(amount)
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.variation_id === product.variation_id)
      
      const newItem = {
        id: product.variation_id, // still needed for lookup
        name: product.name,
        image: product.image,
        price: product.price,
        size: product.size,
        quantity,
        // ✅ ensure these are present
        product_id: product.product_id,
        variation_id: product.variation_id,
      };
      
      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        }
        toast.success('Updated quantity in cart')
        return updatedItems
      } else {
        // Add new item to cart
        toast.success('Added to cart')
        return [...prevItems, { ...product, quantity }]
      }
    })
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
    toast.success('Removed from cart')
  }

  const clearCart = () => {
    setCartItems([])
    toast.success('Cart cleared')
  }

  const value = {
    cartItems,
    totalAmount,
    totalItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}