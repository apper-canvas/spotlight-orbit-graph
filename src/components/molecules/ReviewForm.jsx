import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ApperIcon from '@/components/ApperIcon'
import { validateReview } from '@/utils/validators'
import { reviewService } from '@/services/api/reviewService'

const ReviewForm = ({ businessId, onSuccess, onCancel, isOpen }) => {
  const [formData, setFormData] = useState({
    userName: '',
    rating: 0,
    comment: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleRatingClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }))
    if (errors.rating) {
      setErrors(prev => ({ ...prev, rating: '' }))
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const validation = validateReview(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setIsSubmitting(true)
    try {
      await reviewService.create({
        businessId: parseInt(businessId),
        userName: formData.userName,
        rating: formData.rating,
        comment: formData.comment
      })
      
      toast.success('Review submitted successfully!')
      setFormData({ userName: '', rating: 0, comment: '' })
      setErrors({})
      onSuccess?.()
    } catch (error) {
      console.error('Error submitting review:', error)
      toast.error('Failed to submit review. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1
      const isFilled = starValue <= (hoveredRating || formData.rating)
      
      return (
        <button
          key={index}
          type="button"
          onClick={() => handleRatingClick(starValue)}
          onMouseEnter={() => setHoveredRating(starValue)}
          onMouseLeave={() => setHoveredRating(0)}
          className="focus:outline-none transition-transform hover:scale-110"
        >
          <ApperIcon
            name="Star"
            className={`w-8 h-8 transition-colors ${
              isFilled 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300 hover:text-yellow-200'
            }`}
          />
        </button>
      )
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white border border-gray-200 rounded-lg p-6 mt-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Write a Review</h3>
            <Button
              variant="ghost"
              size="sm"
              icon="X"
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Your Name
              </label>
              <Input
                type="text"
                value={formData.userName}
                onChange={(e) => handleInputChange('userName', e.target.value)}
                placeholder="Enter your name"
                error={errors.userName}
                className="w-full"
              />
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Rating
              </label>
              <div className="flex items-center gap-1 mb-2">
                {renderStars()}
              </div>
              {formData.rating > 0 && (
                <p className="text-sm text-slate-600">
                  {formData.rating} star{formData.rating !== 1 ? 's' : ''}
                </p>
              )}
              {errors.rating && (
                <p className="text-sm text-red-600 mt-1">{errors.rating}</p>
              )}
            </div>

            {/* Comment Textarea */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Your Review
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) => handleInputChange('comment', e.target.value)}
                placeholder="Share your experience..."
                rows={4}
                className={`
                  w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent
                  ${errors.comment ? 'border-red-300' : 'border-gray-300'}
                `}
              />
              <div className="flex justify-between items-center mt-1">
                <span className={`text-xs ${
                  formData.comment.length > 500 ? 'text-red-600' : 'text-slate-500'
                }`}>
                  {formData.comment.length}/500 characters
                </span>
                {formData.comment.length >= 10 && (
                  <span className="text-xs text-green-600">
                    <ApperIcon name="Check" className="w-3 h-3 inline mr-1" />
                    Minimum length met
                  </span>
                )}
              </div>
              {errors.comment && (
                <p className="text-sm text-red-600 mt-1">{errors.comment}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
                disabled={isSubmitting}
                className="flex-1"
              >
                Submit Review
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ReviewForm