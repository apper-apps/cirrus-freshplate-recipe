import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No recipes found",
  message = "Try adjusting your search or filters to find what you're looking for.",
  actionText = "Browse All Recipes",
  actionPath = "/recipes",
  icon = "Search",
  className = ''
}) => {
  const navigate = useNavigate()
  
  const handleAction = () => {
    navigate(actionPath)
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        flex flex-col items-center justify-center min-h-64 p-8 text-center
        ${className}
      `}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mb-6"
      >
        <ApperIcon name={icon} className="w-10 h-10 text-primary" />
      </motion.div>
      
      <h3 className="font-display font-semibold text-2xl text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {message}
      </p>
      
      <Button onClick={handleAction} size="lg" icon="ArrowRight">
        {actionText}
      </Button>
    </motion.div>
  )
}

export default Empty