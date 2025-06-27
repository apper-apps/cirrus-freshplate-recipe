// Mock Saved Recipe Service - Uses localStorage for persistence
const SAVED_RECIPES_KEY = 'freshplate_saved_recipes'

const getSavedFromStorage = () => {
  try {
    const saved = localStorage.getItem(SAVED_RECIPES_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('Error reading saved recipes from localStorage:', error)
    return []
  }
}

const saveTo = (savedRecipes) => {
  try {
    localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(savedRecipes))
  } catch (error) {
    console.error('Error saving recipes to localStorage:', error)
    throw new Error('Failed to save recipe')
  }
}

export const savedRecipeService = {
  // Get all saved recipes
  getSavedRecipes: async () => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return getSavedFromStorage()
  },

  // Add recipe to saved
  addToSaved: async (recipeId) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const savedRecipes = getSavedFromStorage()
    const recipeIdStr = recipeId.toString()
    
    // Check if already saved
    if (savedRecipes.some(saved => saved.recipeId === recipeIdStr)) {
      return savedRecipes
    }
    
    const newSaved = {
      recipeId: recipeIdStr,
      savedAt: new Date().toISOString()
    }
    
    const updatedSaved = [...savedRecipes, newSaved]
    saveTo(updatedSaved)
    
    return updatedSaved
  },

  // Remove recipe from saved
  removeFromSaved: async (recipeId) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const savedRecipes = getSavedFromStorage()
    const recipeIdStr = recipeId.toString()
    
    const updatedSaved = savedRecipes.filter(saved => saved.recipeId !== recipeIdStr)
    saveTo(updatedSaved)
    
    return updatedSaved
  },

  // Check if recipe is saved
  isSaved: async (recipeId) => {
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const savedRecipes = getSavedFromStorage()
    const recipeIdStr = recipeId.toString()
    
    return savedRecipes.some(saved => saved.recipeId === recipeIdStr)
  },

  // Get saved recipe count
  getSavedCount: async () => {
    await new Promise(resolve => setTimeout(resolve, 100))
    return getSavedFromStorage().length
  }
}