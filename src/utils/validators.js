export const isRequired = (value) => {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return true
}

export const isEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isPhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-()]{10,}$/
  return phoneRegex.test(phone)
}

export const isUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const minLength = (value, min) => {
  if (typeof value !== 'string') return false
  return value.length >= min
}

export const maxLength = (value, max) => {
  if (typeof value !== 'string') return false
  return value.length <= max
}

export const isNumeric = (value) => {
  return !isNaN(value) && !isNaN(parseFloat(value))
}

export const isInteger = (value) => {
  return Number.isInteger(Number(value))
}

export const inRange = (value, min, max) => {
  const num = Number(value)
  return num >= min && num <= max
}

export const isPositive = (value) => {
  return Number(value) > 0
}

export const isRating = (value) => {
  const num = Number(value)
  return num >= 0 && num <= 5
}

export const validateBusiness = (business) => {
  const errors = {}
  
  if (!isRequired(business.name)) {
    errors.name = 'Business name is required'
  }
  
  if (!isRequired(business.category)) {
    errors.category = 'Category is required'
  }
  
  if (!isRequired(business.address)) {
    errors.address = 'Address is required'
  }
  
  if (business.phone && !isPhone(business.phone)) {
    errors.phone = 'Please enter a valid phone number'
  }
  
  if (business.website && !isUrl(business.website)) {
    errors.website = 'Please enter a valid URL'
  }
  
  if (business.rating && !isRating(business.rating)) {
    errors.rating = 'Rating must be between 0 and 5'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateReview = (review) => {
  const errors = {}
  
  if (!isRequired(review.userName)) {
    errors.userName = 'Name is required'
  }
  
  if (!isRequired(review.rating)) {
    errors.rating = 'Rating is required'
  } else if (!isRating(review.rating)) {
    errors.rating = 'Rating must be between 1 and 5'
  }
  
  if (!isRequired(review.comment)) {
    errors.comment = 'Comment is required'
  } else if (!minLength(review.comment, 10)) {
    errors.comment = 'Comment must be at least 10 characters long'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateSearchFilters = (filters) => {
  const errors = {}
  
  if (filters.radius && (!isNumeric(filters.radius) || !isPositive(filters.radius))) {
    errors.radius = 'Radius must be a positive number'
  }
  
  if (filters.minRating && !isRating(filters.minRating)) {
    errors.minRating = 'Minimum rating must be between 0 and 5'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}