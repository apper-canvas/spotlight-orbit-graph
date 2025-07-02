import { useState, useEffect, useMemo } from 'react'

export const useLocalSearch = (data, searchFields = ['name'], options = {}) => {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({})
  const [sortBy, setSortBy] = useState('')
  
  const {
    caseSensitive = false,
    exactMatch = false,
    minQueryLength = 0
  } = options

  const filteredAndSortedData = useMemo(() => {
    let result = [...data]

    // Apply search query
    if (query.trim() && query.length >= minQueryLength) {
      const searchQuery = caseSensitive ? query.trim() : query.trim().toLowerCase()
      
      result = result.filter(item => {
        return searchFields.some(field => {
          const fieldValue = getNestedValue(item, field)
          if (fieldValue === null || fieldValue === undefined) return false
          
          const stringValue = caseSensitive ? String(fieldValue) : String(fieldValue).toLowerCase()
          
          return exactMatch 
            ? stringValue === searchQuery
            : stringValue.includes(searchQuery)
        })
      })
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== null && value !== undefined) {
        result = result.filter(item => {
          const itemValue = getNestedValue(item, key)
          if (Array.isArray(value)) {
            return value.includes(itemValue)
          }
          return itemValue === value
        })
      }
    })

    // Apply sorting
    if (sortBy) {
      result.sort((a, b) => {
        const aValue = getNestedValue(a, sortBy)
        const bValue = getNestedValue(b, sortBy)
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return bValue - aValue // Descending for numbers
        }
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue) // Ascending for strings
        }
        
        return 0
      })
    }

    return result
  }, [data, query, filters, sortBy, searchFields, caseSensitive, exactMatch, minQueryLength])

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj)
  }

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearFilter = (key) => {
    setFilters(prev => {
      const newFilter = { ...prev }
      delete newFilter[key]
      return newFilter
    })
  }

  const clearAllFilters = () => {
    setFilters({})
    setQuery('')
    setSortBy('')
  }

  const hasActiveFilters = query.trim() || Object.keys(filters).length > 0 || sortBy

  return {
    query,
    setQuery,
    filters,
    setFilters,
    updateFilter,
    clearFilter,
    sortBy,
    setSortBy,
    filteredData: filteredAndSortedData,
    clearAllFilters,
    hasActiveFilters,
    resultCount: filteredAndSortedData.length
  }
}