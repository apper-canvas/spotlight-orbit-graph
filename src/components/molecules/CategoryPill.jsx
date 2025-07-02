import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const CategoryPill = ({ category, icon, active = false, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick?.(category)}
      className={`
        inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
        ${active 
          ? 'bg-primary-500 text-white shadow-md' 
          : 'bg-white text-slate-600 border border-gray-200 hover:border-primary-300 hover:text-primary-600'
        }
      `}
    >
      <ApperIcon name={icon} className="w-4 h-4 mr-2" />
      {category}
    </motion.button>
  )
}

export default CategoryPill