import { ExternalLink } from 'lucide-react'
import { formatDate } from '../../utils/scholarshipUtils.js'
import { StatusBadge } from './StatusBadge.jsx'

export function ScholarshipCard({ scholarship }) {
  return <article className="scholarship-card"><div className="card-title-row"><h3>{scholarship.scholarshipName}</h3><StatusBadge status={scholarship.status}/></div><p>{scholarship.benefit}</p><div className="scholarship-card-meta">{scholarship.state} · {scholarship.applicableClass} · Deadline {formatDate(scholarship.deadline)}</div>{scholarship.officialLink && <a href={scholarship.officialLink} target="_blank" rel="noreferrer">Official website <ExternalLink size={13}/></a>}</article>
}
