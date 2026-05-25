import { forwardRef } from 'react'

const Button = forwardRef(function Button({
  children,
  variant = 'primary',
  size,
  fullWidth,
  icon,
  disabled,
  type = 'button',
  className = '',
  ...props
}, ref) {
  const classes = [
    'btn',
    `btn--${variant}`,
    size && `btn--${size}`,
    fullWidth && 'btn--full',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

export default Button
