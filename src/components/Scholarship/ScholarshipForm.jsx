import { useState } from 'react'

const blank = { scholarshipName: '', state: '', applicableClass: '', deadline: '', status: 'Draft', providerName: '', benefit: '', eligibility: '', officialLink: '' }

export function ScholarshipForm({ initialValue, onSave, onCancel }) {
  const [form, setForm] = useState(() => ({ ...blank, ...initialValue }))
  const update = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }))
  const submit = event => { event.preventDefault(); onSave(form) }
  return <form className="scholarship-form" onSubmit={submit}>
    <label className="form-field full-field">Scholarship name<input name="scholarshipName" value={form.scholarshipName} onChange={update} required maxLength={120} placeholder="e.g. National Merit Scholarship"/></label>
    <label className="form-field">State / region<input name="state" value={form.state} onChange={update} required placeholder="e.g. Bihar or All India"/></label>
    <label className="form-field">Applicable class<input name="applicableClass" value={form.applicableClass} onChange={update} placeholder="e.g. Class 11-12"/></label>
    <label className="form-field">Application deadline<input type="date" name="deadline" value={form.deadline} onChange={update}/></label>
    <label className="form-field">Status<select name="status" value={form.status} onChange={update}><option>Published</option><option>Draft</option></select></label>
    <label className="form-field full-field">Provider<input name="providerName" value={form.providerName} onChange={update} required placeholder="Organization or department"/></label>
    <label className="form-field full-field">Benefit<input name="benefit" value={form.benefit} onChange={update} placeholder="Award amount or support provided"/></label>
    <label className="form-field full-field">Eligibility<textarea name="eligibility" value={form.eligibility} onChange={update} rows="3" placeholder="Who can apply?"/></label>
    <label className="form-field full-field">Official website<input type="url" name="officialLink" value={form.officialLink} onChange={update} placeholder="https://"/></label>
    <div className="form-actions"><button type="button" className="button button-secondary" onClick={onCancel}>Cancel</button><button type="submit" className="button button-primary">{initialValue ? 'Save changes' : 'Add scholarship'}</button></div>
  </form>
}
