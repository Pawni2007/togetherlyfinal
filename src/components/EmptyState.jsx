// A friendly message for screens with nothing to show. "action" is any button or link.
export default function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <div className="empty">
      {Icon && (
        <span className="empty__icon" aria-hidden="true">
          <Icon size={26} />
        </span>
      )}
      <h3 className="empty__title">{title}</h3>
      {text && <p className="empty__text">{text}</p>}
      {action && <div className="empty__action">{action}</div>}
    </div>
  );
}
