import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg focus:ring-primary-500',
    secondary: 'bg-white hover:bg-gray-50 text-slate-600 border border-gray-200 shadow-sm hover:shadow-md focus:ring-gray-500',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500',
    ghost: 'text-slate-600 hover:bg-gray-100 focus:ring-gray-500',
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  
  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
  `.trim()

  return (
    <motion.button
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <ApperIcon name="Loader2" className="w-4 h-4 animate-spin mr-2" />
      ) : (
        icon && iconPosition === 'left' && (
          <ApperIcon name={icon} className="w-4 h-4 mr-2" />
        )
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && !loading && (
        <ApperIcon name={icon} className="w-4 h-4 ml-2" />
      )}
    </motion.button>
  )
}

export default Button