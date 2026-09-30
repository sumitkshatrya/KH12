export function EmptyState({ onClear }) {
  return <div className="empty-state"><div className="empty-symbol">⌕</div><strong>No scholarships found</strong><p>Try changing your search or filters.</p>{onClear && <button className="text-button" onClick={onClear}>Clear filters</button>}</div>
}
