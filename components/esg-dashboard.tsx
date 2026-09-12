'use client'

import { useMemo, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Download,
  FileBarChart,
  FileText,
  Filter,
  Leaf,
  LogOut,
  Menu,
  MoreHorizontal,
  PackageCheck,
  Plus,
  RefreshCw,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Truck,
  UserRound,
  Users,
  Wifi,
  X,
  Zap,
} from 'lucide-react'

const navItems = [
  { label: 'Overview', icon: BarChart3 },
  { label: 'Smart Bin', icon: Wifi },
  { label: 'Reports', icon: FileBarChart },
  { label: 'Account', icon: UserRound },
]

const logRows = [
  ['06 Jun 2024', '08:42', '24.6 kg', 'OP-104 · Maya', 'Kitchen prep', 'Recorded'],
  ['05 Jun 2024', '17:15', '31.2 kg', 'OP-104 · Maya', 'Dinner service', 'Recorded'],
  ['05 Jun 2024', '08:31', '18.9 kg', 'OP-091 · Arif', 'Breakfast prep', 'Recorded'],
  ['04 Jun 2024', '16:58', '28.4 kg', 'OP-091 · Arif', '—', 'Pending'],
]

const chartBars = [38, 46, 42, 58, 54, 63, 51, 68, 61, 74, 66, 82, 78, 88, 76, 94, 87, 91, 84, 97, 90, 96, 92, 100]

function MetricCard({
  label,
  value,
  detail,
  trend,
  trendUp = true,
  icon: Icon,
  accent = 'green',
}: {
  label: string
  value: string
  detail: string
  trend?: string
  trendUp?: boolean
  icon: typeof Leaf
  accent?: 'green' | 'blue' | 'amber' | 'violet'
}) {
  return (
    <article className="metric-card">
      <div className="flex items-start justify-between gap-3">
        <div className={`metric-icon metric-icon-${accent}`}><Icon aria-hidden="true" /></div>
        {trend && <span className={trendUp ? 'trend-positive' : 'trend-negative'}>{trendUp ? <ArrowUpRight aria-hidden="true" /> : <ArrowDownRight aria-hidden="true" />}{trend}</span>}
      </div>
      <div className="mt-5">
        <p className="eyebrow">{label}</p>
        <p className="metric-value">{value}</p>
        <p className="metric-detail">{detail}</p>
      </div>
    </article>
  )
}

function Sparkline({ color = 'var(--primary)' }: { color?: string }) {
  return <svg className="sparkline" viewBox="0 0 120 34" role="img" aria-label="Upward trend sparkline"><polyline points="2,28 14,25 26,27 38,20 50,22 62,16 74,18 86,11 98,14 118,4" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

export default function EsgDashboard() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [range, setRange] = useState('Last 30 days')
  const [period, setPeriod] = useState('This month')
  const [showReport, setShowReport] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [query, setQuery] = useState('')

  const filteredLogs = useMemo(() => logRows.filter((row) => row.join(' ').toLowerCase().includes(query.toLowerCase())), [query])
  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2800)
  }

  return (
    <div className="dashboard-shell">
      <aside className="sidebar" aria-label="Main navigation">
        <div className="brand-lockup"><div className="brand-mark"><Leaf aria-hidden="true" /></div><div><strong>siklus<span>.</span></strong><small>ORGANIC EXCHANGE</small></div></div>
        <div className="workspace-switcher"><div className="workspace-avatar">K</div><div className="min-w-0"><strong>Kirana Hotel Group</strong><span>Enterprise workspace</span></div><ChevronDown aria-hidden="true" /></div>
        <nav className="nav-list">
          <p className="nav-label">Workspace</p>
          {navItems.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${activeNav === label ? 'active' : ''}`} onClick={() => { setActiveNav(label); notify(`${label} view selected`) }}><Icon aria-hidden="true" /><span>{label}</span>{label === 'Smart Bin' && <span className="nav-count">3</span>}</button>)}
        </nav>
        <div className="sidebar-bottom">
          <button className="nav-item"><CircleHelp aria-hidden="true" /><span>Help center</span></button>
          <button className="nav-item"><Settings2 aria-hidden="true" /><span>Settings</span></button>
          <div className="profile-row"><div className="profile-avatar">RA</div><div className="min-w-0"><strong>Rani Adelia</strong><span>Sustainability lead</span></div><button aria-label="Sign out"><LogOut aria-hidden="true" /></button></div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar"><button className="mobile-menu" aria-label="Open navigation"><Menu aria-hidden="true" /></button><div><p className="breadcrumb">Workspace <span>/</span> {activeNav}</p><h1>{activeNav === 'Overview' ? 'Good morning, Rani' : activeNav}</h1></div><div className="topbar-actions"><button className="icon-button" aria-label="Notifications"><Bell aria-hidden="true" /><i /></button><div className="top-profile"><div className="profile-avatar small">RA</div><div><strong>Rani Adelia</strong><span>Admin</span></div><ChevronDown aria-hidden="true" /></div></div></header>

        {activeNav === 'Overview' && <>
          <section className="hero-strip"><div><span className="status-pill"><span className="status-dot" /> All systems operational</span><h2>Your impact, measured.</h2><p>Track your organic diversion and turn everyday operations into verified sustainability progress.</p></div><div className="hero-actions"><button className="button button-secondary" onClick={() => notify('Dashboard data refreshed')}><RefreshCw aria-hidden="true" /> Refresh data</button><button className="button button-primary" onClick={() => setShowReport(true)}><FileText aria-hidden="true" /> Generate report</button></div></section>

          <section className="metrics-grid" aria-label="Key sustainability metrics"><MetricCard label="Organic waste managed" value="12.84 t" detail="Year to date · 428 kg this month" trend="12.4%" icon={Leaf} /><MetricCard label="Carbon offset" value="6.42 tCO₂e" detail="Equivalent to 142 trees planted" trend="8.7%" icon={Sparkles} accent="blue" /><MetricCard label="Smart bins online" value="3 / 3" detail="Last sync 4 minutes ago" trend="100%" icon={Wifi} accent="amber" /><MetricCard label="Current subscription" value="Premium" detail="Renews in 18 days" icon={ShieldCheck} accent="violet" /></section>

          <section className="content-grid"><article className="panel trend-panel"><div className="panel-heading"><div><p className="eyebrow">Diversion activity</p><h3>Organic waste collected</h3><p className="panel-subtitle">Daily weight across all Smart Bins</p></div><div className="select-wrap"><CalendarDays aria-hidden="true" /><select value={range} onChange={(e) => setRange(e.target.value)} aria-label="Chart date range"><option>Last 30 days</option><option>Last 90 days</option><option>Last 365 days</option></select><ChevronDown aria-hidden="true" /></div></div><div className="chart-summary"><strong>428 kg</strong><span className="trend-positive"><ArrowUpRight aria-hidden="true" /> 12.4%</span><span>vs. previous period</span></div><div className="chart-area"><div className="y-axis"><span>40kg</span><span>30kg</span><span>20kg</span><span>10kg</span><span>0</span></div><div className="chart-visual"><div className="grid-lines"><i /><i /><i /><i /><i /></div><div className="bar-row">{chartBars.map((height, index) => <div className="bar-column" key={index}><div className="chart-bar" style={{ height: `${height}%` }} /></div>)}</div><div className="chart-line"><svg viewBox="0 0 600 160" preserveAspectRatio="none" aria-hidden="true"><polyline points="0,126 26,116 52,122 78,98 104,108 130,86 156,93 182,72 208,82 234,61 260,74 286,53 312,61 338,42 364,56 390,35 416,48 442,28 468,42 494,21 520,33 548,18 600,8" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg></div><div className="x-axis"><span>12 May</span><span>19 May</span><span>26 May</span><span>02 Jun</span><span>09 Jun</span></div></div></div></article>

            <article className="panel quick-panel"><div className="panel-heading"><div><p className="eyebrow">At a glance</p><h3>Quick stats</h3></div><div className="select-wrap compact"><select value={period} onChange={(e) => setPeriod(e.target.value)} aria-label="Quick stats period"><option>This month</option><option>Year to date</option><option>Last quarter</option></select><ChevronDown aria-hidden="true" /></div></div><div className="quick-list"><div><span className="quick-icon"><Truck aria-hidden="true" /></span><span><small>Average daily volume</small><strong>14.3 kg</strong></span><Sparkline /></div><div><span className="quick-icon"><PackageCheck aria-hidden="true" /></span><span><small>Peak collection day</small><strong>Tuesday · 24.6 kg</strong></span><span className="mini-badge">High</span></div><div><span className="quick-icon"><Zap aria-hidden="true" /></span><span><small>Collection efficiency</small><strong>96.8%</strong></span><span className="trend-positive">+4.2%</span></div></div><div className="impact-callout"><div className="impact-leaf"><Leaf aria-hidden="true" /></div><div><strong>Small actions, big impact.</strong><p>Your diversion this month avoided 214 kg of CO₂ emissions.</p></div></div></article></section>

          <section className="bottom-grid"><article className="panel bin-panel"><div className="panel-heading"><div><p className="eyebrow">Connected devices</p><h3>Smart Bin health</h3></div><button className="text-button" onClick={() => { setActiveNav('Smart Bin'); notify('Smart Bin view selected') }}>View all <ArrowUpRight aria-hidden="true" /></button></div><div className="bin-list"><div className="bin-row"><div className="bin-status online"><Wifi aria-hidden="true" /></div><div><strong>SB-KHG-001</strong><span>Lobby kitchen · Online</span></div><div className="battery"><span style={{ width: '88%' }} /> <small>88%</small></div><MoreHorizontal aria-hidden="true" /></div><div className="bin-row"><div className="bin-status online"><Wifi aria-hidden="true" /></div><div><strong>SB-KHG-002</strong><span>Rooftop garden · Online</span></div><div className="battery"><span style={{ width: '64%' }} /> <small>64%</small></div><MoreHorizontal aria-hidden="true" /></div><div className="bin-row"><div className="bin-status caution"><Wifi aria-hidden="true" /></div><div><strong>SB-KHG-003</strong><span>Staff cafeteria · Attention</span></div><div className="battery caution"><span style={{ width: '21%' }} /> <small>21%</small></div><MoreHorizontal aria-hidden="true" /></div></div></article><article className="panel activity-panel"><div className="panel-heading"><div><p className="eyebrow">Latest activity</p><h3>Recent collections</h3></div><button className="icon-button subtle" aria-label="Filter activity"><SlidersHorizontal aria-hidden="true" /></button></div><div className="activity-list"><div><span className="activity-icon"><Check aria-hidden="true" /></span><span><strong>Collection verified</strong><small>Manifest #MNF-2406-18 · 2 hours ago</small></span><b>31.2 kg</b></div><div><span className="activity-icon"><Download aria-hidden="true" /></span><span><strong>Report downloaded</strong><small>May 2024 ESG summary · Yesterday</small></span><b>PDF</b></div><div><span className="activity-icon"><Users aria-hidden="true" /></span><span><strong>Team member invited</strong><small>Arif Pratama · 03 Jun 2024</small></span><b>New</b></div></div></article></section>
        </>}

        {activeNav === 'Smart Bin' && <section className="page-section"><div className="section-title-row"><div><p className="eyebrow">Hardware telemetry</p><h2>Smart Bin management</h2><p>Monitor connected devices and review your audit trail.</p></div><button className="button button-primary" onClick={() => notify('Connection test started')}><RefreshCw aria-hidden="true" /> Test connection</button></div><div className="device-card panel"><div className="device-visual"><div className="device-ring"><Wifi aria-hidden="true" /></div><span className="status-pill"><span className="status-dot" /> 3 online</span></div><div className="device-details"><p className="eyebrow">Active fleet</p><h3>SB-KHG-001 — Lobby kitchen</h3><div className="device-facts"><span><strong>Last seen</strong>Today, 08:42:16</span><span><strong>Connection</strong>WiFi · Excellent</span><span><strong>Battery</strong>88%</span><span><strong>Serial number</strong>SK001-8842</span></div></div></div><div className="panel table-panel"><div className="panel-heading"><div><p className="eyebrow">Audit trail</p><h3>Daily weighing log</h3></div><div className="table-actions"><div className="search-field"><Search aria-hidden="true" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search logs" aria-label="Search logs" /></div><button className="button button-secondary" onClick={() => notify('CSV export prepared')}><Download aria-hidden="true" /> Export CSV</button></div></div><div className="table-scroll"><table><thead><tr><th>Date</th><th>Time</th><th>Weight</th><th>Operator</th><th>Notes</th><th>Status</th></tr></thead><tbody>{filteredLogs.map((row) => <tr key={`${row[0]}-${row[1]}`}>{row.map((cell, index) => <td key={cell}>{index === 5 ? <span className={cell === 'Pending' ? 'table-status pending' : 'table-status'}>{cell === 'Pending' ? <RefreshCw aria-hidden="true" /> : <Check aria-hidden="true" />}{cell}</span> : cell}</td>)}</tr>)}</tbody></table></div></div></section>}

        {activeNav === 'Reports' && <section className="page-section"><div className="section-title-row"><div><p className="eyebrow">Audit-ready documentation</p><h2>ESG reports center</h2><p>Generate, customize, and archive sustainability reports.</p></div><button className="button button-primary" onClick={() => setShowReport(true)}><Plus aria-hidden="true" /> New report</button></div><div className="template-grid"><button className="template-card" onClick={() => setShowReport(true)}><div className="template-icon"><Leaf aria-hidden="true" /></div><strong>Green Hotel Certification</strong><span>Hospitality-specific ESG template</span><ArrowUpRight aria-hidden="true" /></button><button className="template-card" onClick={() => setShowReport(true)}><div className="template-icon blue"><FileBarChart aria-hidden="true" /></div><strong>General CSR Report</strong><span>Broad sustainability metrics</span><ArrowUpRight aria-hidden="true" /></button><button className="template-card" onClick={() => setShowReport(true)}><div className="template-icon amber"><ShieldCheck aria-hidden="true" /></div><strong>Compliance Audit</strong><span>Regulatory-focused evidence</span><ArrowUpRight aria-hidden="true" /></button></div><div className="panel table-panel"><div className="panel-heading"><div><p className="eyebrow">Archive</p><h3>Recent reports</h3></div><button className="button button-secondary" onClick={() => notify('Archive filter opened')}><Filter aria-hidden="true" /> Filter</button></div><div className="report-list"><div><FileText aria-hidden="true" /><span><strong>May 2024 ESG Summary</strong><small>Generated 06 Jun 2024 · Monthly</small></span><b>PDF</b><button className="icon-button subtle" aria-label="Download May report" onClick={() => notify('Report download started')}><Download aria-hidden="true" /></button></div><div><FileText aria-hidden="true" /><span><strong>Q1 2024 CSR Report</strong><small>Generated 02 Apr 2024 · Quarterly</small></span><b>XLSX</b><button className="icon-button subtle" aria-label="Download Q1 report" onClick={() => notify('Report download started')}><Download aria-hidden="true" /></button></div></div></div></section>}

        {activeNav === 'Account' && <section className="page-section"><div className="section-title-row"><div><p className="eyebrow">Workspace administration</p><h2>Account & subscription</h2><p>Manage your plan, team access, and company profile.</p></div><button className="button button-secondary" onClick={() => notify('Billing portal opened')}><Settings2 aria-hidden="true" /> Manage billing</button></div><div className="account-grid"><article className="panel subscription-card"><div className="subscription-top"><div><p className="eyebrow">Current plan</p><h3>Premium ESG Add-on</h3></div><span className="premium-badge"><Sparkles aria-hidden="true" /> Premium</span></div><p className="subscription-copy">Advanced reporting and operational insights for audit-ready sustainability teams.</p><div className="subscription-price"><strong>$249</strong><span>/ month · Renews 28 Jun 2024</span></div><button className="button button-primary" onClick={() => notify('Plan management opened')}>Manage subscription</button></article><article className="panel team-card"><div className="panel-heading"><div><p className="eyebrow">Team access</p><h3>4 members</h3></div><button className="button button-secondary" onClick={() => notify('Invite flow opened')}><Plus aria-hidden="true" /> Invite</button></div><div className="team-list"><div><span className="profile-avatar">RA</span><span><strong>Rani Adelia</strong><small>Admin · Active</small></span><MoreHorizontal aria-hidden="true" /></div><div><span className="profile-avatar coral">AP</span><span><strong>Arif Pratama</strong><small>Operator · Active</small></span><MoreHorizontal aria-hidden="true" /></div><div><span className="profile-avatar gold">MS</span><span><strong>Maya Sari</strong><small>Report viewer · Active</small></span><MoreHorizontal aria-hidden="true" /></div></div></article></div></section>}
      </main>

      {toast && <div className="toast" role="status"><Check aria-hidden="true" />{toast}</div>}
      {showReport && <div className="modal-backdrop" role="presentation" onMouseDown={() => setShowReport(false)}><div className="report-modal" role="dialog" aria-modal="true" aria-labelledby="report-title" onMouseDown={(e) => e.stopPropagation()}><div className="modal-header"><div><p className="eyebrow">Report generator</p><h2 id="report-title">Create an ESG report</h2></div><button className="icon-button subtle" aria-label="Close report generator" onClick={() => setShowReport(false)}><X aria-hidden="true" /></button></div><div className="modal-body"><label>Report period<select><option>Monthly · May 2024</option><option>Quarterly · Q2 2024</option><option>Annual · 2024</option></select></label><label>Template<select><option>Green Hotel Certification</option><option>General CSR Report</option><option>Compliance Audit</option></select></label><fieldset><legend>Sections to include</legend>{['Executive summary', 'Waste volume metrics', 'Carbon offset calculation', 'ESG indicators'].map((item) => <label className="check-row" key={item}><input type="checkbox" defaultChecked /> <span>{item}</span><Check aria-hidden="true" /></label>)}</fieldset><div className="format-row"><span>Format</span><button className="format-option selected"><FileText aria-hidden="true" /> PDF</button><button className="format-option"><FileBarChart aria-hidden="true" /> Excel</button></div></div><div className="modal-footer"><button className="button button-secondary" onClick={() => setShowReport(false)}>Cancel</button><button className="button button-primary" onClick={() => { setShowReport(false); notify('Your report is being generated') }}><Sparkles aria-hidden="true" /> Generate report</button></div></div></div>}
    </div>
  )
}

function DashboardPlaceholder() { return null }

void DashboardPlaceholder
