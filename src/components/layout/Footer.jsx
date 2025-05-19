import { Link } from 'react-router-dom'
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-cream-100 py-8">
      <div className="w-[90%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Logo and About */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-display font-bold text-gray-800">
                Shehena
              </span>
            </Link>
            <p className="text-gray-600 text-sm mb-4">
              Premium spirits and liquor delivered to your doorstep. Shop the
              finest selection of beer, wine, whiskey, vodka, and more.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-accent-400 transition-colors"
              >
                <FiFacebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-accent-400 transition-colors"
              >
                <FiInstagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-accent-400 transition-colors"
              >
                <FiTwitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-accent-400 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-accent-400 transition-colors text-sm"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-gray-600 hover:text-accent-400 transition-colors text-sm"
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/category/beer"
                  className="text-gray-600 hover:text-accent-400 transition-colors text-sm"
                >
                  Beer
                </Link>
              </li>
              <li>
                <Link
                  to="/category/wine"
                  className="text-gray-600 hover:text-accent-400 transition-colors text-sm"
                >
                  Wine
                </Link>
              </li>
              <li>
                <Link
                  to="/category/whiskey"
                  className="text-gray-600 hover:text-accent-400 transition-colors text-sm"
                >
                  Whiskey
                </Link>
              </li>
              <li>
                <Link
                  to="/category/vodka"
                  className="text-gray-600 hover:text-accent-400 transition-colors text-sm"
                >
                  Vodka
                </Link>
              </li>
              <li>
                <Link
                  to="/category/gin"
                  className="text-gray-600 hover:text-accent-400 transition-colors text-sm"
                >
                  Gin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm">
                Westport Industrial City, Ruiru
              </li>
              <li className="text-gray-600 text-sm">
                <a
                  href="tel:+254712345678"
                  className="hover:text-accent-400 transition-colors"
                >
                  +254 724 266 068
                </a>
              </li>
              <li className="text-gray-600 text-sm">
                <a
                  href="mailto:info@shehena.com"
                  className="hover:text-accent-400 transition-colors"
                >
                  info@shehena.co.ke
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-cream-200 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Shehena. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-500 hover:text-accent-400 transition-colors text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-accent-400 transition-colors text-sm"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-accent-400 transition-colors text-sm"
              >
                Legal
              </a>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-500 text-xs">
              Drink responsibly. Must be 18+ to purchase. ID verification
              required upon delivery.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer