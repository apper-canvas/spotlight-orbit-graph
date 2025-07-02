import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const getTitle = () => {
    switch (location.pathname) {
      case '/search':
        return 'Search'
      case '/saved':
        return 'Saved Places'
      default:
        if (location.pathname.startsWith('/business/')) {
          return 'Business Details'
        }
        return 'SpotLight'
    }
  }

  const showBackButton = location.pathname !== '/' && location.pathname !== '/search' && location.pathname !== '/saved'

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30"
    >
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {showBackButton ? (
              <Button
                variant="ghost"
                icon="ArrowLeft"
                onClick={() => navigate(-1)}
                className="mr-3 p-2"
              />
            ) : (
              <div className="w-10" />
            )}
            
            <h1 className="text-xl font-display font-semibold text-slate-900">
              {getTitle()}
            </h1>
          </div>

          {location.pathname === '/' && (
            <Button
              variant="ghost"
              icon="Search"
              onClick={() => navigate('/search')}
              className="p-2"
            />
          )}
        </div>
      </div>
    </motion.header>
  )
}

export default Header