import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import DiscoverPage from '@/components/pages/DiscoverPage'
import BusinessDetailPage from '@/components/pages/BusinessDetailPage'
import SearchPage from '@/components/pages/SearchPage'
import SavedPage from '@/components/pages/SavedPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DiscoverPage />} />
            <Route path="/business/:id" element={<BusinessDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/saved" element={<SavedPage />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          className="z-50"
        />
      </div>
    </Router>
  )
}

export default App