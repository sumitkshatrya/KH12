import { RotateCcw } from 'lucide-react'

export function SettingsPage({ scholarshipCount = 0, onReset = () => {} }) {
  return <>
  <div className="page-heading"><div><div className="eyebrow">PREFERENCES</div><h1>Settings</h1><p>Manage your scholarship data and preferences.</p></div></div><section className="settings-card"><h2>Data management</h2><p>Scholarship records are saved in this browser on this device.</p><button className="button button-secondary" onClick={onReset}><RotateCcw size={15}/> Restore sample scholarships</button><div className="settings-count">Currently managing <b>{scholarshipCount}</b> scholarships.</div></section></>
}
