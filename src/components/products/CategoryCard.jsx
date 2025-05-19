import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const CategoryCard = ({ category }) => {
  return (
    <div className="flex flex-col">
      <motion.div
        whileHover={{ y: -5 }}
        className="relative overflow-hidden rounded-lg h-64 group mb-4"
      >
        <div className="absolute inset-0 bg-transparent" />
        
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </motion.div>
      
      <Link
        to={`/category/${category.id}`}
        className="inline-block w-full text-center py-2 px-4 bg-accent-500 text-dark-900 rounded-md text-sm font-medium hover:bg-accent-400 transition-colors"
      >
        {category.name}
      </Link>
    </div>
  )
}

export default CategoryCard