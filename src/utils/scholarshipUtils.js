export function formatDate(value) {
  if (!value) return 'Not stated'
  const date = new Date(`${value}T00:00:00`)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function getStatus(scholarship, today = new Date().toISOString().slice(0, 10)) {
  if (scholarship.deadline && scholarship.deadline < today) return 'Expired'
  return scholarship.status || 'Draft'
}

export function getUniqueStates(scholarships) {
  return [...new Set(scholarships.map(item => item.state).filter(Boolean))].sort()
}
