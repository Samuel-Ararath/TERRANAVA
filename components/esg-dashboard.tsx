'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  BarChart3,
  Bell,
  ChevronRight,
  CircleHelp,
  Droplets,
  Leaf,
  Menu,
  MoveUpRight,
  PackageCheck,
  Recycle,
  Settings2,
  ShieldCheck,
  Sparkles,
  Sprout,
  Truck,
  Users,
  X,
  Zap,
} from 'lucide-react'

const navItems = [
  { label: 'Command center', icon: BarChart3 },
  { label: 'Circular flow', icon: Recycle },
  { label: 'ESG offering', icon: ShieldCheck },
]

const pillars = ['Design out waste', 'Regenerate soil', 'Trace every kilo', 'Reward the chain', 'Power local value', 'Scale with proof', 'Share knowledge', 'Protect biodiversity', 'Reach the ninth']

function StatCard({ icon: Icon, label, value, note, accent }: { icon: typeof Leaf; label: string; value: string; note: string; accent: string }) {
  return (
    <article className={`terra-stat ${accent}`}>
      <div className="terra-stat-top"><span className="terra-icon"><Icon aria-hidden="true" /></span><MoveUpRight aria-hidden="true" /></div>
      <p>{label}</p><strong>{value}</strong><small>{note}</small>
    </article>
  )
}

function FlowStep({ number, title, detail, icon: Icon }: { number: string; title: string; detail: string; icon: typeof Leaf }) {
  return <div className="flow-step"><span className="flow-number">{number}</span><div className="flow-icon"><Icon aria-hidden="true" /></div><div><strong>{title}</strong><p>{detail}</p></div></div>
}

export default function EsgDashboard() {
  const [activeNav, setActiveNav] = useState('Command center')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [toast, setToast] = useState('')

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }

  return (
    <div className="terra-app">
      <aside className={`terra-sidebar ${menuOpen ? 'is-open' : ''}`}>
        <div className="terra-brand"><img src="/terranava-logo.jpg" alt="Logo TERRANAVA INDONESIA" /><div><strong>TERRANAVA</strong><span>INDONESIA</span></div></div>
        <div className="terra-context"><span className="context-orb">TI</span><span><b>Impact workspace</b><small>Jakarta · Indonesia</small></span><ChevronRight aria-hidden="true" /></div>
        <nav className="terra-nav" aria-label="Navigasi utama"><span className="terra-nav-label">Navigate</span>{navItems.map(({ label, icon: Icon }) => <button className={activeNav === label ? 'active' : ''} key={label} onClick={() => { setActiveNav(label); setMenuOpen(false) }}><Icon aria-hidden="true" /><span>{label}</span>{label === 'Circular flow' && <em>LIVE</em>}</button>)}</nav>
        <div className="terra-sidebar-bottom"><button onClick={() => notify('Pusat bantuan TERRANAVA dibuka')}><CircleHelp aria-hidden="true" />Help center</button><button onClick={() => notify('Pengaturan workspace dibuka')}><Settings2 aria-hidden="true" />Workspace settings</button><div className="terra-user"><span className="user-avatar">RA</span><span><b>Rani Adelia</b><small>Impact lead</small></span><button aria-label="Notifikasi" onClick={() => notify('Tidak ada notifikasi baru')}><Bell aria-hidden="true" /></button></div></div>
      </aside>

      <main className="terra-main">
        <header className="terra-header"><button className="terra-mobile-menu" aria-label="Buka navigasi" onClick={() => setMenuOpen(!menuOpen)}><Menu aria-hidden="true" /></button><div><span className="terra-kicker">TERRANAVA / {activeNav}</span><h1>{activeNav === 'Command center' ? 'The living ledger' : activeNav}</h1></div><div className="terra-header-actions"><span className="live-indicator"><i /> System live</span><button className="terra-notification" aria-label="Notifikasi" onClick={() => notify('Tidak ada notifikasi baru')}><Bell aria-hidden="true" /><i /></button><span className="terra-header-avatar">RA</span></div></header>

        {activeNav === 'Command center' && <>
          <section className="terra-hero"><div className="hero-copy"><span className="terra-badge"><span /> CIRCULAR ECONOMY, IN MOTION</span><h2>Rooted in Earth,<br /><i>Reaching for the Ninth.</i></h2><p>TERRANAVA menghubungkan limbah organik, industri, dan lahan hidup menjadi satu rantai nilai yang terukur — dari sisa hari ini menuju nilai esok.</p><div className="hero-actions"><button className="terra-button primary" onClick={() => setShowModal(true)}>Mulai perjalanan ESG <ArrowUpRight aria-hidden="true" /></button><button className="terra-text-button" onClick={() => document.getElementById('origin')?.scrollIntoView({ behavior: 'smooth' })}>Kenali TERRANAVA <ChevronRight aria-hidden="true" /></button></div></div><div className="hero-orbit" aria-label="Ilustrasi sistem ekonomi sirkular"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit-core"><Sprout aria-hidden="true" /><span>09</span></div><span className="orbit-label label-one">ORGANIK</span><span className="orbit-label label-two">NILAI</span><span className="orbit-label label-three">BUKTI</span></div></section>

          <section className="terra-stats" aria-label="Ringkasan dampak"><StatCard icon={Leaf} label="Organik dialihkan" value="12,84 t" note="+12,4% dari periode sebelumnya" accent="green" /><StatCard icon={Droplets} label="Jejak air terselamatkan" value="48,2 kL" note="Estimasi berbasis aktivitas" accent="blue" /><StatCard icon={Truck} label="Rantai aktif" value="24 mitra" note="HORECA · pengolah · peternak" accent="orange" /><StatCard icon={Sparkles} label="Skor kesiapan ESG" value="78 / 100" note="Level: emerging leader" accent="violet" /></section>

          <section className="terra-grid"><article className="terra-panel origin-panel" id="origin"><div className="panel-label"><span>01 / Origin story</span><span className="panel-line" /></div><h3>Nama yang menanam<br />arah.</h3><p><b>Terra</b> berarti bumi. <b>Nava</b> berarti sembilan — angka tertinggi, sekaligus sembilan pilar ekonomi sirkular yang menjadi kompas kami.</p><div className="origin-note"><span>09</span><div><strong>Sembilan bukan tujuan akhir.</strong><small>Ia adalah standar yang terus kami kejar: lebih tinggi, lebih utuh, lebih berdampak.</small></div></div><button className="panel-link" onClick={() => notify('Manifesto TERRANAVA siap dibaca')}>Baca manifesto <ArrowUpRight aria-hidden="true" /></button></article><article className="terra-panel flow-panel"><div className="panel-label"><span>02 / Live circular flow</span><span className="live-chip"><i /> Tracking</span></div><h3>Satu aliran,<br /><i>empat titik nilai.</i></h3><div className="flow-list"><FlowStep number="01" title="HORECA" detail="Pisahkan di sumber" icon={PackageCheck} /><FlowStep number="02" title="TERRANAVA" detail="Angkut dengan bukti" icon={Truck} /><FlowStep number="03" title="PENGOLAH" detail="Ubah menjadi input" icon={Recycle} /><FlowStep number="04" title="LAHAN HIDUP" detail="Kembali bernilai" icon={Sprout} /></div><div className="flow-footer"><span>Last verified 08:42 WIB</span><button onClick={() => notify('Data aliran diperbarui')}>Refresh <Zap aria-hidden="true" /></button></div></article></section>

          <section className="terra-lower-grid"><article className="terra-panel pillars-panel"><div className="panel-label"><span>03 / The ninth framework</span><span className="panel-line" /></div><div className="pillars-heading"><div><h3>9 pilar untuk<br /><i>mendaki lebih tinggi.</i></h3><p>Kerangka kerja yang menerjemahkan niat baik menjadi tindakan yang bisa diaudit.</p></div><span className="nine-mark">9</span></div><div className="pillar-grid">{pillars.map((pillar, index) => <button key={pillar} onClick={() => notify(`${pillar} — pilar ${index + 1}`)}><span>{String(index + 1).padStart(2, '0')}</span>{pillar}<ChevronRight aria-hidden="true" /></button>)}</div></article><article className="terra-panel offer-panel"><div className="panel-label"><span>04 / ESG partnership</span><span className="recommended">RECOMMENDED</span></div><div className="offer-icon"><ShieldCheck aria-hidden="true" /></div><h3>ESG<br /><i>Foundation.</i></h3><p>Bangun fondasi dampak yang rapi, terukur, dan siap diceritakan.</p><div className="offer-price"><small>Mulai dari</small><strong>Rp 1.500.000<span>,00</span></strong><small>/ bulan</small></div><ul><li><span>✓</span> Audit trail organik</li><li><span>✓</span> Dashboard dampak</li><li><span>✓</span> Laporan ESG berkala</li></ul><button className="terra-button primary full" onClick={() => setShowModal(true)}>Jadwalkan discovery call <ArrowUpRight aria-hidden="true" /></button></article></section>

          <section className="terra-mission"><div><span className="terra-kicker">Our north star</span><h3>Industri hijau yang<br /><i>menguntungkan semua.</i></h3></div><div className="mission-copy"><p>Visi kami adalah menjadi pelopor industri hijau Indonesia — mengubah limbah organik menjadi nilai ekonomi berkelanjutan melalui sistem ekonomi sirkular yang terstandar dan terukur.</p><button className="terra-text-button" onClick={() => notify('Visi dan misi TERRANAVA dibuka')}>Lihat visi & misi <ChevronRight aria-hidden="true" /></button></div></section>
        </>}

        {activeNav !== 'Command center' && <section className="terra-placeholder"><span className="terra-badge"><span /> MODULE READY</span><h2>{activeNav}</h2><p>Ruang kerja ini sedang disiapkan untuk memperluas visibilitas rantai nilai TERRANAVA.</p><button className="terra-button primary" onClick={() => setActiveNav('Command center')}>Kembali ke command center <ArrowUpRight aria-hidden="true" /></button></section>}
      </main>

      {toast && <div className="terra-toast" role="status"><ShieldCheck aria-hidden="true" />{toast}</div>}
      {showModal && <div className="terra-modal-backdrop" role="presentation" onMouseDown={() => setShowModal(false)}><div className="terra-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}><div className="terra-modal-head"><div><span className="terra-kicker">ESG partnership</span><h2 id="modal-title">Mari mulai dari akar.</h2></div><button aria-label="Tutup" onClick={() => setShowModal(false)}><X aria-hidden="true" /></button></div><p>Kami akan menyiapkan discovery call untuk memahami aliran organik dan target dampak bisnis Anda.</p><label>Nama perusahaan<input placeholder="Contoh: Nusantara Hospitality" /></label><label>Email kerja<input type="email" placeholder="nama@perusahaan.com" /></label><button className="terra-button primary full" onClick={() => { setShowModal(false); notify('Permintaan discovery call terkirim') }}>Kirim permintaan <ArrowUpRight aria-hidden="true" /></button></div></div>}
    </div>
  )
}
