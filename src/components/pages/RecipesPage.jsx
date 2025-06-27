import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '@/components/molecules/SearchBar'
import FilterBar from '@/components/molecules/FilterBar'
import RecipeGrid from '@/components/organisms/RecipeGrid'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { recipeService } from '@/services/api/recipeService'
import { categoryService } from '@/services/api/categoryService'
import { savedRecipeService } from '@/services/api/savedRecipeService'

const RecipesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [recipes, setRecipes] = useState([])
  const [filteredRecipes, setFilteredRecipes] = useState([])
  const [categories, setCategories] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)
  const [sortBy, setSortBy] = useState('title')
  
  const loadData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [recipesData, categoriesData, savedRecipesData] = await Promise.all([
        recipeService.getAll(),
        categoryService.getAll(),
        savedRecipeService.getSavedRecipes()
      ])
      
      setRecipes(recipesData)
      setCategories(categoriesData)
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
  
  useEffect(() => {
    let filtered = [...recipes]
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.ingredients.some(ingredient =>
          ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }
    
    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(recipe => recipe.category === selectedCategory)
    }
    
    // Difficulty filter
    if (selectedDifficulty) {
      filtered = filtered.filter(recipe => recipe.difficulty === selectedDifficulty)
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'prepTime':
          return a.prepTime - b.prepTime
        case 'cookTime':
          return a.cookTime - b.cookTime
        case 'difficulty':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 }
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
        default:
          return a.title.localeCompare(b.title)
      }
    })
    
    setFilteredRecipes(filtered)
  }, [recipes, searchQuery, selectedCategory, selectedDifficulty, sortBy])
  
  const handleSearch = (query) => {
    setSearchQuery(query)
    setSearchParams(query ? { search: query } : {})
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
          <div className="h-16 bg-white rounded-xl mb-6 animate-pulse" />
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
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-4xl text-gray-900 mb-4">
            All Recipes
          </h1>
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search recipes, ingredients, or cuisines..."
            className="mb-6"
          />
        </div>
        
        {/* Filters */}
        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          sortBy={sortBy}
          onSortChange={setSortBy}
          className="mb-8"
        />
        
        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
          </p>
        </div>
        
        {filteredRecipes.length > 0 ? (
          <RecipeGrid
            recipes={filteredRecipes}
            savedRecipes={savedRecipes}
            onSaveToggle={handleSaveToggle}
          />
        ) : (
          <Empty
            title={searchQuery ? "No recipes match your search" : "No recipes found"}
            message={
              searchQuery
                ? `We couldn't find any recipes matching "${searchQuery}". Try different keywords or adjust your filters.`
                : "No recipes match your current filters. Try adjusting your search criteria."
            }
            actionText="Clear Filters"
            actionPath="/recipes"
            icon="Search"
          />
        )}
      </div>
    </div>
  )
}

export default RecipesPage