import React from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const FilterBar = ({ 
  categories = [], 
  selectedCategory = null, 
  onCategoryChange,
  difficulties = ['Easy', 'Medium', 'Hard'],
  selectedDifficulty = null,
  onDifficultyChange,
  sortBy = 'title',
  onSortChange,
  className = ''
}) => {
  const sortOptions = [
    { value: 'title', label: 'Name', icon: 'Type' },
    { value: 'prepTime', label: 'Prep Time', icon: 'Clock' },
    { value: 'cookTime', label: 'Cook Time', icon: 'Timer' },
    { value: 'difficulty', label: 'Difficulty', icon: 'BarChart3' }
  ]
  
  const difficultyColors = {
    'Easy': 'success',
    'Medium': 'warning',
    'Hard': 'error'
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl shadow-sm border p-4 ${className}`}
    >
      <div className="space-y-4">
        {/* Categories */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Categories</h4>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => onCategoryChange?.(null)}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category.Id}
                variant={selectedCategory === category.Id ? 'primary' : 'secondary'}
                size="sm"
                icon={category.icon}
                onClick={() => onCategoryChange?.(category.Id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Difficulty */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Difficulty</h4>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedDifficulty === null ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => onDifficultyChange?.(null)}
            >
              All
            </Button>
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? 'accent' : 'secondary'}
                size="sm"
                onClick={() => onDifficultyChange?.(difficulty)}
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Sort */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Sort by</h4>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map((option) => (
              <Button
                key={option.value}
                variant={sortBy === option.value ? 'primary' : 'secondary'}
                size="sm"
                icon={option.icon}
                onClick={() => onSortChange?.(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default FilterBar