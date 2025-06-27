import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { savedRecipeService } from '@/services/api/savedRecipeService'

const RecipeCard = ({ recipe, isSaved = false, onSaveToggle }) => {
  const navigate = useNavigate()
  const [isToggling, setIsToggling] = useState(false)
  
  const handleCardClick = () => {
    navigate(`/recipes/${recipe.Id}`)
  }
  
  const handleSaveToggle = async (e) => {
    e.stopPropagation()
    setIsToggling(true)
    
    try {
      if (isSaved) {
        await savedRecipeService.removeFromSaved(recipe.Id)
        toast.success('Recipe removed from favorites')
      } else {
        await savedRecipeService.addToSaved(recipe.Id)
        toast.success('Recipe saved to favorites')
      }
      onSaveToggle?.(recipe.Id, !isSaved)
    } catch (error) {
      toast.error('Failed to update favorites')
    } finally {
      setIsToggling(false)
    }
  }
  
  const difficultyColors = {
    'Easy': 'success',
    'Medium': 'warning', 
    'Hard': 'error'
  }
  
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="recipe-card bg-white"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden rounded-t-xl">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="recipe-card-image h-48 w-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="sm"
            className={`
              bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm
              ${isSaved ? 'text-error hover:text-error/80' : 'text-gray-400 hover:text-error'}
              ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            onClick={handleSaveToggle}
            disabled={isToggling}
          >
            <ApperIcon 
              name={isSaved ? "Heart" : "Heart"} 
              className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`}
            />
          </Button>
        </div>
        
        {recipe.featured && (
          <div className="absolute top-3 left-3">
            <Badge variant="accent" size="sm" icon="Star">
              Featured
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-display font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
          {recipe.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {recipe.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <ApperIcon name="Clock" className="w-4 h-4 mr-1" />
              {recipe.prepTime + recipe.cookTime}m
            </div>
            <div className="flex items-center">
              <ApperIcon name="Users" className="w-4 h-4 mr-1" />
              {recipe.servings}
            </div>
          </div>
          
          <Badge 
            variant={difficultyColors[recipe.difficulty] || 'default'}
            size="sm"
          >
            {recipe.difficulty}
          </Badge>
        </div>
      </div>
    </motion.div>
  )
}

export default RecipeCard