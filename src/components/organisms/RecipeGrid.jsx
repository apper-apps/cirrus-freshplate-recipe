import React from 'react'
import { motion } from 'framer-motion'
import RecipeCard from '@/components/molecules/RecipeCard'

const RecipeGrid = ({ 
  recipes = [], 
  savedRecipes = [], 
  onSaveToggle,
  title,
  className = '' 
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }
  
  const isSaved = (recipeId) => {
    return savedRecipes.some(saved => saved.recipeId === recipeId)
  }
  
  return (
    <div className={className}>
      {title && (
        <h2 className="font-display font-bold text-3xl text-gray-900 mb-8">
          {title}
        </h2>
      )}
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {recipes.map((recipe) => (
          <motion.div key={recipe.Id} variants={item}>
            <RecipeCard
              recipe={recipe}
              isSaved={isSaved(recipe.Id)}
              onSaveToggle={onSaveToggle}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default RecipeGrid