import { useLocalStorage } from '../../hooks/useLocalStorage'
import ThemeToggle from '../UI/ThemeToggle'
import { useState } from 'react'

const NAV_ITEMS = [
  { path: '/mensajes-predefinidos', label: 'Mensajes' },
  { path: '/notas-temporales', label: 'Notas' },
  { path: '/info-medicos', label: 'Médicos' },
  { path: '/info-obras-sociales', label: 'Obras Sociales' },
  { path: '/info-contactos', label: 'Contactos' },
]

export default function Navbar({ onMenuToggle, currentPath, onNavigate }) {
  const [globalName, setGlobalName] = useLocalStorage('global_name', '')
  const [nameInput, setNameInput] = useState(globalName)

  const handleSaveName = () => {
    setGlobalName(nameInput.trim())
  }

  const handleNameKeyDown = (e) => {
    if (e.key === 'Enter') handleSaveName()
  }

  return (
    <header className="navbar" role="banner">
      <div className="navbar__left">
        <button
          className="navbar__menu-btn"
          onClick={onMenuToggle}
          aria-label="Abrir menú de navegación"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      <nav className="navbar__nav-links" aria-label="Navegación principal">
        {NAV_ITEMS.map(item => (
          <button
            key={item.path}
            className={`navbar__nav-link ${currentPath === item.path ? 'navbar__nav-link--active' : ''}`}
            onClick={() => onNavigate(item.path)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="navbar__center">
        <div className="navbar__name-input">
          <input
            type="text"
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            onKeyDown={handleNameKeyDown}
            placeholder="Tu nombre..."
            aria-label="Nombre global"
          />
          <button
            className="btn btn--primary btn--sm"
            onClick={handleSaveName}
            disabled={!nameInput.trim()}
          >
            Guardar
          </button>
        </div>
      </div>

      <div className="navbar__right">
        <ThemeToggle />
      </div>
    </header>
  )
}
