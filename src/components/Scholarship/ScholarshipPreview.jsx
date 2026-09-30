import { ExternalLink } from 'lucide-react'
import { formatDate } from '../../utils/scholarshipUtils.js'
import { StatusBadge } from '../Dashboard/StatusBadge.jsx'

export function ScholarshipPreview({ scholarship }) {
  if (!scholarship) return null
  return <article className="preview-card"><div className="card-title-row"><h2>{scholarship.scholarshipName}</h2><StatusBadge status={scholarship.status}/></div><dl><dt>Provider</dt><dd>{scholarship.providerName}</dd><dt>State and class</dt><dd>{scholarship.state} · {scholarship.applicableClass}</dd><dt>Deadline</dt><dd>{formatDate(scholarship.deadline)}</dd><dt>Benefit</dt><dd>{scholarship.benefit || 'Not specified'}</dd><dt>Eligibility</dt><dd>{scholarship.eligibility || 'Not specified'}</dd></dl>{scholarship.officialLink && <a href={scholarship.officialLink} target="_blank" rel="noreferrer">Official website <ExternalLink size={14}/></a>}</article>
}
