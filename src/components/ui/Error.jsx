import React from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ 
  message = "Something went wrong", 
  onRetry, 
  className = '',
  variant = 'default'
}) => {
  const variants = {
    default: {
      icon: 'AlertCircle',
      iconColor: 'text-error',
      bgColor: 'bg-error/5',
      borderColor: 'border-error/20'
    },
    network: {
      icon: 'Wifi',
      iconColor: 'text-warning',
      bgColor: 'bg-warning/5',
      borderColor: 'border-warning/20'
    },
    notFound: {
      icon: 'Search',
      iconColor: 'text-gray-400',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    }
  }
  
  const config = variants[variant] || variants.default
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        flex flex-col items-center justify-center min-h-64 p-8 rounded-2xl
        ${config.bgColor} ${config.borderColor} border
        ${className}
      `}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className={`w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4`}
      >
        <ApperIcon name={config.icon} className={`w-8 h-8 ${config.iconColor}`} />
      </motion.div>
      
      <h3 className="font-display font-semibold text-xl text-gray-900 mb-2">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 text-center mb-6 max-w-md">
        {message}. Don't worry, these things happen. Try refreshing the page or check back later.
      </p>
      
      {onRetry && (
        <Button onClick={onRetry} icon="RefreshCw">
          Try Again
        </Button>
      )}
    </motion.div>
  )
}

export default Error