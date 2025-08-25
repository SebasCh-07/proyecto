export default function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="header">
          <h3>{title}</h3>
          <button className="btn secondary" onClick={onClose}>Cerrar</button>
        </div>
        <div className="separator" />
        <div>{children}</div>
      </div>
    </div>
  )
}
