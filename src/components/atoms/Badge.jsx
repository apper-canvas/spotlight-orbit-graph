import ApperIcon from '@/components/ApperIcon'

const Badge = ({ 
  variant = 'default', 
  size = 'md', 
  children, 
  icon,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full'
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-primary-100 text-primary-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
  }
  
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  }
  
  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.trim()

  return (
    <span className={classes} {...props}>
      {icon && <ApperIcon name={icon} className="w-3 h-3 mr-1" />}
      {children}
    </span>
  )
}

export default Badge