import reviewData from '@/services/mockData/reviews.json'

const STORAGE_KEY = 'spotlight_reviews'

class ReviewService {
  constructor() {
    this.reviews = this.loadReviews()
  }

  loadReviews() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : [...reviewData]
    } catch (error) {
      console.error('Error loading reviews from localStorage:', error)
      return [...reviewData]
    }
  }

  saveReviews() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.reviews))
    } catch (error) {
      console.error('Error saving reviews to localStorage:', error)
    }
  }

  async delay(ms = 250) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getAll() {
    await this.delay()
    return [...this.reviews]
  }

  async getById(id) {
    await this.delay()
    const review = this.reviews.find(r => r.Id === id)
    if (!review) {
      throw new Error(`Review with ID ${id} not found`)
    }
    return { ...review }
  }

  async getByBusinessId(businessId) {
    await this.delay()
    return this.reviews
      .filter(review => review.businessId === businessId)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  async create(reviewData) {
    await this.delay()
    const maxId = Math.max(...this.reviews.map(r => r.Id), 0)
    const newReview = {
      Id: maxId + 1,
      ...reviewData,
      date: new Date().toISOString().split('T')[0]
    }
    this.reviews.push(newReview)
    this.saveReviews()
    return { ...newReview }
  }

  async update(id, updates) {
    await this.delay()
    const index = this.reviews.findIndex(r => r.Id === id)
    if (index === -1) {
      throw new Error(`Review with ID ${id} not found`)
    }
    this.reviews[index] = { ...this.reviews[index], ...updates }
    this.saveReviews()
    return { ...this.reviews[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.reviews.findIndex(r => r.Id === id)
    if (index === -1) {
      throw new Error(`Review with ID ${id} not found`)
    }
    const deleted = this.reviews.splice(index, 1)[0]
    this.saveReviews()
    return { ...deleted }
  }
}

export const reviewService = new ReviewService()