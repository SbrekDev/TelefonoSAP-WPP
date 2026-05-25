import { useState } from 'react'

export default function Accordion({
  title,
  defaultOpen = true,
  children,
  badge,
  className = '',
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={`accordion ${open ? 'accordion--open' : ''} ${className}`}>
      <button
        className="accordion__header"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        type="button"
      >
        <span className="accordion__title">{title}</span>
        {badge != null && (
          <span className="accordion__badge">{badge}</span>
        )}
        <svg
          className="accordion__chevron"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className="accordion__content">
        <div className="accordion__body">
          {children}
        </div>
      </div>
    </div>
  )
}
