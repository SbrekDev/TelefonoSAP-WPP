import { useState, useCallback } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleMenuToggle = useCallback(() => {
    setMenuOpen(prev => !prev)
  }, [])

  const handleMenuClose = useCallback(() => {
    setMenuOpen(false)
  }, [])

  const handleNavigate = useCallback((path) => {
    navigate(path)
  }, [navigate])

  return (
    <div className="app-layout">
      <Navbar
        onMenuToggle={handleMenuToggle}
        currentPath={location.pathname}
        onNavigate={handleNavigate}
      />
      <Sidebar
        open={menuOpen}
        onClose={handleMenuClose}
        currentPath={location.pathname}
        onNavigate={handleNavigate}
      />
      <main className="main-content" role="main">
        <div className="page-enter" key={location.pathname}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
