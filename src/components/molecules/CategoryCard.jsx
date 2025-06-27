import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const CategoryCard = ({ category, index = 0 }) => {
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate(`/categories/${category.Id}`)
  }
  
  const gradients = [
    'from-orange-400 to-pink-400',
    'from-green-400 to-blue-400', 
    'from-purple-400 to-pink-400',
    'from-yellow-400 to-orange-400',
    'from-blue-400 to-purple-400',
    'from-pink-400 to-red-400',
    'from-indigo-400 to-purple-400',
    'from-teal-400 to-green-400'
  ]
  
  const gradient = gradients[index % gradients.length]
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="card cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      <div className={`h-32 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        <ApperIcon name={category.icon} className="w-12 h-12 text-white" />
      </div>
      
      <div className="p-4">
        <h3 className="font-display font-semibold text-lg text-gray-900 mb-1">
          {category.name}
        </h3>
        <p className="text-sm text-gray-500">
          {category.recipeCount} recipes
        </p>
      </div>
    </motion.div>
  )
}

export default CategoryCard