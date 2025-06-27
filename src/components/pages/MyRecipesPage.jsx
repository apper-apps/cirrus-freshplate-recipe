import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import RecipeGrid from '@/components/organisms/RecipeGrid'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { recipeService } from '@/services/api/recipeService'
import { savedRecipeService } from '@/services/api/savedRecipeService'
import ApperIcon from '@/components/ApperIcon'

const MyRecipesPage = () => {
  const [savedRecipes, setSavedRecipes] = useState([])
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const loadSavedRecipes = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [savedRecipesData, allRecipes] = await Promise.all([
        savedRecipeService.getSavedRecipes(),
        recipeService.getAll()
      ])
      
      // Get full recipe data for saved recipes
      const savedRecipeIds = savedRecipesData.map(saved => saved.recipeId)
      const fullRecipes = allRecipes.filter(recipe => 
        savedRecipeIds.includes(recipe.Id.toString())
      )
      
      setSavedRecipes(savedRecipesData)
      setRecipes(fullRecipes)
    } catch (err) {
      setError('Failed to load your saved recipes. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadSavedRecipes()
  }, [])
  
  const handleSaveToggle = (recipeId, isSaved) => {
    if (!isSaved) {
      // Remove from saved recipes
      setSavedRecipes(prev => prev.filter(saved => saved.recipeId !== recipeId.toString()))
      setRecipes(prev => prev.filter(recipe => recipe.Id !== recipeId))
    }
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-16 bg-white rounded-xl mb-8 animate-pulse" />
          <Loading variant="cards" />
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message={error} onRetry={loadSavedRecipes} />
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
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-error to-pink-500 rounded-2xl flex items-center justify-center mr-4">
              <ApperIcon name="Heart" className="w-8 h-8 text-white fill-current" />
            </div>
            <div>
              <h1 className="font-display font-bold text-4xl text-gray-900">
                My Favorite Recipes
              </h1>
              <p className="text-gray-600">
                {recipes.length} saved recipe{recipes.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Saved Recipes */}
        {recipes.length > 0 ? (
          <RecipeGrid
            recipes={recipes}
            savedRecipes={savedRecipes}
            onSaveToggle={handleSaveToggle}
          />
        ) : (
          <Empty
            title="No saved recipes yet"
            message="Start exploring our recipe collection and save your favorites to see them here. Click the heart icon on any recipe to add it to your favorites!"
            actionText="Discover Recipes"
            actionPath="/recipes"
            icon="Heart"
          />
        )}
      </div>
    </div>
  )
}

export default MyRecipesPage