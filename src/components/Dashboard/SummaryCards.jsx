import { Archive, Clock3, Layers3, Radio } from 'lucide-react'

const cards = [
  { label: 'Total Scholarships', status: 'All Status', icon: Layers3, tone: 'indigo', hint: 'All registered opportunities' },
  { label: 'Published', status: 'Published', icon: Radio, tone: 'green', hint: 'Active & live for students' },
  { label: 'Draft', status: 'Draft', icon: Clock3, tone: 'amber', hint: 'Pending review & publish' },
  { label: 'Expired', status: 'Expired', icon: Archive, tone: 'rose', hint: 'Past application deadline' },
]

export function SummaryCards({ scholarships, selected, onSelect }) {
  return <section className="summary-grid" aria-label="Scholarship overview">{cards.map(({ label, status, icon: Icon, tone, hint }) => {
    const count = status === 'All Status' ? scholarships.length : scholarships.filter(item => item.status === status).length
    return <button key={status} className={`summary-card tone-${tone} ${selected === status ? 'summary-active' : ''}`} onClick={() => onSelect(status)}><div className="summary-top"><span>{label}</span><span className="summary-icon"><Icon size={18}/></span></div><strong>{count}</strong><div className="summary-foot">{hint}<span>{selected === status ? 'Selected' : 'View →'}</span></div></button>
  })}</section>
}
