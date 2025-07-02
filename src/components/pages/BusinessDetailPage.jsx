import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Rating from '@/components/atoms/Rating'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'
import ReviewForm from '@/components/molecules/ReviewForm'
import { businessService } from '@/services/api/businessService'
import { reviewService } from '@/services/api/reviewService'
const BusinessDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [business, setBusiness] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [isSaved, setIsSaved] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const loadBusinessDetail = async () => {
    try {
      setLoading(true)
      setError('')
      
      const [businessData, reviewsData] = await Promise.all([
        businessService.getById(parseInt(id)),
        reviewService.getByBusinessId(parseInt(id))
      ])
      
      setBusiness(businessData)
      setReviews(reviewsData)
    } catch (err) {
      setError('Failed to load business details')
      console.error('Error loading business details:', err)
    } finally {
      setLoading(false)
    }
}

  const handleReviewSuccess = () => {
    setShowReviewForm(false)
    loadBusinessDetail() // Refresh to show new review
  }

  useEffect(() => {
    loadBusinessDetail()
  }, [id])
  const handleSave = () => {
    setIsSaved(!isSaved)
    toast.success(isSaved ? 'Removed from saved' : 'Added to saved')
  }

  const handleCall = () => {
    if (business?.phone) {
      window.location.href = `tel:${business.phone}`
    }
  }

  const handleDirections = () => {
    toast.info('Opening directions...')
  }

  const handleWebsite = () => {
    if (business?.website) {
      window.open(business.website, '_blank')
    }
  }

  const isOpen = () => {
    if (!business?.hours) return false
    
    const now = new Date()
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' })
    const currentTime = now.toTimeString().slice(0, 5)
    
    const todayHours = business.hours.find(h => h.day === currentDay)
    if (!todayHours) return false
    
    return currentTime >= todayHours.open && currentTime <= todayHours.close
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'hours', label: 'Hours', icon: 'Clock' },
  ]

  if (loading) {
    return (
      <div className="p-4">
        <Loading type="detail" />
      </div>
    )
  }

  if (error || !business) {
    return (
      <div className="p-4">
        <Error
          title="Business Not Found"
          message="We couldn't find the business you're looking for. It may have been removed or the link is incorrect."
          onRetry={loadBusinessDetail}
        />
      </div>
    )
  }

  return (
    <div className="pb-6">
      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-64 bg-gray-200"
      >
        {business.images?.[0] ? (
          <img
            src={business.images[0]}
            alt={business.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <ApperIcon name="Image" className="w-16 h-16 text-gray-400" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <Badge
            variant={isOpen() ? "success" : "default"}
            icon="Clock"
          >
            {isOpen() ? "Open" : "Closed"}
          </Badge>
        </div>

        {/* Save Button */}
        <div className="absolute top-4 right-4">
          <Button
            variant="secondary"
            icon="Heart"
            onClick={handleSave}
            className={`bg-white/90 backdrop-blur-sm ${
              isSaved ? 'text-primary-500' : 'text-slate-600'
            }`}
          />
        </div>
      </motion.div>

      {/* Business Info */}
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-display font-bold text-slate-900 mb-2">
            {business.name}
          </h1>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Rating rating={business.rating} size="md" />
              <span className="text-slate-500">
                ({business.reviewCount} reviews)
              </span>
            </div>
            <Badge variant="primary" className="capitalize">
              {business.category}
            </Badge>
          </div>

          <div className="flex items-center text-slate-600 mb-4">
            <ApperIcon name="MapPin" className="w-4 h-4 mr-2" />
            <span>{business.address}</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          <Button
            variant="primary"
            icon="Phone"
            onClick={handleCall}
            className="flex-1"
          >
            Call
          </Button>
          <Button
            variant="secondary"
            icon="Navigation"
            onClick={handleDirections}
            className="flex-1"
          >
            Directions
          </Button>
          <Button
            variant="secondary"
            icon="Globe"
            onClick={handleWebsite}
            className="flex-1"
          >
            Website
          </Button>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex border-b border-gray-200 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors
                  ${activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                  }
                `}
              >
                <ApperIcon name={tab.icon} className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">About</h3>
                  <p className="text-slate-600">
                    Welcome to {business.name}, your local {business.category} serving the community with excellent service and quality.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-slate-600">
                      <ApperIcon name="Phone" className="w-4 h-4 mr-3" />
                      <span>{business.phone}</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <ApperIcon name="MapPin" className="w-4 h-4 mr-3" />
                      <span>{business.address}</span>
                    </div>
                    {business.website && (
                      <div className="flex items-center text-slate-600">
                        <ApperIcon name="Globe" className="w-4 h-4 mr-3" />
                        <span>{business.website}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

{activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {/* Write Review Button */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-900">Reviews</h3>
                  <Button
                    variant="primary"
                    size="sm"
                    icon="PlusCircle"
                    onClick={() => setShowReviewForm(!showReviewForm)}
                  >
                    Write Review
                  </Button>
                </div>

                {/* Review Form */}
                <ReviewForm
                  businessId={id}
                  isOpen={showReviewForm}
                  onSuccess={handleReviewSuccess}
                  onCancel={() => setShowReviewForm(false)}
                />

                {/* Reviews List */}
                {reviews.length === 0 ? (
                  <div className="text-center py-8">
                    <ApperIcon name="MessageSquare" className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-slate-500">No reviews yet</p>
                    <p className="text-slate-400 text-sm mt-2">Be the first to share your experience!</p>
                  </div>
                ) : (
                  reviews.map((review, index) => (
                    <motion.div
                      key={review.Id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-slate-900">{review.userName}</h4>
                        <Rating rating={review.rating} size="sm" showValue={false} />
                      </div>
                      <p className="text-slate-600 text-sm mb-2">{review.comment}</p>
                      <span className="text-xs text-slate-400">{review.date}</span>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}

            {activeTab === 'hours' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {business.hours?.map((dayHours, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <span className="font-medium text-slate-900">{dayHours.day}</span>
                    <span className="text-slate-600">
                      {dayHours.open} - {dayHours.close}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default BusinessDetailPage