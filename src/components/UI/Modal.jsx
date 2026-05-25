import { useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
}) {
  const modalRef = useRef(null)

  const handleKeyDown = useCallback(e => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, handleKeyDown])

  if (!open) return null

  return createPortal(
    <div
      className="modal-overlay modal-overlay--open"
      onClick={e => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="modal" ref={modalRef}>
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button className="modal__close" onClick={onClose} aria-label="Cerrar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="modal__body">
          {children}
        </div>
        {footer && (
          <div className="modal__footer">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}
