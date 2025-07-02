export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export const formatNumber = (number, options = {}) => {
  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    useGrouping = true
  } = options

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping
  }).format(number)
}

export const formatPercentage = (value, decimals = 1) => {
  return `${(value * 100).toFixed(decimals)}%`
}

export const formatDate = (date, options = {}) => {
  const {
    dateStyle = 'medium',
    timeStyle,
    locale = 'en-US'
  } = options
  
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  return new Intl.DateTimeFormat(locale, {
    dateStyle,
    timeStyle
  }).format(dateObj)
}

export const formatRelativeTime = (date) => {
  const now = new Date()
  const targetDate = typeof date === 'string' ? new Date(date) : date
  const diffInSeconds = Math.floor((now - targetDate) / 1000)
  
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ]
  
  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds)
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`
    }
  }
  
  return 'just now'
}

export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  
  if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }
  
  return phone
}

export const formatAddress = (address) => {
  if (typeof address === 'string') {
    return address
  }
  
  const { street, city, state, zipCode, country } = address
  const parts = [street, city, state, zipCode, country].filter(Boolean)
  return parts.join(', ')
}

export const formatRating = (rating, maxRating = 5) => {
  const clampedRating = Math.max(0, Math.min(rating, maxRating))
  return clampedRating.toFixed(1)
}

export const formatDistance = (distance, unit = 'mi') => {
  if (distance < 0.1) {
    return unit === 'mi' ? '< 0.1 mi' : '< 0.1 km'
  }
  
  if (distance < 1) {
    return `${distance.toFixed(1)} ${unit}`
  }
  
  return `${Math.round(distance)} ${unit}`
}

export const truncateText = (text, maxLength = 100, suffix = '...') => {
  if (text.length <= maxLength) {
    return text
  }
  
  return text.slice(0, maxLength - suffix.length) + suffix
}

export const formatBusinessHours = (hours) => {
  if (!hours || !Array.isArray(hours)) {
    return 'Hours not available'
  }
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const todayHours = hours.find(h => h.day === today)
  
  if (!todayHours) {
    return 'Hours not available'
  }
  
  if (todayHours.open === 'Closed' || todayHours.close === 'Closed') {
    return 'Closed today'
  }
  
  return `Open today: ${todayHours.open} - ${todayHours.close}`
}