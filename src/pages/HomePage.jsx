import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { productService } from '../services/productService'
import CategoryCard from '../components/products/CategoryCard'
import ProductCard from '../components/products/ProductCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const HomePage = () => {
  const [categories, setCategories] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  
  // const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoriesData = await productService.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  if (loading) {
    return <LoadingSpinner fullPage />
  }
  
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-dark-800 rounded-xl p-8 text-center">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          Supplying Quality Liquor Nationwide
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto mb-6">
          Access a wide range of premium spirits and alcohol brands, tailored
          for businesses that demand consistent supply and competitive pricing.
        </p>
        <div className="flex justify-center flex-wrap gap-4">
          <Link to="/category/whiskey" className="btn btn-accent">
            Shop Wholesale
          </Link>
          <a
            href="#categories"
            className="btn btn-outline text-white border-white hover:bg-white/10"
          >
            Browse Categories
          </a>
        </div>
      </section>

      {/* Featured Products */}
      {/* <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-dark-900">
            Featured Drinks
          </h2>
          <Link to="/" className="text-accent-400 hover:text-accent-300 text-sm">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section> */}

      {/* Categories Section */}
      <section id="categories">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-dark-900 mb-6">
          Our Products
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-cream-200 rounded-xl p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-black mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-primary-900 mb-6">
            Subscribe to receive updates on new arrivals, special offers, and
            exclusive events.
          </p>

          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-2 rounded-md bg-dark-600 border border-primary-700 focus:ring-accent-500 focus:border-accent-500 text-white"
              required
            />
            <button type="submit" className="btn btn-accent whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default HomePage