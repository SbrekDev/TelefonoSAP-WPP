import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/mensajes-predefinidos', label: 'Mensajes predefinidos', icon: '💬' },
  { path: '/notas-temporales', label: 'Notas Temporales', icon: '📝' },
]

export default function Sidebar({ open, onClose, currentPath, onNavigate }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleNavigate = (path) => {
    onNavigate(path)
    onClose()
  }

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <>
      <div
        className={`sidebar-overlay ${open ? 'sidebar-overlay--open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`sidebar ${open ? 'sidebar--open' : ''}`}
        aria-label="Menú de navegación"
      >
        <div className="sidebar__header">
          <span className="sidebar__header-title">SAP-TelefonoWPP</span>
          <button className="sidebar__close" onClick={onClose} aria-label="Cerrar menú">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="sidebar__nav">
          <div className="sidebar__section-label">Secciones</div>
          {NAV_ITEMS.map(item => (
            <button
              key={item.path}
              className={`sidebar__nav-item ${currentPath === item.path ? 'sidebar__nav-item--active' : ''}`}
              onClick={() => handleNavigate(item.path)}
            >
              <span className="sidebar__nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar__footer">
          <button className="sidebar__logout" onClick={handleLogout}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  )
}
