import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl md:text-8xl font-display font-bold text-accent-500 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-display font-bold text-white mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-300 mb-8 max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="btn btn-accent inline-block"
        >
          Return to Homepage
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFoundPage