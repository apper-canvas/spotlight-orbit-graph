import businessData from '@/services/mockData/businesses.json'

const STORAGE_KEY = 'spotlight_businesses'

class BusinessService {
  constructor() {
    this.businesses = this.loadBusinesses()
  }

  loadBusinesses() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : [...businessData]
    } catch (error) {
      console.error('Error loading businesses from localStorage:', error)
      return [...businessData]
    }
  }

  saveBusinesses() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.businesses))
    } catch (error) {
      console.error('Error saving businesses to localStorage:', error)
    }
  }

  async delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async getAll() {
    await this.delay()
    return [...this.businesses]
  }

  async getById(id) {
    await this.delay()
    const business = this.businesses.find(b => b.Id === id)
    if (!business) {
      throw new Error(`Business with ID ${id} not found`)
    }
    return { ...business }
  }

  async create(businessData) {
    await this.delay()
    const maxId = Math.max(...this.businesses.map(b => b.Id), 0)
    const newBusiness = {
      Id: maxId + 1,
      ...businessData,
      rating: 0,
      reviewCount: 0,
      images: businessData.images || []
    }
    this.businesses.push(newBusiness)
    this.saveBusinesses()
    return { ...newBusiness }
  }

  async update(id, updates) {
    await this.delay()
    const index = this.businesses.findIndex(b => b.Id === id)
    if (index === -1) {
      throw new Error(`Business with ID ${id} not found`)
    }
    this.businesses[index] = { ...this.businesses[index], ...updates }
    this.saveBusinesses()
    return { ...this.businesses[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.businesses.findIndex(b => b.Id === id)
    if (index === -1) {
      throw new Error(`Business with ID ${id} not found`)
    }
    const deleted = this.businesses.splice(index, 1)[0]
    this.saveBusinesses()
    return { ...deleted }
  }

  async searchByLocation(lat, lng, radius = 10) {
    await this.delay()
    // In a real app, this would calculate distance based on coordinates
    // For demo purposes, return all businesses with simulated distances
    return this.businesses.map(business => ({
      ...business,
      distance: (Math.random() * radius).toFixed(1)
    }))
  }

  async getByCategory(category) {
    await this.delay()
    return this.businesses.filter(business => 
      business.category.toLowerCase() === category.toLowerCase()
    )
  }
}

export const businessService = new BusinessService()