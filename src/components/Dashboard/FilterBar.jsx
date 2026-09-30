import { Search } from 'lucide-react'

export function FilterBar({ query, onQueryChange, status, onStatusChange }) {
  return <div className="toolbar-controls"><label className="search-box"><Search size={16}/><input value={query} onChange={event => onQueryChange(event.target.value)} placeholder="Search scholarships..."/></label><select aria-label="Filter by status" value={status} onChange={event => onStatusChange(event.target.value)}><option>All Status</option><option>Published</option><option>Draft</option><option>Expired</option></select></div>
}
