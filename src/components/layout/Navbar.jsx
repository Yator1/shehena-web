import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'
import { FiShoppingCart, FiUser, FiMenu, FiX, FiHome, FiGrid, FiShoppingBag } from 'react-icons/fi'

const API_BASE_URL = import.meta.env.VITE_API_URL

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // const [isSearchOpen, setIsSearchOpen] = useState(false)
  // const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [categories, setCategories] = useState([])
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const location = useLocation()
  
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api_categories.php`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        if (data.status) {
          const formattedCategories = data.data.map(category => ({
            id: category.category_id,
            name: category.category_name,
            slug: category.category_name.toLowerCase().replace(/\s+/g, '-')
          }))
          setCategories(formattedCategories)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
        setCategories([])
      }
    }

    fetchCategories()
  }, [])
  
  /* const handleSearchSubmit = (e) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
    setIsSearchOpen(false)
    setSearchQuery('')
  } */
  
  return (
    <header 
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled ? 'bg-cream-200 backdrop-blur-sm shadow-md' : 'bg-cream-100'
      }`}
    >
      <nav className="w-[90%] mx-auto py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-display font-bold text-gray-800">Shehena</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-sm hover:text-accent-400 transition-colors flex items-center space-x-2 ${isActive ? 'text-accent-400' : 'text-gray-600'}`
              }
              end
            >
              <FiHome className="h-4 w-4" />
              <span>Home</span>
            </NavLink>
            
            <div className="relative group">
              <button className="text-sm text-gray-600 hover:text-accent-400 transition-colors flex items-center space-x-2">
                <FiGrid className="h-4 w-4" />
                <span>Categories</span>
              </button>
              
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {categories.map((category) => (
                    <NavLink 
                      key={category.id}
                      to={`/category/${category.slug}`} 
                      className={({ isActive }) => 
                        `block px-4 py-2 text-sm ${isActive ? 'text-accent-400' : 'text-gray-600 hover:text-accent-400'}`
                      }
                    >
                      {category.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search button and form removed temporarily
            <div className="flex items-center relative">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 300, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 pr-10"
                  >
                    <form onSubmit={handleSearchSubmit} className="relative">
                      <input
                        type="text"
                        placeholder="Search for drinks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white border border-cream-200 rounded-lg py-2 px-4 text-sm text-gray-800 focus:ring-accent-500 focus:border-accent-500"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setIsSearchOpen(false)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <FiX className="h-4 w-4" />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-600 hover:text-accent-400 transition-colors z-10"
              >
                <FiSearch className="h-5 w-5" />
              </button>
            </div>
            */}
            
            <Link to="/profile" className="text-gray-600 hover:text-accent-400 transition-colors">
              <FiUser className="h-5 w-5" />
            </Link>
            
            <Link to="/orders" className="text-gray-600 hover:text-accent-400 transition-colors">
              <FiShoppingBag className="h-5 w-5" />
            </Link>
            
            <Link to="/cart" className="relative text-gray-600 hover:text-accent-400 transition-colors">
              <FiShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-accent-500 text-white text-xs font-bold rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <button 
              className="md:hidden text-gray-600 hover:text-accent-400 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-cream-200 overflow-hidden"
          >
            <div className="w-[90%] mx-auto py-4 space-y-3">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `flex items-center space-x-2 py-2 text-sm ${isActive ? 'text-accent-400' : 'text-gray-600'}`
                }
                end
              >
                <FiHome className="h-4 w-4" />
                <span>Home</span>
              </NavLink>
              
              <div className="py-2 border-t border-cream-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <FiGrid className="h-4 w-4" />
                  <span>Categories</span>
                </div>
                <div className="pl-6 space-y-2">
                  {categories.map((category) => (
                    <NavLink 
                      key={category.id}
                      to={`/category/${category.slug}`} 
                      className={({ isActive }) => 
                        `block py-1 text-sm ${isActive ? 'text-accent-400' : 'text-gray-600'}`
                      }
                    >
                      {category.name}
                    </NavLink>
                  ))}
                </div>
              </div>
              
              <div className="pt-2 border-t border-cream-200">
                <button
                  onClick={logout}
                  className="text-sm text-error hover:text-error/80"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Fullscreen search modal removed temporarily
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-cream-50/95 backdrop-blur-sm z-40 flex items-start pt-20 px-4"
          >
            <div className="w-[90%] max-w-3xl mx-auto">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search for drinks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border-cream-200 rounded-lg py-3 px-4 pl-12 text-gray-800 focus:ring-accent-500 focus:border-accent-500"
                  autoFocus
                />
                <FiSearch className="absolute top-3.5 left-4 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </form>
              <div className="mt-4 text-gray-600 text-sm">
                <p>Popular searches: Whiskey, Gin, Vodka, Beer, Wine</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      */}
    </header>
  )
}

export default Navbar