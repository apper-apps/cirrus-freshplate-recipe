// Mock Recipe Service - Replace with actual API calls
const mockRecipes = [
  {
    Id: 1,
    title: "Classic Chocolate Chip Cookies",
    description: "Soft and chewy chocolate chip cookies with the perfect balance of sweetness",
    category: "Desserts",
    difficulty: "Easy",
    prepTime: 15,
    cookTime: 12,
    servings: 24,
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400",
    featured: true,
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 tsp baking soda",
      "1 tsp salt",
      "1 cup butter, softened",
      "3/4 cup granulated sugar",
      "3/4 cup brown sugar",
      "2 large eggs",
      "2 tsp vanilla extract",
      "2 cups chocolate chips"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C)",
      "Mix flour, baking soda, and salt in a bowl",
      "Cream butter and sugars until fluffy",
      "Beat in eggs and vanilla",
      "Gradually mix in flour mixture",
      "Stir in chocolate chips",
      "Drop rounded tablespoons onto ungreased cookie sheets",
      "Bake 9-11 minutes until golden brown"
    ]
  },
  {
    Id: 2,
    title: "Mediterranean Quinoa Bowl",
    description: "Fresh and healthy quinoa bowl with Mediterranean flavors",
    category: "Healthy",
    difficulty: "Easy",
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    featured: false,
    ingredients: [
      "1 cup quinoa",
      "2 cups vegetable broth",
      "1 cucumber, diced",
      "2 tomatoes, diced",
      "1/2 red onion, diced",
      "1/2 cup kalamata olives",
      "1/2 cup feta cheese",
      "1/4 cup olive oil",
      "2 tbsp lemon juice",
      "2 tsp oregano"
    ],
    instructions: [
      "Rinse quinoa and cook in vegetable broth",
      "Let quinoa cool completely",
      "Dice all vegetables",
      "Whisk olive oil, lemon juice, and oregano",
      "Combine quinoa with vegetables",
      "Add dressing and toss",
      "Top with feta and olives",
      "Serve chilled"
    ]
  },
  {
    Id: 3,
    title: "Spicy Thai Basil Stir Fry",
    description: "Authentic Thai stir fry with fresh basil and chilies",
    category: "Asian",
    difficulty: "Medium",
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400",
    featured: true,
    ingredients: [
      "1 lb ground chicken",
      "3 cloves garlic, minced",
      "2 Thai chilies, sliced",
      "1 cup fresh Thai basil",
      "2 tbsp vegetable oil",
      "2 tbsp fish sauce",
      "1 tbsp soy sauce",
      "1 tsp sugar",
      "1 bell pepper, sliced"
    ],
    instructions: [
      "Heat oil in wok over high heat",
      "Add garlic and chilies, stir fry 30 seconds",
      "Add ground chicken, cook until done",
      "Add bell pepper, stir fry 2 minutes",
      "Add sauces and sugar",
      "Stir in basil leaves until wilted",
      "Serve immediately over rice"
    ]
  }
]

export const recipeService = {
  // Get all recipes
  getAll: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockRecipes
  },

  // Get recipe by ID
  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const recipe = mockRecipes.find(r => r.Id === parseInt(id))
    if (!recipe) {
      throw new Error('Recipe not found')
    }
    return recipe
  },

  // Search recipes
  search: async (query) => {
    await new Promise(resolve => setTimeout(resolve, 400))
    return mockRecipes.filter(recipe =>
      recipe.title.toLowerCase().includes(query.toLowerCase()) ||
      recipe.description.toLowerCase().includes(query.toLowerCase()) ||
      recipe.ingredients.some(ingredient =>
        ingredient.toLowerCase().includes(query.toLowerCase())
      )
    )
  },

  // Get recipes by category
  getByCategory: async (category) => {
    await new Promise(resolve => setTimeout(resolve, 400))
    return mockRecipes.filter(recipe => recipe.category === category)
  }
}