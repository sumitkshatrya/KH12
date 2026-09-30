import { LayoutDashboard, GraduationCap, Settings } from 'lucide-react'

export function Sidebar({ activeNav = 'Dashboard', onNavigate = () => {}, scholarshipCount = 0 }) {
  const links = [{ name: 'Dashboard', icon: LayoutDashboard }, { name: 'Scholarships', icon: GraduationCap }, { name: 'Settings', icon: Settings }]
  return <aside className="sidebar"><a className="brand" href="#home"><span className="brand-mark"><GraduationCap size={22}/></span><span>Scholar<span className="brand-accent">Desk</span><small>OPPORTUNITY MANAGER</small></span></a><div className="nav-caption">WORKSPACE</div>{links.map(({ name, icon: Icon }) => <button key={name} className={`nav-link ${activeNav === name ? 'active' : ''}`} onClick={() => onNavigate(name)}><Icon size={18}/>{name}{name === 'Scholarships' && <span className="nav-count">{scholarshipCount}</span>}</button>)}</aside>
}
