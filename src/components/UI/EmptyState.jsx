export default function EmptyState({
  icon = '📭',
  title = 'Sin elementos',
  text = 'No hay elementos disponibles. Agrega uno nuevo para comenzar.',
  action,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">{icon}</div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__text">{text}</p>
      {action}
    </div>
  )
}
