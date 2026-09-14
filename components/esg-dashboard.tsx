'use client'

import { useState } from 'react'
import { RouteOptimizer } from '@/components/route-optimizer'
import {
  ArrowUpRight,
  Bell,
  Building2,
  ChevronRight,
  CircleHelp,
  Droplets,
  Leaf,
  Menu,
  MoveUpRight,
  PackageCheck,
  Recycle,
  Route,
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
  { label: 'Home', icon: Leaf },
  { label: 'Circular flow', icon: Recycle },
  { label: 'ESG offering', icon: ShieldCheck },
  { label: 'Optimasi rute', icon: Route },
]

const prospectivePartners = [
  { type: 'HORECA', name: 'Hotel, restoran, dan kafe', detail: 'Sumber organik yang ingin dikelola lebih rapi.' },
  { type: 'PENGOLAH', name: 'Pengolah organik lokal', detail: 'Mengubah material menjadi input yang berguna.' },
  { type: 'PETERNAKAN', name: 'Peternakan sekitar', detail: 'Penerima nilai dari rantai yang lebih pendek.' },
]

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

function HomeContent({ onOpenModal, notify }: { onOpenModal: () => void; notify: (message: string) => void }) {
  return <>
    <section className="terra-hero"><div className="hero-copy"><span className="terra-badge"><span /> EKONOMI SIRKULAR INDONESIA</span><h2>Rooted in Earth,<br /><i>Reaching for the Ninth.</i></h2><p>TERRANAVA membantu bisnis mengelola limbah organik dengan cara yang lebih jelas, terukur, dan punya nilai. Dari dapur, kembali ke tanah, lalu tumbuh menjadi manfaat baru.</p><div className="hero-actions"><button className="terra-button primary" onClick={onOpenModal}>Mulai bicara dengan kami <ArrowUpRight aria-hidden="true" /></button><button className="terra-text-button" onClick={() => document.getElementById('origin')?.scrollIntoView({ behavior: 'smooth' })}>Kenali TERRANAVA <ChevronRight aria-hidden="true" /></button></div></div><div className="hero-orbit" aria-label="Ilustrasi sistem ekonomi sirkular"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit-core"><Sprout aria-hidden="true" /><span>09</span></div><span className="orbit-label label-one">ORGANIK</span><span className="orbit-label label-two">NILAI</span><span className="orbit-label label-three">BUKTI</span></div></section>

    <section className="terra-stats" aria-label="Ringkasan dampak"><StatCard icon={Leaf} label="Organik dialihkan" value="12,84 t" note="Contoh capaian dalam satu periode" accent="green" /><StatCard icon={Droplets} label="Jejak air terselamatkan" value="48,2 kL" note="Perkiraan dari aktivitas terukur" accent="blue" /><StatCard icon={Truck} label="Rantai yang disiapkan" value="24 titik" note="HORECA · pengolah · peternakan" accent="orange" /><StatCard icon={Sparkles} label="Kesiapan ESG" value="78 / 100" note="Gambaran awal untuk evaluasi" accent="violet" /></section>

    <section className="terra-grid"><article className="terra-panel origin-panel" id="origin"><div className="panel-label"><span>01 / Asal nama</span><span className="panel-line" /></div><h3>Nama yang punya<br />arah.</h3><p><b>Terra</b> berarti bumi. <b>Nava</b> berarti sembilan — angka tertinggi, sekaligus simbol sembilan pilar ekonomi sirkular yang menjadi arah kerja kami.</p><div className="origin-note"><span>09</span><div><strong>Sembilan adalah arah yang kami tuju.</strong><small>Bukan sekadar angka, tetapi dorongan untuk membangun sistem yang lebih utuh dan berdampak.</small></div></div><button className="panel-link" onClick={() => notify('Cerita TERRANAVA siap dibaca')}>Baca cerita kami <ArrowUpRight aria-hidden="true" /></button></article><article className="terra-panel flow-panel"><div className="panel-label"><span>02 / Alur kerja</span><span className="live-chip"><i /> Berjalan</span></div><h3>Satu aliran,<br /><i>empat titik nilai.</i></h3><div className="flow-list"><FlowStep number="01" title="HORECA" detail="Pisahkan dari sumbernya" icon={PackageCheck} /><FlowStep number="02" title="TERRANAVA" detail="Jemput dan catat dengan rapi" icon={Truck} /><FlowStep number="03" title="PENGOLAH" detail="Olah menjadi input baru" icon={Recycle} /><FlowStep number="04" title="LAHAN HIDUP" detail="Kembali memberi manfaat" icon={Sprout} /></div><div className="flow-footer"><span>Pembaruan terakhir 08:42 WIB</span><button onClick={() => notify('Data alur diperbarui')}>Perbarui <Zap aria-hidden="true" /></button></div></article></section>

    <section className="terra-panel partner-panel"><div className="panel-label"><span>03 / Ekosistem yang kami bangun</span><span className="panel-line" /></div><div className="partner-heading"><div><h3>Mitra yang ingin<br /><i>kami tumbuhkan.</i></h3><p>Setiap rantai dimulai dari percakapan. Berikut gambaran pihak yang ingin kami hubungkan — bukan daftar kontrak yang sudah berjalan.</p></div><Users aria-hidden="true" /></div><div className="partner-grid">{prospectivePartners.map((partner) => <article className="partner-card" key={partner.type}><span>{partner.type}</span><h4>{partner.name}</h4><p>{partner.detail}</p></article>)}</div></section>

    <section className="terra-mission"><div><span className="terra-kicker">Arah TERRANAVA</span><h3>Industri hijau yang<br /><i>menguntungkan semua.</i></h3></div><div className="mission-copy"><p>Visi kami adalah menjadi pelopor industri hijau Indonesia — mengubah limbah organik menjadi nilai ekonomi berkelanjutan melalui sistem ekonomi sirkular yang terstandar dan terukur.</p><button className="terra-text-button" onClick={() => notify('Visi dan misi TERRANAVA dibuka')}>Lihat visi dan misi <ChevronRight aria-hidden="true" /></button></div></section>
  </>
}

function OfferingContent({ onOpenModal }: { onOpenModal: () => void }) {
  return <section className="offering-page"><div className="offering-intro"><span className="terra-badge"><span /> UNTUK BISNIS YANG INGIN BERGERAK</span><h2>ESG yang bisa<br /><i>dipakai sehari-hari.</i></h2><p>Kami membantu tim melihat apa yang terjadi pada limbah organiknya, membenahi alurnya, lalu menyusun bukti dampak yang mudah dipahami.</p></div><div className="offering-layout"><article className="terra-panel offer-panel"><div className="panel-label"><span>ESG offering</span><span className="recommended">PILIHAN AWAL</span></div><div className="offer-icon"><ShieldCheck aria-hidden="true" /></div><h3>ESG<br /><i>Foundation.</i></h3><p>Langkah awal untuk membangun fondasi dampak yang rapi, terukur, dan siap dikembangkan.</p><div className="offer-price"><small>Investasi mulai dari</small><strong>Rp 1.500.000<span>,00</span></strong><small>/ bulan</small></div><ul><li><span>✓</span> Pencatatan alur organik</li><li><span>✓</span> Ringkasan dampak bulanan</li><li><span>✓</span> Bukti untuk laporan ESG</li></ul><button className="terra-button primary full" onClick={onOpenModal}>Jadwalkan obrolan awal <ArrowUpRight aria-hidden="true" /></button></article><div className="offering-benefits"><article><Building2 aria-hidden="true" /><h3>Mulai dari kondisi nyata</h3><p>Kami tidak memaksa satu pola untuk semua bisnis. Kita mulai dari alur yang sudah ada, lalu cari titik yang paling masuk akal untuk diperbaiki.</p></article><article><Recycle aria-hidden="true" /><h3>Lebih dari sekadar angkut</h3><p>Setiap pengambilan dicatat agar perjalanan material punya jejak yang bisa ditelusuri dan dibaca kembali.</p></article><article><Sparkles aria-hidden="true" /><h3>Dampak yang enak diceritakan</h3><p>Data yang rapi membantu tim menjelaskan kontribusi lingkungan tanpa bahasa yang berbelit-belit.</p></article></div></div></section>
}

export default function EsgDashboard() {
  const [activeNav, setActiveNav] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [toast, setToast] = useState('')
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2600) }

  return <div className="terra-app"><aside className={`terra-sidebar ${menuOpen ? 'is-open' : ''}`}><div className="terra-brand"><img src="/terranava-logo.jpg" alt="Logo TERRANAVA INDONESIA" /><div><strong>TERRANAVA</strong><span>INDONESIA</span></div></div><div className="terra-context"><span className="context-orb">TI</span><span><b>Ruang dampak</b><small>Jakarta · Indonesia</small></span><ChevronRight aria-hidden="true" /></div><nav className="terra-nav" aria-label="Navigasi utama"><span className="terra-nav-label">Menu</span>{navItems.map(({ label, icon: Icon }) => <button className={activeNav === label ? 'active' : ''} key={label} onClick={() => { setActiveNav(label); setMenuOpen(false) }}><Icon aria-hidden="true" /><span>{label}</span>{label === 'Circular flow' && <em>LIVE</em>}</button>)}</nav><div className="terra-sidebar-bottom"><button onClick={() => notify('Pusat bantuan TERRANAVA dibuka')}><CircleHelp aria-hidden="true" />Pusat bantuan</button><button onClick={() => notify('Pengaturan ruang kerja dibuka')}><Settings2 aria-hidden="true" />Pengaturan ruang kerja</button><div className="terra-user"><span className="user-avatar">RA</span><span><b>Rani Adelia</b><small>Impact lead</small></span><button aria-label="Notifikasi" onClick={() => notify('Tidak ada notifikasi baru')}><Bell aria-hidden="true" /></button></div></div></aside><main className={`terra-main ${activeNav === 'Optimasi rute' ? 'is-route' : ''}`}>{activeNav === 'Optimasi rute' && <RouteOptimizer onBack={() => setActiveNav('Home')} />}<header className="terra-header"><button className="terra-mobile-menu" aria-label="Buka navigasi" onClick={() => setMenuOpen(!menuOpen)}><Menu aria-hidden="true" /></button><div><span className="terra-kicker">TERRANAVA / {activeNav}</span><h1>{activeNav === 'Home' ? 'Selamat datang di TERRANAVA' : activeNav}</h1></div><div className="terra-header-actions"><span className="live-indicator"><i /> Sistem aktif</span><button className="terra-notification" aria-label="Notifikasi" onClick={() => notify('Tidak ada notifikasi baru')}><Bell aria-hidden="true" /><i /></button><span className="terra-header-avatar">RA</span></div></header>{activeNav === 'Home' && <HomeContent onOpenModal={() => setShowModal(true)} notify={notify} />}{activeNav === 'ESG offering' && <OfferingContent onOpenModal={() => setShowModal(true)} />}{activeNav === 'Circular flow' && <section className="terra-placeholder"><span className="terra-badge"><span /> ALUR YANG TERHUBUNG</span><h2>Circular flow</h2><p>Ruang ini akan membantu melihat perjalanan material dari sumber sampai kembali memberi manfaat.</p><button className="terra-button primary" onClick={() => setActiveNav('Home')}>Kembali ke Home <ArrowUpRight aria-hidden="true" /></button></section>}</main>{toast && <div className="terra-toast" role="status"><ShieldCheck aria-hidden="true" />{toast}</div>}{showModal && <div className="terra-modal-backdrop" role="presentation" onMouseDown={() => setShowModal(false)}><div className="terra-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}><div className="terra-modal-head"><div><span className="terra-kicker">Mulai percakapan</span><h2 id="modal-title">Mari mulai dari akar.</h2></div><button aria-label="Tutup" onClick={() => setShowModal(false)}><X aria-hidden="true" /></button></div><p>Ceritakan sedikit tentang bisnis dan alur organik Anda. Kami akan menyiapkan obrolan awal yang relevan.</p><label>Nama perusahaan<input placeholder="Contoh: Nusantara Hospitality" /></label><label>Email kerja<input type="email" placeholder="nama@perusahaan.com" /></label><button className="terra-button primary full" onClick={() => { setShowModal(false); notify('Permintaan obrolan terkirim') }}>Kirim permintaan <ArrowUpRight aria-hidden="true" /></button></div></div>}</div>
}
