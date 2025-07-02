import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No results found", 
  message = "Try adjusting your search or filters to find what you're looking for.", 
  icon = "Search",
  actionLabel = "Clear Filters",
  onAction
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-20 h-20 bg-gradient-to-br from-primary-50 to-primary-100 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon name={icon} className="w-10 h-10 text-primary-500" />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-display font-semibold text-slate-900 mb-2"
      >
        {title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-slate-600 mb-6 max-w-sm"
      >
        {message}
      </motion.p>
      
      {onAction && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="primary"
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Empty