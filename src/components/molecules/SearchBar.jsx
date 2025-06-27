import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'

const SearchBar = ({ 
  onSearch, 
  placeholder = "Search recipes, ingredients...",
  className = '',
  showButton = true,
  size = 'lg'
}) => {
  const [query, setQuery] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch?.(query.trim())
    }
  }
  
  const handleInputChange = (e) => {
    setQuery(e.target.value)
  }
  
  const sizeClasses = {
    md: 'py-2.5',
    lg: 'py-3.5 text-lg',
    xl: 'py-4 text-xl'
  }
  
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className={`flex w-full max-w-2xl mx-auto ${className}`}
    >
      <div className="flex-1 relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`
            w-full border border-gray-200 rounded-l-xl shadow-sm
            focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
            transition-all duration-200 px-6 pl-12
            ${sizeClasses[size]}
            ${!showButton ? 'rounded-r-xl' : ''}
          `}
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      {showButton && (
        <Button
          type="submit"
          variant="primary"
          className="rounded-l-none rounded-r-xl px-8 shadow-sm"
          disabled={!query.trim()}
        >
          Search
        </Button>
      )}
    </motion.form>
  )
}

export default SearchBar