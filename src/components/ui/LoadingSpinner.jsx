import { motion } from 'framer-motion'

const LoadingSpinner = ({ size = 'md', fullPage = false }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }
  
  const spinner = (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizeClasses[size]} border-3 border-t-accent-500 border-r-accent-400/50 border-b-accent-400/30 border-l-accent-400/10 rounded-full`}
    />
  )
  
  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-dark-900/80 z-50">
        <div className="text-center">
          {spinner}
          <p className="mt-4 text-gray-300 animate-pulse">Loading...</p>
        </div>
      </div>
    )
  }
  
  return spinner
}

export default LoadingSpinner