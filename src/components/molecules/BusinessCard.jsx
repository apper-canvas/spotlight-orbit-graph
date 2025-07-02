import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Rating from '@/components/atoms/Rating'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const BusinessCard = ({ business, onSave, isSaved = false }) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/business/${business.Id}`)
  }

  const handleSaveClick = (e) => {
    e.stopPropagation()
    onSave?.(business.Id)
  }

  const isOpen = () => {
    const now = new Date()
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' })
    const currentTime = now.toTimeString().slice(0, 5)
    
    const todayHours = business.hours?.find(h => h.day === currentDay)
    if (!todayHours) return false
    
    return currentTime >= todayHours.open && currentTime <= todayHours.close
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      className="card cursor-pointer overflow-hidden group"
    >
      <div className="relative h-48 bg-gray-200">
        {business.images?.[0] ? (
          <img
            src={business.images[0]}
            alt={business.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <ApperIcon name="Image" className="w-16 h-16 text-gray-400" />
          </div>
        )}
        
        <div className="absolute top-3 right-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSaveClick}
            className={`
              p-2 rounded-full backdrop-blur-sm transition-colors duration-200
              ${isSaved 
                ? 'bg-primary-500 text-white' 
                : 'bg-white/80 text-slate-600 hover:bg-primary-500 hover:text-white'
              }
            `}
          >
            <ApperIcon 
              name={isSaved ? "Heart" : "Heart"} 
              className="w-4 h-4"
              fill={isSaved ? "currentColor" : "none"}
            />
          </motion.button>
        </div>

        <div className="absolute top-3 left-3">
          <Badge 
            variant={isOpen() ? "success" : "default"}
            size="sm"
            icon={isOpen() ? "Clock" : "Clock"}
          >
            {isOpen() ? "Open" : "Closed"}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-display font-semibold text-slate-900 text-lg mb-1 group-hover:text-primary-600 transition-colors">
              {business.name}
            </h3>
            <p className="text-slate-500 text-sm capitalize">{business.category}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <Rating rating={business.rating} size="sm" />
          <span className="text-slate-500 text-sm">
            ({business.reviewCount} reviews)
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-slate-500">
            <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
            <span>{business.distance || '0.5'} mi</span>
          </div>
          
          <div className="flex items-center text-primary-500 font-medium">
            <ApperIcon name="ArrowRight" className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default BusinessCard