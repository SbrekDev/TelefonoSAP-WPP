import { forwardRef } from 'react'

const Input = forwardRef(function Input({
  label,
  error,
  textarea,
  className = '',
  id,
  ...props
}, ref) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`
  const Tag = textarea ? 'textarea' : 'input'

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
        </label>
      )}
      <Tag
        ref={ref}
        id={inputId}
        className="form-input"
        {...props}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  )
})

export default Input
