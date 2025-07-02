import { useState } from 'react'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const SearchBar = ({ onSearch, placeholder = "Search businesses...", showFilter = false, onFilterClick }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(query)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="flex-1">
        <Input
          icon="Search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-white shadow-sm"
        />
      </div>
      
      {showFilter && (
        <Button
          variant="secondary"
          icon="SlidersHorizontal"
          onClick={onFilterClick}
        />
      )}
    </form>
  )
}

export default SearchBar