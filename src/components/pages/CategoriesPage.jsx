import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CategoryCard from '@/components/molecules/CategoryCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { categoryService } from '@/services/api/categoryService'

const CategoriesPage = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const loadCategories = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (err) {
      setError('Failed to load categories. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadCategories()
  }, [])
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-16 bg-white rounded-xl mb-8 animate-pulse" />
          <Loading variant="categories" />
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message={error} onRetry={loadCategories} />
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            Recipe Categories
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our diverse collection of recipes organized by cuisine type, meal category, and cooking style.
          </p>
        </motion.div>
        
        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.Id}
                category={category}
                index={index}
              />
            ))}
          </div>
        ) : (
          <Empty
            title="No categories available"
            message="We're currently organizing our recipe categories. Please check back soon!"
            actionText="Browse All Recipes"
            actionPath="/recipes"
            icon="Grid3X3"
          />
        )}
      </div>
    </div>
  )
}

export default CategoriesPage