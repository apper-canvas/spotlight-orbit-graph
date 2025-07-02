import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import SearchBar from '@/components/molecules/SearchBar'
import FilterModal from '@/components/molecules/FilterModal'
import BusinessCard from '@/components/molecules/BusinessCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { businessService } from '@/services/api/businessService'

const SearchPage = () => {
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [savedBusinesses, setSavedBusinesses] = useState(new Set())
  const [filters, setFilters] = useState({
    category: '',
    radius: 5,
    sortBy: 'distance'
  })

  const loadBusinesses = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await businessService.getAll()
      setBusinesses(data)
    } catch (err) {
      setError('Failed to load businesses')
      console.error('Error loading businesses:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBusinesses()
  }, [])

  const filteredAndSortedBusinesses = useMemo(() => {
    let filtered = businesses

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(business =>
        business.name.toLowerCase().includes(query) ||
        business.category.toLowerCase().includes(query) ||
        business.address.toLowerCase().includes(query)
      )
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(business => business.category === filters.category)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'rating':
          return b.rating - a.rating
        case 'reviews':
          return b.reviewCount - a.reviewCount
        case 'name':
          return a.name.localeCompare(b.name)
        case 'distance':
        default:
          // Simulate distance sorting (in real app, would use actual coordinates)
          return Math.random() - 0.5
      }
    })

    return filtered
  }, [businesses, searchQuery, filters])

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters)
  }

  const handleBusinessSave = (businessId) => {
    const newSaved = new Set(savedBusinesses)
    if (newSaved.has(businessId)) {
      newSaved.delete(businessId)
    } else {
      newSaved.add(businessId)
    }
    setSavedBusinesses(newSaved)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    setFilters({ category: '', radius: 5, sortBy: 'distance' })
  }

  if (loading) {
    return (
      <div className="p-4">
        <div className="mb-6">
          <div className="h-12 bg-gray-200 rounded-lg" />
        </div>
        <Loading type="cards" count={6} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4">
        <Error
          title="Search Unavailable"
          message="We couldn't load the search results. Please try again."
          onRetry={loadBusinesses}
        />
      </div>
    )
  }

  return (
    <div className="p-4 pb-24">
      {/* Search Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search businesses, categories..."
          showFilter={true}
          onFilterClick={() => setShowFilters(true)}
        />
      </motion.div>

      {/* Active Filters */}
      {(searchQuery || filters.category || filters.sortBy !== 'distance') && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-slate-600">Active filters:</span>
            <button
              onClick={handleClearSearch}
              className="text-sm text-primary-500 hover:text-primary-600"
            >
              Clear all
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {searchQuery && (
              <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                <ApperIcon name="Search" className="w-3 h-3" />
                "{searchQuery}"
                <button
                  onClick={() => setSearchQuery('')}
                  className="hover:bg-primary-200 rounded-full p-0.5"
                >
                  <ApperIcon name="X" className="w-3 h-3" />
                </button>
              </div>
            )}
            {filters.category && (
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 capitalize">
                {filters.category}
                <button
                  onClick={() => setFilters(prev => ({ ...prev, category: '' }))}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                >
                  <ApperIcon name="X" className="w-3 h-3" />
                </button>
              </div>
            )}
            {filters.sortBy !== 'distance' && (
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 capitalize">
                Sort: {filters.sortBy}
                <button
                  onClick={() => setFilters(prev => ({ ...prev, sortBy: 'distance' }))}
                  className="hover:bg-green-200 rounded-full p-0.5"
                >
                  <ApperIcon name="X" className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6"
      >
        <h2 className="text-lg font-display font-semibold text-slate-900">
          {filteredAndSortedBusinesses.length} businesses found
        </h2>
      </motion.div>

      {/* Results */}
      {filteredAndSortedBusinesses.length === 0 ? (
        <Empty
          title="No businesses found"
          message={searchQuery 
            ? `No results for "${searchQuery}". Try a different search term or adjust your filters.`
            : "No businesses match your current filters. Try adjusting your search criteria."
          }
          icon="Search"
          actionLabel="Clear Filters"
          onAction={handleClearSearch}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredAndSortedBusinesses.map((business, index) => (
            <motion.div
              key={business.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <BusinessCard
                business={business}
                onSave={handleBusinessSave}
                isSaved={savedBusinesses.has(business.Id)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />
    </div>
  )
}

export default SearchPage