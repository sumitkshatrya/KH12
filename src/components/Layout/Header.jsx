import { Menu, RotateCcw } from 'lucide-react'

export function Header({ title = 'Scholarship Dashboard', subtitle = 'Manage and monitor scholarship opportunities', onReset, onOpenMobileMenu }) {
  return <header className="topbar"><button className="icon-button mobile-menu" onClick={onOpenMobileMenu} aria-label="Open navigation"><Menu size={20}/></button><div><h1>{title}</h1><p>{subtitle}</p></div><div className="top-actions"><button className="button button-secondary" onClick={onReset}><RotateCcw size={15}/> Reset data</button><div className="avatar small-avatar">EP</div></div></header>
}
