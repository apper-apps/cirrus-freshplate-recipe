import React, { useState, useEffect } from 'react'
import HeroSection from '@/components/organisms/HeroSection'
import RecipeGrid from '@/components/organisms/RecipeGrid'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { recipeService } from '@/services/api/recipeService'
import { savedRecipeService } from '@/services/api/savedRecipeService'

const HomePage = () => {
  const [recipes, setRecipes] = useState([])
  const [featuredRecipes, setFeaturedRecipes] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [allRecipes, savedRecipesData] = await Promise.all([
        recipeService.getAll(),
        savedRecipeService.getSavedRecipes()
      ])
      
      const featured = allRecipes.filter(recipe => recipe.featured)
      const popular = allRecipes
        .filter(recipe => !recipe.featured)
        .sort(() => Math.random() - 0.5)
        .slice(0, 8)
      
      setFeaturedRecipes(featured)
      setRecipes(popular)
      setSavedRecipes(savedRecipesData)
    } catch (err) {
      setError('Failed to load recipes. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    loadData()
  }, [])
  
  const handleSaveToggle = (recipeId, isSaved) => {
    if (isSaved) {
      setSavedRecipes(prev => [...prev, { recipeId, savedAt: new Date() }])
    } else {
      setSavedRecipes(prev => prev.filter(saved => saved.recipeId !== recipeId))
    }
  }
  
  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="h-96 bg-gradient-to-br from-surface via-background to-white animate-pulse" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Loading variant="cards" />
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message={error} onRetry={loadData} />
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen">
      <HeroSection featuredRecipes={featuredRecipes} />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {recipes.length > 0 ? (
          <RecipeGrid
            recipes={recipes}
            savedRecipes={savedRecipes}
            onSaveToggle={handleSaveToggle}
            title="Popular Recipes"
          />
        ) : (
          <Empty
            title="No recipes available"
            message="We're currently updating our recipe collection. Please check back soon for delicious new recipes!"
            actionText="Refresh Page"
            actionPath="/"
            icon="ChefHat"
          />
        )}
      </section>
    </div>
  )
}

export default HomePage