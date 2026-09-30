import { useState } from 'react'
import { LayoutDashboard, GraduationCap, Settings, Plus, Search, Pencil, Trash2, ExternalLink, X, RotateCcw, Menu } from 'lucide-react'
import { useScholarships } from './hooks/useScholarships.js'
import { initialScholarships } from './data/initialScholarships.js'
import { formatDate, getStatus } from './utils/scholarshipUtils.js'
import { SummaryCards } from './components/Dashboard/SummaryCards.jsx'
import { StatusBadge } from './components/Dashboard/StatusBadge.jsx'
import { ScholarshipForm } from './components/Scholarship/ScholarshipForm.jsx'
import { DeleteConfirmModal } from './components/Scholarship/DeleteConfirmModal.jsx'
import { ToastContainer } from './components/Toast/ToastContainer.jsx'
import './App.css'

export default function App() {
  const { scholarships, setScholarships, reset } = useScholarships()
  const [page, setPage] = useState('Dashboard')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All Status')
  const [editing, setEditing] = useState(null)
  const [pendingDelete, setPendingDelete] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [today] = useState(() => new Date().toISOString().slice(0, 10))
  const [todayLabel] = useState(() => new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }))
  const rows = scholarships.map(item => ({ ...item, status: getStatus(item, today) }))
  const visible = rows.filter(item => (filter === 'All Status' || item.status === filter) && `${item.scholarshipName} ${item.state} ${item.providerName}`.toLowerCase().includes(query.toLowerCase()))
  const notify = message => { setToast(message); window.setTimeout(() => setToast(''), 2800) }
  const save = item => {
    setScholarships(current => editing ? current.map(row => row.id === editing.id ? { ...item, id: editing.id } : row) : [{ ...item, id: crypto.randomUUID() }, ...current])
    notify(editing ? 'Scholarship updated successfully' : 'Scholarship added successfully')
    setFormOpen(false); setEditing(null)
  }
  const remove = id => { setScholarships(current => current.filter(item => item.id !== id)); notify('Scholarship deleted') }
  const nav = [{ name: 'Dashboard', icon: LayoutDashboard }, { name: 'Scholarships', icon: GraduationCap }, { name: 'Settings', icon: Settings }]
  return <div className="app-shell">
    <aside className={`sidebar ${mobileMenu ? 'sidebar-open' : ''}`}>
      <a className="brand" href="#home"><span className="brand-mark"><GraduationCap size={22}/></span><span>Scholar<span className="brand-accent">Desk</span><small>OPPORTUNITY MANAGER</small></span></a>
      <div className="nav-caption">WORKSPACE</div>
      {nav.map(({ name, icon: Icon }) => <button key={name} className={`nav-link ${page === name ? 'active' : ''}`} onClick={() => { setPage(name); setMobileMenu(false) }}><Icon size={18}/>{name}{name === 'Scholarships' && <span className="nav-count">{scholarships.length}</span>}</button>)}
      <div className="sidebar-note"><div className="note-icon">✦</div><strong>Make an impact</strong><p>Keep every opportunity organized and within reach.</p></div>
      <div className="profile"><div className="avatar">EP</div><div><strong>Employee</strong><small>K12 Admin</small></div><span className="online-dot"/></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><button className="icon-button mobile-menu" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle navigation"><Menu size={20}/></button><div className="breadcrumb">Workspace <span>/</span> <b>{page}</b></div><div className="top-actions"><span className="today-label">{todayLabel}</span><div className="avatar small-avatar">EP</div></div></header>
      <div className="page-content">
        <div className="page-heading"><div><div className="eyebrow">SCHOLARSHIP MANAGEMENT</div><h1>{page === 'Settings' ? 'Settings' : page === 'Scholarships' ? 'All Scholarships' : 'Scholarship Dashboard'}</h1><p>{page === 'Settings' ? 'Manage your scholarship data and preferences.' : 'Manage and monitor scholarship opportunities.'}</p></div><div className="heading-actions"><button className="button button-secondary" onClick={() => { reset(initialScholarships); notify('Sample records restored') }}><RotateCcw size={16}/> Reset data</button><button className="button button-primary" onClick={() => { setEditing(null); setFormOpen(true) }}><Plus size={17}/> Add scholarship</button></div></div>
        {page === 'Settings' ? <section className="settings-card"><h2>Data management</h2><p>Scholarship records are saved in this browser on this device.</p><button className="button button-secondary" onClick={() => { reset(initialScholarships); notify('Sample records restored') }}><RotateCcw size={16}/> Restore sample scholarships</button><div className="settings-count">Currently managing <b>{scholarships.length}</b> scholarships.</div></section> : <>
          <SummaryCards scholarships={rows} selected={filter} onSelect={setFilter}/>
          <section className="table-card"><div className="table-toolbar"><div><h2>Scholarship opportunities</h2><p>Review and manage your scholarship listings</p></div><div className="toolbar-controls"><label className="search-box"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search scholarships..."/><kbd>⌘ K</kbd></label><select aria-label="Filter by status" value={filter} onChange={e => setFilter(e.target.value)}><option>All Status</option><option>Published</option><option>Draft</option><option>Expired</option></select></div></div>
            <div className="table-wrap"><table><thead><tr><th>SCHOLARSHIP</th><th>STATE / CLASS</th><th>DEADLINE</th><th>STATUS</th><th>PROVIDER</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{visible.map(item => <tr key={item.id}><td><div className="scholar-name">{item.scholarshipName}</div><div className="scholar-benefit">{item.benefit}</div></td><td><div className="state-name">{item.state}</div><div className="scholar-benefit">{item.applicableClass}</div></td><td><div className="deadline">{formatDate(item.deadline)}</div></td><td><StatusBadge status={item.status}/></td><td><div className="provider-name">{item.providerName}</div>{item.officialLink && <a className="official-link" href={item.officialLink} target="_blank" rel="noreferrer">Visit website <ExternalLink size={12}/></a>}</td><td><div className="row-actions"><button className="icon-button" aria-label={`Edit ${item.scholarshipName}`} onClick={() => { setEditing(item); setFormOpen(true) }}><Pencil size={15}/></button><button className="icon-button danger-hover" aria-label={`Delete ${item.scholarshipName}`} onClick={() => setPendingDelete(item)}><Trash2 size={15}/></button></div></td></tr>)}</tbody></table>{visible.length === 0 && <div className="empty-state"><div className="empty-symbol">⌕</div><strong>No scholarships found</strong><p>Try changing your search or filters.</p><button className="text-button" onClick={() => { setQuery(''); setFilter('All Status') }}>Clear filters</button></div>}</div>
            <div className="table-footer"><span>Showing <b>{visible.length}</b> of <b>{scholarships.length}</b> scholarships</span><span className="footer-live"><i/> All changes saved</span></div>
          </section>
        </>}
        <footer className="page-footer">ScholarDesk <span>•</span> Scholarship opportunity management</footer>
      </div>
    </main>
    {formOpen && <div className="modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) { setFormOpen(false); setEditing(null) } }}><section className="form-modal" role="dialog" aria-modal="true" aria-labelledby="form-title"><div className="modal-heading"><div><div className="eyebrow">SCHOLARSHIP DETAILS</div><h2 id="form-title">{editing ? 'Edit scholarship' : 'Add scholarship'}</h2></div><button className="icon-button" onClick={() => { setFormOpen(false); setEditing(null) }} aria-label="Close"><X size={19}/></button></div><ScholarshipForm initialValue={editing} onSave={save} onCancel={() => { setFormOpen(false); setEditing(null) }}/></section></div>}
    {pendingDelete && <DeleteConfirmModal scholarshipName={pendingDelete.scholarshipName} onConfirm={() => { remove(pendingDelete.id); setPendingDelete(null) }} onCancel={() => setPendingDelete(null)}/>}
    {toast && <ToastContainer message={toast} onClose={() => setToast('')}/>}
  </div>
}
