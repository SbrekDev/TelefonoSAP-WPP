export default function Card({
  title,
  actions,
  children,
  className = '',
  headerClassName = '',
  bodyClassName = '',
}) {
  return (
    <article className={`card ${className}`}>
      {(title || actions) && (
        <div className={`card__header ${headerClassName}`}>
          {title && <h3 className="card__title">{title}</h3>}
          {actions && <div className="card__actions">{actions}</div>}
        </div>
      )}
      {children && (
        <div className={`card__body ${bodyClassName}`}>
          {children}
        </div>
      )}
    </article>
  )
}
