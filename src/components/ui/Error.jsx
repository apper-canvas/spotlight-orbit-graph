import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ 
  title = "Something went wrong", 
  message = "We couldn't load the content. Please try again.", 
  onRetry,
  showRetry = true 
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
        className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon name="AlertCircle" className="w-8 h-8 text-red-500" />
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
      
      {showRetry && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="primary"
            icon="RefreshCcw"
            onClick={onRetry}
          >
            Try Again
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Error