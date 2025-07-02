import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'

const FilterModal = ({ isOpen, onClose, onApplyFilters, currentFilters = {} }) => {
  const [filters, setFilters] = useState({
    category: currentFilters.category || '',
    radius: currentFilters.radius || 5,
    sortBy: currentFilters.sortBy || 'distance',
    ...currentFilters
  })

  const categories = [
    { name: 'All', value: '' },
    { name: 'Restaurants', value: 'restaurant' },
    { name: 'Cafés', value: 'cafe' },
    { name: 'Salons', value: 'salon' },
    { name: 'Shops', value: 'shop' },
    { name: 'Services', value: 'service' }
  ]

  const sortOptions = [
    { name: 'Distance', value: 'distance' },
    { name: 'Rating', value: 'rating' },
    { name: 'Reviews', value: 'reviews' },
    { name: 'Name', value: 'name' }
  ]

  const radiusOptions = [1, 2, 5, 10, 20]

  const handleApply = () => {
    onApplyFilters?.(filters)
    onClose?.()
  }

  const handleReset = () => {
    const resetFilters = { category: '', radius: 5, sortBy: 'distance' }
    setFilters(resetFilters)
    onApplyFilters?.(resetFilters)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl z-50 max-h-[80vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-display font-semibold text-slate-900">
                  Filter & Sort
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-3">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category.value}
                        variant={filters.category === category.value ? 'primary' : 'default'}
                        className="cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => setFilters(prev => ({ ...prev, category: category.value }))}
                      >
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Radius Filter */}
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-3">
                    Distance ({filters.radius} miles)
                  </h3>
                  <div className="px-2">
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={filters.radius}
                      onChange={(e) => setFilters(prev => ({ ...prev, radius: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>1 mi</span>
                      <span>20 mi</span>
                    </div>
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <h3 className="text-sm font-medium text-slate-700 mb-3">Sort by</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFilters(prev => ({ ...prev, sortBy: option.value }))}
                        className={`
                          p-3 rounded-lg border-2 transition-all duration-200 text-sm font-medium
                          ${filters.sortBy === option.value
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300 text-slate-600'
                          }
                        `}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleApply}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default FilterModal