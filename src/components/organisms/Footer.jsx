import React from 'react'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const Footer = () => {
  const footerLinks = {
    recipes: [
      { name: 'Browse All', href: '/recipes' },
      { name: 'Categories', href: '/categories' },
      { name: 'My Favorites', href: '/my-recipes' }
    ],
    support: [
      { name: 'About Us', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Help Center', href: '#' }
    ]
  }
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="ChefHat" className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl text-gray-900">
                FreshPlate
              </span>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              Discover amazing recipes from around the world. Cook with confidence 
              and create memorable meals for your loved ones.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                <ApperIcon name="Facebook" className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                <ApperIcon name="Twitter" className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
              >
                <ApperIcon name="Instagram" className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Recipes */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Recipes</h3>
            <ul className="space-y-3">
              {footerLinks.recipes.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-600 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 mt-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 FreshPlate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer