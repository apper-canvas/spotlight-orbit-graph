import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import BusinessCard from '@/components/molecules/BusinessCard'
import ApperIcon from '@/components/ApperIcon'

const MapView = ({ businesses, onBusinessSelect, selectedBusiness, showList = false, onToggleView }) => {
  const [userLocation, setUserLocation] = useState(null)

  useEffect(() => {
    // Simulate getting user location
    setUserLocation({ lat: 40.7128, lng: -74.0060 })
  }, [])

  const handleMarkerClick = (business) => {
    onBusinessSelect?.(business)
  }

  return (
    <div className="relative h-full">
      {/* Map Container */}
      <div className="relative h-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg overflow-hidden">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-8 h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className={`border border-gray-300 ${
                  Math.random() > 0.7 ? 'bg-green-200' : 
                  Math.random() > 0.8 ? 'bg-blue-200' : 'bg-gray-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* User Location Pin */}
        {userLocation && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <div className="relative">
              <div className="w-4 h-4 bg-primary-500 rounded-full border-2 border-white shadow-lg"></div>
              <div className="absolute inset-0 w-4 h-4 bg-primary-500 rounded-full animate-ping opacity-75"></div>
            </div>
          </motion.div>
        )}

        {/* Business Pins */}
        {businesses.map((business, index) => {
          const positions = [
            { top: '30%', left: '25%' },
            { top: '40%', left: '60%' },
            { top: '60%', left: '30%' },
            { top: '70%', left: '70%' },
            { top: '35%', left: '80%' },
            { top: '80%', left: '20%' },
          ]
          
          const position = positions[index % positions.length]
          const isSelected = selectedBusiness?.Id === business.Id

          return (
            <motion.button
              key={business.Id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleMarkerClick(business)}
              className="absolute z-10 transform -translate-x-1/2 -translate-y-full"
              style={position}
            >
              <div className={`
                relative bg-white rounded-lg shadow-lg border-2 px-3 py-2 min-w-max
                ${isSelected ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200'}
                hover:shadow-xl transition-all duration-200
              `}>
                <div className="flex items-center gap-2">
                  <div className={`
                    w-2 h-2 rounded-full
                    ${business.rating > 4 ? 'bg-success-500' : 'bg-yellow-500'}
                  `} />
                  <span className="text-sm font-medium text-slate-900">
                    {business.name}
                  </span>
                  <span className="text-xs text-slate-500">
                    {business.rating.toFixed(1)}★
                  </span>
                </div>
                
                {/* Pin pointer */}
                <div className={`
                  absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 
                  border-l-[6px] border-r-[6px] border-t-[8px] border-transparent
                  ${isSelected ? 'border-t-primary-500' : 'border-t-white'}
                `} />
              </div>
            </motion.button>
          )
        })}

        {/* Controls */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <Button
            variant="secondary"
            icon={showList ? "Map" : "List"}
            onClick={onToggleView}
            className="bg-white/90 backdrop-blur-sm shadow-lg"
          />
          
          <Button
            variant="secondary"
            icon="Locate"
            className="bg-white/90 backdrop-blur-sm shadow-lg p-3"
          />
        </div>
      </div>

      {/* Selected Business Card */}
      {selectedBusiness && !showList && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="absolute bottom-4 left-4 right-4 z-30"
        >
          <BusinessCard business={selectedBusiness} />
        </motion.div>
      )}
    </div>
  )
}

export default MapView