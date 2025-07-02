import { motion } from 'framer-motion'

const Loading = ({ type = 'cards', count = 6 }) => {
  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: { x: '100%' },
  }

  const ShimmerCard = () => (
    <div className="card overflow-hidden">
      <div className="relative">
        <div className="h-48 bg-gray-200 relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </div>
        
        <div className="p-4 space-y-3">
          <div className="space-y-2">
            <div className="h-5 bg-gray-200 rounded relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.2 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
            <div className="h-4 bg-gray-200 rounded w-2/3 relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.3 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-200 rounded w-24 relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.4 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
            <div className="h-4 bg-gray-200 rounded w-16 relative overflow-hidden">
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.5 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (type === 'cards') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ShimmerCard />
          </motion.div>
        ))}
      </div>
    )
  }

  if (type === 'detail') {
    return (
      <div className="space-y-6">
        {/* Hero Image */}
        <div className="h-64 bg-gray-200 rounded-lg relative overflow-hidden">
          <motion.div
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        </div>
        
        {/* Content */}
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded relative overflow-hidden">
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.2 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          </div>
          
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded relative overflow-hidden">
                <motion.div
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.3 + i * 0.1 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-8 h-8 border-4 border-primary-200 border-t-primary-500 rounded-full"
      />
    </div>
  )
}

export default Loading