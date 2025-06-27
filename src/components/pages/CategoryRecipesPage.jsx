import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import SearchBar from '@/components/molecules/SearchBar'
import RecipeGrid from '@/components/organisms/RecipeGrid'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { recipeService } from '@/services/api/recipeService'
import { categoryService } from '@/services/api/categoryService'
import { savedRecipeService } from '@/services/api/savedRecipeService'
import ApperIcon from '@/components/ApperIcon'

const CategoryRecipesPage = () => {
  const { categoryId } = useParams()
  const navigate = useNavigate()
  const [category, setCategory] = useState(null)
  const [recipes, setRecipes] = useState([])
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  
  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [categoryData, allRecipes, savedRecipesData] = await Promise.all([
        categoryService.getById(parseInt(categoryId)),
        recipeService.getAll(),
        savedRecipeService.getSavedRecipes()
      ])
      
      if (!categoryData) {
        setError('Category not found')
        return
      }
      
      const categoryRecipes = allRecipes.filter(recipe => recipe.category === categoryData.name)
      
      setCategory(categoryData)
      setRecipes(categoryRecipes)
      setSavedRecipes(savedRecipesData)
    } catch (err) {
      setError('Failed to load category recipes. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadData()
  }, [categoryId])
  
  useEffect(() => {
    let filtered = [...recipes]
    
    if (searchQuery) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    setFilteredRecipes(filtered)
  }, [recipes, searchQuery])
  
  const handleSearch = (query) => {
    setSearchQuery(query)
  }
  
  const handleSaveToggle = (recipeId, isSaved) => {
    if (isSaved) {
      setSavedRecipes(prev => [...prev, { recipeId, savedAt: new Date() }])
    } else {
      setSavedRecipes(prev => prev.filter(saved => saved.recipeId !== recipeId))
    }
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-32 bg-white rounded-xl mb-8 animate-pulse" />
          <Loading variant="cards" />
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message={error} onRetry={loadData} />
        </div>
      </div>
    )
  }
  
  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Empty
            title="Category not found"
            message="The category you're looking for doesn't exist or has been removed."
            actionText="Browse Categories"
            actionPath="/categories"
            icon="Grid3X3"
          />
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
          className="mb-8"
        >
          <Button
            variant="ghost"
            size="sm"
            icon="ArrowLeft"
            onClick={() => navigate('/categories')}
            className="mb-4"
          >
            Back to Categories
          </Button>
          
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mr-4">
              <ApperIcon name={category.icon} className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-4xl text-gray-900">
                {category.name}
              </h1>
              <p className="text-gray-600">
                {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} available
              </p>
            </div>
          </div>
          
          <SearchBar
            onSearch={handleSearch}
            placeholder={`Search ${category.name.toLowerCase()} recipes...`}
            className="max-w-2xl"
          />
        </motion.div>
        
        {/* Results */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
        )}
        
        {filteredRecipes.length > 0 ? (
          <RecipeGrid
            recipes={filteredRecipes}
            savedRecipes={savedRecipes}
            onSaveToggle={handleSaveToggle}
          />
        ) : (
          <Empty
            title={
              searchQuery 
                ? `No ${category.name.toLowerCase()} recipes match your search`
                : `No ${category.name.toLowerCase()} recipes available`
            }
            message={
              searchQuery
                ? `We couldn't find any ${category.name.toLowerCase()} recipes matching "${searchQuery}". Try different keywords.`
                : `We're currently adding more ${category.name.toLowerCase()} recipes. Check back soon for delicious new options!`
            }
            actionText={searchQuery ? "Clear Search" : "Browse All Recipes"}
            actionPath={searchQuery ? `/categories/${categoryId}` : "/recipes"}
            icon="Search"
          />
        )}
      </div>
    </div>
  )
}

export default CategoryRecipesPage