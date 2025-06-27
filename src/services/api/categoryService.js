// Mock Category Service - Replace with actual API calls
const mockCategories = [
  {
    id: 1,
    name: "Desserts",
    icon: "Cookie",
    description: "Sweet treats and delicious desserts",
    recipeCount: 12,
    color: "from-pink-500 to-rose-500"
  },
  {
    id: 2,
    name: "Healthy",
    icon: "Apple",
    description: "Nutritious and wholesome meals",
    recipeCount: 18,
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 3,
    name: "Asian",
    icon: "Utensils",
    description: "Authentic Asian cuisine",
    recipeCount: 15,
    color: "from-orange-500 to-red-500"
  },
  {
    id: 4,
    name: "Italian",
    icon: "Pizza",
    description: "Classic Italian dishes",
    recipeCount: 20,
    color: "from-red-500 to-pink-500"
  },
  {
    id: 5,
    name: "Mexican",
    icon: "Pepper",
    description: "Spicy and flavorful Mexican food",
    recipeCount: 14,
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 6,
    name: "Breakfast",
    icon: "Coffee",
    description: "Start your day right",
    recipeCount: 16,
    color: "from-blue-500 to-purple-500"
  }
]

export const categoryService = {
  // Get all categories
  getAll: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return mockCategories
  },

  // Get category by ID
  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    const category = mockCategories.find(c => c.id === parseInt(id))
    if (!category) {
      throw new Error('Category not found')
    }
    return category
  },

  // Get category by name
  getByName: async (name) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    const category = mockCategories.find(c => 
      c.name.toLowerCase() === name.toLowerCase()
    )
    if (!category) {
      throw new Error('Category not found')
    }
    return category
  },

  // Search categories
  search: async (query) => {
    await new Promise(resolve => setTimeout(resolve, 250))
    return mockCategories.filter(category =>
      category.name.toLowerCase().includes(query.toLowerCase()) ||
      category.description.toLowerCase().includes(query.toLowerCase())
    )
  }
}