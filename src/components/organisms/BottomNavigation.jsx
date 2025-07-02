import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const BottomNavigation = () => {
  const navItems = [
    {
      path: '/',
      label: 'Discover',
      icon: 'Compass',
      exact: true
    },
    {
      path: '/map',
      label: 'Map',
      icon: 'Map',
    },
    {
      path: '/saved',
      label: 'Saved',
      icon: 'Heart',
    },
    {
      path: '/search',
      label: 'Search',
      icon: 'Search',
    }
  ]

  return (
    <motion.nav
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 z-40"
    >
      <div className="flex items-center justify-around py-2 px-4 safe-area-inset-bottom">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-primary-500 bg-primary-50'
                  : 'text-slate-500 hover:text-slate-700'
              }`
            }
          >
            {({ isActive }) => (
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <ApperIcon
                    name={item.icon}
                    className="w-6 h-6"
                    fill={isActive ? 'currentColor' : 'none'}
                  />
                </motion.div>
                <span className="text-xs font-medium mt-1">
                  {item.label}
                </span>
              </motion.div>
            )}
          </NavLink>
        ))}
      </div>
    </motion.nav>
  )
}

export default BottomNavigation