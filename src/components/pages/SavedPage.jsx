import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BusinessCard from '@/components/molecules/BusinessCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { businessService } from '@/services/api/businessService'

const SavedPage = () => {
  const [savedBusinesses, setSavedBusinesses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadSavedBusinesses = async () => {
    try {
      setLoading(true)
      setError('')
      
      // In a real app, you'd load saved business IDs from localStorage or backend
      // For demo, we'll just show a few businesses as "saved"
      const allBusinesses = await businessService.getAll()
      const saved = allBusinesses.slice(0, 3) // Simulate saved businesses
      
      setSavedBusinesses(saved)
    } catch (err) {
      setError('Failed to load saved businesses')
      console.error('Error loading saved businesses:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSavedBusinesses()
  }, [])

  const handleBusinessRemove = (businessId) => {
    setSavedBusinesses(prev => prev.filter(business => business.Id !== businessId))
  }

  if (loading) {
    return (
      <div className="p-4">
        <Loading type="cards" count={3} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4">
        <Error
          title="Failed to Load Saved Businesses"
          message="We couldn't load your saved businesses. Please try again."
          onRetry={loadSavedBusinesses}
        />
      </div>
    )
  }

  return (
    <div className="p-4 pb-24">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-display font-bold text-slate-900 mb-2">
          Saved Places
        </h1>
        <p className="text-slate-600">
          Your favorite local businesses
        </p>
      </motion.div>

      {savedBusinesses.length === 0 ? (
        <Empty
          title="No saved businesses yet"
          message="Start exploring and save your favorite local businesses to see them here."
          icon="Heart"
          actionLabel="Discover Businesses"
          onAction={() => window.location.href = '/'}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-display font-semibold text-slate-900">
              {savedBusinesses.length} saved businesses
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedBusinesses.map((business, index) => (
              <motion.div
                key={business.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <BusinessCard
                  business={business}
                  onSave={handleBusinessRemove}
                  isSaved={true}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default SavedPage