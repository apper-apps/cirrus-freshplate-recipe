import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { recipeService } from '@/services/api/recipeService'
import { savedRecipeService } from '@/services/api/savedRecipeService'

const RecipeDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [isSaved, setIsSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isTogglingSaved, setIsTogglingSaved] = useState(false)

  const loadRecipe = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [recipeData, savedStatus] = await Promise.all([
        recipeService.getById(parseInt(id)),
        savedRecipeService.isSaved(id)
      ])
      
      setRecipe(recipeData)
      setIsSaved(savedStatus)
    } catch (err) {
      setError(err.message || 'Failed to load recipe. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      loadRecipe()
    }
  }, [id])

  const handleSaveToggle = async () => {
    setIsTogglingSaved(true)
    
    try {
      if (isSaved) {
        await savedRecipeService.removeFromSaved(recipe.Id)
        toast.success('Recipe removed from favorites')
        setIsSaved(false)
      } else {
        await savedRecipeService.addToSaved(recipe.Id)
        toast.success('Recipe saved to favorites')
        setIsSaved(true)
      }
    } catch (error) {
      toast.error('Failed to update favorites')
    } finally {
      setIsTogglingSaved(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-8 bg-white rounded-lg mb-6 animate-pulse" />
          <div className="h-64 bg-white rounded-xl mb-8 animate-pulse" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Loading />
            </div>
            <div className="h-96 bg-white rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message={error} onRetry={loadRecipe} />
        </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Empty
            title="Recipe not found"
            message="The recipe you're looking for doesn't exist or has been removed."
            actionText="Browse Recipes"
            actionPath="/recipes"
            icon="ChefHat"
          />
        </div>
      </div>
    )
  }

  const difficultyColors = {
    'Easy': 'success',
    'Medium': 'warning',
    'Hard': 'error'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          icon="ArrowLeft"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          Back
        </Button>

        {/* Recipe Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl overflow-hidden shadow-sm mb-8"
        >
          <div className="relative">
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute top-4 right-4">
              <Button
                variant="ghost"
                size="sm"
                className={`
                  bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-sm
                  ${isSaved ? 'text-error hover:text-error/80' : 'text-gray-400 hover:text-error'}
                  ${isTogglingSaved ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                onClick={handleSaveToggle}
                disabled={isTogglingSaved}
              >
                <ApperIcon
                  name="Heart"
                  className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`}
                />
              </Button>
            </div>
            
            {recipe.featured && (
              <div className="absolute top-4 left-4">
                <Badge variant="accent" size="md" icon="Star">
                  Featured
                </Badge>
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="font-display font-bold text-3xl text-gray-900 mb-2">
                  {recipe.title}
                </h1>
                <p className="text-gray-600 text-lg">
                  {recipe.description}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center">
                <ApperIcon name="Clock" className="w-5 h-5 mr-2" />
                <span className="font-medium">Total:</span>
                <span className="ml-1">{recipe.prepTime + recipe.cookTime} min</span>
              </div>
              <div className="flex items-center">
                <ApperIcon name="Users" className="w-5 h-5 mr-2" />
                <span className="font-medium">Serves:</span>
                <span className="ml-1">{recipe.servings}</span>
              </div>
              <Badge
                variant={difficultyColors[recipe.difficulty] || 'default'}
                size="md"
              >
                {recipe.difficulty}
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Recipe Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Instructions */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <h2 className="font-display font-bold text-2xl text-gray-900 mb-6">
                Instructions
              </h2>
              <div className="space-y-4">
                {recipe.instructions?.map((instruction, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-semibold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-gray-700 pt-1">
                      {instruction}
                    </p>
                  </div>
                )) || (
                  <p className="text-gray-500 italic">
                    Instructions not available for this recipe.
                  </p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Ingredients */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm"
            >
              <h2 className="font-display font-bold text-xl text-gray-900 mb-6">
                Ingredients
              </h2>
              <div className="space-y-3">
                {recipe.ingredients?.map((ingredient, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">
                      {ingredient}
                    </span>
                  </div>
                )) || (
                  <p className="text-gray-500 italic">
                    Ingredients not available for this recipe.
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetailPage