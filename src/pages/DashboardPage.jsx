import { useMemo, useState } from 'react'
import { Plus } from 'lucide-react'
import { SummaryCards } from '../components/Dashboard/SummaryCards.jsx'
import { ScholarshipTable } from '../components/Dashboard/ScholarshipTable.jsx'
import { FilterBar } from '../components/Dashboard/FilterBar.jsx'

export function DashboardPage({ scholarships = [], onAdd = () => {}, onEdit = () => {}, onDelete = () => {} }) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All Status')
  const visible = useMemo(() => scholarships.filter(item => (status === 'All Status' || item.status === status) && `${item.scholarshipName} ${item.state} ${item.providerName}`.toLowerCase().includes(query.toLowerCase())), [scholarships, query, status])
  return <><div className="page-heading"><div><div className="eyebrow">SCHOLARSHIP MANAGEMENT</div><h1>Scholarship Dashboard</h1><p>Manage and monitor scholarship opportunities.</p></div><button className="button button-primary" onClick={onAdd}><Plus size={16}/> Add scholarship</button></div><SummaryCards scholarships={scholarships} selected={status} onSelect={setStatus}/><section className="table-card"><div className="table-toolbar"><div><h2>Scholarship opportunities</h2><p>Review and manage your scholarship listings</p></div><FilterBar query={query} onQueryChange={setQuery} status={status} onStatusChange={setStatus}/></div><ScholarshipTable scholarships={visible} onEdit={onEdit} onDelete={onDelete}/></section></>
}
