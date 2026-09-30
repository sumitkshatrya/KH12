import { X } from 'lucide-react'

export function ScholarshipModal({ title, children, onClose }) {
  return <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}><section className="form-modal" role="dialog" aria-modal="true"><div className="modal-heading"><h2>{title}</h2><button className="icon-button" aria-label="Close" onClick={onClose}><X size={19}/></button></div>{children}</section></div>
}
