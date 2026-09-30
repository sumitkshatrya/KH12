import { Trash2, X } from 'lucide-react'

export function DeleteConfirmModal({ scholarshipName, onConfirm, onCancel }) {
  return <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onCancel() }}><section className="confirm-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-title"><button className="icon-button close-confirm" onClick={onCancel} aria-label="Close"><X size={18}/></button><div className="confirm-icon"><Trash2 size={20}/></div><h2 id="delete-title">Delete scholarship?</h2><p><b>{scholarshipName}</b> will be removed from your saved records.</p><div className="form-actions"><button className="button button-secondary" onClick={onCancel}>Cancel</button><button className="button button-danger" onClick={onConfirm}>Delete</button></div></section></div>
}
