import ApperIcon from '@/components/ApperIcon'

const Rating = ({ rating = 0, maxRating = 5, showValue = true, size = 'sm', className = '' }) => {
  const stars = []
  
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }
  
  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  for (let i = 1; i <= maxRating; i++) {
    const filled = i <= Math.floor(rating)
    const halfFilled = i === Math.ceil(rating) && rating % 1 !== 0
    
    stars.push(
      <div key={i} className="relative">
        <ApperIcon 
          name="Star" 
          className={`${sizeClasses[size]} text-gray-300`}
        />
        {(filled || halfFilled) && (
          <ApperIcon 
            name="Star" 
            className={`${sizeClasses[size]} text-primary-500 absolute top-0 left-0`}
            fill="currentColor"
            style={halfFilled ? { clipPath: 'inset(0 50% 0 0)' } : {}}
          />
        )}
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {stars}
      </div>
      {showValue && (
        <span className={`text-slate-600 font-medium ${textSizes[size]} ml-1`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

export default Rating