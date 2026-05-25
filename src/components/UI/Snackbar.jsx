export default function Snackbar({ message, visible }) {
  if (!message && !visible) return null

  return (
    <div
      className={`snackbar ${visible ? 'snackbar--visible' : ''}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {message}
    </div>
  )
}
