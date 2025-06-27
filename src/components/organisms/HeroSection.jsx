import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";

const HeroSection = ({ featuredRecipes = [] }) => {
  const navigate = useNavigate()
  
  const handleSearch = (query) => {
    navigate(`/recipes?search=${encodeURIComponent(query)}`)
  }
  
  const handleExploreClick = () => {
    navigate('/recipes')
  }
  
return (
    <section className="relative bg-gradient-to-br from-surface via-background to-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f97316%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-gray-900 mb-6">
              Discover Your Next
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {' '}Favorite Meal
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Explore thousands of delicious recipes from around the world. 
              Find the perfect dish for every occasion and skill level.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search for recipes, ingredients, or cuisines..."
              size="xl"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              onClick={handleExploreClick}
              icon="Search"
              className="min-w-[160px]"
            >
              Explore Recipes
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/categories')}
              icon="Grid3X3"
              className="min-w-[160px]"
            >
              Browse Categories
            </Button>
          </motion.div>
        </div>
        
        {/* Featured Recipe Preview */}
        {featuredRecipes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16"
          >
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {featuredRecipes.slice(0, 3).map((recipe, index) => (
                <motion.div
                  key={recipe.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl shadow-card overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/recipes/${recipe.Id}`)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
                      {recipe.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {recipe.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default HeroSection