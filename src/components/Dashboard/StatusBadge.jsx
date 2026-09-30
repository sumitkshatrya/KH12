export function StatusBadge({ status }) {
  const style = String(status).toLowerCase()
  return <span className={`status-badge status-${style}`}><i/>{status}</span>
}
