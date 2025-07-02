import { Outlet, useLocation } from 'react-router-dom'
import BottomNavigation from '@/components/organisms/BottomNavigation'
import Header from '@/components/organisms/Header'

const Layout = () => {
  const location = useLocation()
  const showHeader = location.pathname !== '/'

  return (
    <div className="min-h-screen bg-background pb-20">
      {showHeader && <Header />}
      
      <main className={showHeader ? 'pt-4' : ''}>
        <Outlet />
      </main>
      
      <BottomNavigation />
    </div>
  )
}

export default Layout