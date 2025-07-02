import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import BusinessCard from '@/components/molecules/BusinessCard'
import CategoryPill from '@/components/molecules/CategoryPill'
import MapView from '@/components/organisms/MapView'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { businessService } from '@/services/api/businessService'

const DiscoverPage = () => {
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [viewMode, setViewMode] = useState('map') // 'map' or 'list'
  const [selectedBusiness, setSelectedBusiness] = useState(null)
  const [savedBusinesses, setSavedBusinesses] = useState(new Set())

  const categories = [
    { name: 'All', value: '', icon: 'Grid3X3' },
    { name: 'Restaurants', value: 'restaurant', icon: 'UtensilsCrossed' },
    { name: 'Cafés', value: 'cafe', icon: 'Coffee' },
    { name: 'Salons', value: 'salon', icon: 'Scissors' },
    { name: 'Shops', value: 'shop', icon: 'ShoppingBag' },
    { name: 'Services', value: 'service', icon: 'Wrench' }
  ]

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

  const filteredBusinesses = selectedCategory
    ? businesses.filter(business => business.category === selectedCategory)
    : businesses

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setSelectedBusiness(null)
  }

  const handleBusinessSave = (businessId) => {
    const newSaved = new Set(savedBusinesses)
    if (newSaved.has(businessId)) {
      newSaved.delete(businessId)
      toast.success('Removed from saved')
    } else {
      newSaved.add(businessId)
      toast.success('Added to saved')
    }
    setSavedBusinesses(newSaved)
  }

  const handleToggleView = () => {
    setViewMode(prev => prev === 'map' ? 'list' : 'map')
    setSelectedBusiness(null)
  }

  if (loading) {
    return (
      <div className="p-4">
        <div className="mb-6">
          <div className="h-12 bg-gray-200 rounded-lg mb-4" />
          <div className="flex gap-2 overflow-x-auto pb-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 w-24 bg-gray-200 rounded-full flex-shrink-0" />
            ))}
          </div>
        </div>
        <Loading type="cards" count={6} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4">
        <Error
          title="Failed to Load Businesses"
          message="We couldn't load local businesses right now. Please check your connection and try again."
          onRetry={loadBusinesses}
        />
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header Section */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30">
        <div className="p-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-4"
          >
            <div>
              <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                SpotLight
              </h1>
              <p className="text-slate-600 text-sm">Discover amazing local businesses</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                icon="Search"
                onClick={() => {/* Navigate to search */}}
                className="p-3"
              />
              <Button
                variant="secondary"
                icon="SlidersHorizontal"
                className="p-3"
              />
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
          >
            {categories.map((category) => (
              <CategoryPill
                key={category.value}
                category={category.name}
                icon={category.icon}
                active={selectedCategory === category.value}
                onClick={handleCategorySelect}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 relative">
        {filteredBusinesses.length === 0 ? (
          <Empty
            title="No businesses found"
            message={selectedCategory 
              ? `No ${selectedCategory}s found in your area. Try selecting a different category.`
              : "No businesses found in your area. Try expanding your search radius."
            }
            icon="MapPin"
            actionLabel="Clear Category"
            onAction={() => setSelectedCategory('')}
          />
        ) : viewMode === 'map' ? (
          <MapView
            businesses={filteredBusinesses}
            onBusinessSelect={setSelectedBusiness}
            selectedBusiness={selectedBusiness}
            showList={false}
            onToggleView={handleToggleView}
          />
        ) : (
          <div className="p-4 h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-display font-semibold text-slate-900">
                {filteredBusinesses.length} businesses found
              </h2>
              <Button
                variant="secondary"
                icon="Map"
                onClick={handleToggleView}
              >
                Map View
              </Button>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredBusinesses.map((business, index) => (
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
          </div>
        )}
      </div>
    </div>
  )
}

export default DiscoverPage