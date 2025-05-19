import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiEdit2, FiShoppingBag, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  
  // Mock order history
  const orders = [
    {
      id: 'ORD12345',
      date: '2023-11-10',
      status: 'Delivered',
      total: 3250,
      items: [
        { name: 'Jameson Irish Whiskey', quantity: 1, price: 2800 },
        { name: 'Tusker Lager', quantity: 2, price: 250 }
      ]
    },
    {
      id: 'ORD12346',
      date: '2023-11-05',
      status: 'Processing',
      total: 5500,
      items: [
        { name: 'Grey Goose', quantity: 1, price: 4500 },
        { name: 'Heineken Premium', quantity: 3, price: 300 }
      ]
    }
  ]
  
  const handleLogout = () => {
    logout()
    navigate('/')
  }
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-display font-bold text-white">Your Account</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-dark-700 rounded-lg p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-primary-600/20 rounded-full flex items-center justify-center mb-4">
                <FiUser className="h-10 w-10 text-primary-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                {user?.name || 'User'}
              </h2>
              <p className="text-gray-400 text-sm">
                {user?.email || 'user@example.com'}
              </p>
            </div>
            
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center p-3 rounded-md transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-dark-600 text-accent-400'
                    : 'text-gray-300 hover:bg-dark-600 hover:text-white'
                }`}
              >
                <FiUser className="h-5 w-5 mr-3" />
                <span>Profile</span>
              </button>
              
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center p-3 rounded-md transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-dark-600 text-accent-400'
                    : 'text-gray-300 hover:bg-dark-600 hover:text-white'
                }`}
              >
                <FiShoppingBag className="h-5 w-5 mr-3" />
                <span>Order History</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center p-3 rounded-md text-error hover:bg-dark-600 transition-colors"
              >
                <FiLogOut className="h-5 w-5 mr-3" />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-dark-700 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-white">Profile Information</h2>
                  <button className="text-primary-400 hover:text-primary-300 flex items-center">
                    <FiEdit2 className="h-4 w-4 mr-1" />
                    <span>Edit</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Full Name</h3>
                    <p className="text-white">{user?.name || 'Test User'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Email</h3>
                    <p className="text-white">{user?.email || 'test@example.com'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Phone</h3>
                    <p className="text-white">+254 712 345 678</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Member Since</h3>
                    <p className="text-white">November 2023</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-white mb-4">Default Delivery Address</h2>
                  
                  <div className="p-4 border border-dark-600 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-white">Home</h3>
                      <button className="text-primary-400 hover:text-primary-300 text-sm">
                        Edit
                      </button>
                    </div>
                    <p className="text-gray-300">123 Liquor Lane, Westlands</p>
                    <p className="text-gray-300">Nairobi</p>
                    <p className="text-gray-300">Kenya</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-white mb-4">Account Settings</h2>
                  
                  <div className="space-y-4">
                    <button className="text-primary-400 hover:text-primary-300 block">
                      Change Password
                    </button>
                    <button className="text-primary-400 hover:text-primary-300 block">
                      Notification Preferences
                    </button>
                    <button className="text-error hover:text-error/80 block">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-dark-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Order History</h2>
                
                {orders.length > 0 ? (
                  <div className="space-y-6">
                    {orders.map(order => (
                      <div key={order.id} className="border border-dark-600 rounded-lg overflow-hidden">
                        <div className="bg-dark-600 p-4 flex flex-wrap justify-between items-center">
                          <div>
                            <h3 className="font-medium text-white">Order #{order.id}</h3>
                            <p className="text-sm text-gray-400">
                              Placed on {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.status === 'Delivered' 
                                ? 'bg-success/20 text-success' 
                                : 'bg-warning/20 text-warning'
                            }`}>
                              {order.status}
                            </span>
                            <span className="text-white font-medium">
                              KES {order.total}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h4 className="text-sm font-medium text-gray-300 mb-2">Items</h4>
                          <div className="space-y-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between">
                                <span className="text-gray-300">
                                  {item.quantity}x {item.name}
                                </span>
                                <span className="text-white">
                                  KES {item.price * item.quantity}
                                </span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4 flex justify-between pt-3 border-t border-dark-600">
                            <button className="text-primary-400 hover:text-primary-300 text-sm">
                              View Details
                            </button>
                            <button className="text-accent-400 hover:text-accent-300 text-sm">
                              Reorder
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FiShoppingBag className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-1">
                      No orders yet
                    </h3>
                    <p className="text-gray-400">
                      When you place an order, it will appear here.
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage