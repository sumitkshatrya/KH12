import { Check, X } from 'lucide-react'

export function ToastContainer({ message, onClose, type = 'success' }) {
  if (!message) return null
  return <div className={`toast toast-${type}`} role="status"><span className="toast-check"><Check size={15}/></span><span>{message}</span><button onClick={onClose} aria-label="Dismiss notification"><X size={15}/></button></div>
}
