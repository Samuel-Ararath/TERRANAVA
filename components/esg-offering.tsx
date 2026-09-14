'use client'

import { useEffect, useRef, useState } from 'react'
import { Award, BarChart3, Check, FileCheck, Leaf, X, Zap } from 'lucide-react'

function ImpactCounter({ value, suffix, label, detail }: { value: number; suffix: string; label: string; detail: string }) {
  const [visible, setVisible] = useState(false)
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true) }, { threshold: 0.4 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    if (!visible) return
    const duration = 1200
    const start = performance.now()
    const tick = (now: number) => { const progress = Math.min((now - start) / duration, 1); setCount(Math.round(value * (1 - Math.pow(1 - progress, 3)) * 10) / 10); if (progress < 1) requestAnimationFrame(tick) }
    requestAnimationFrame(tick)
  }, [value, visible])
  return <div className="impact-counter" ref={ref}><strong>{count.toLocaleString('id-ID', { maximumFractionDigits: 1 })}{suffix}</strong><span>{label}</span><small>{detail}</small></div>
}

function ReportPreview({ onClose }: { onClose: () => void }) {
  return <div className="report-backdrop" role="dialog" aria-modal="true" aria-labelledby="report-title"><div className="report-modal"><div className="report-modal-head"><div><span className="terra-kicker">CONTOH DOKUMEN / 2026</span><h2 id="report-title">Laporan Dampak Bulanan</h2></div><button onClick={onClose} aria-label="Tutup preview laporan"><X /></button></div><div className="report-paper"><div className="report-paper-top"><span>TERRANAVA</span><b>IMPACT REPORT</b></div><p>Ringkasan pengalihan limbah organik — Januari 2026</p><div className="report-figures"><div><strong>2.840</strong><span>kg dialihkan</span></div><div><strong>1.9</strong><span>ton CO₂e</span></div><div><strong>42</strong><span>batch ke farm</span></div></div><div className="report-bar"><span /><span /><span /><span /><span /></div><small>Contoh tampilan. Angka akan terisi dari aktivitas pickup dan penimbangan mitra.</small></div><button className="terra-button primary full" onClick={onClose}>Tutup contoh laporan</button></div></div>
}

// TODO: Replace demo impact values with aggregated partner data from the ESG backend.
const painPoints = [
  ['Audit CSR datang, data limbah tidak ada', 'Dengan ESG Terranava, setiap pickup dan timbang tercatat otomatis sejak dari dapur.'],
  ['Sertifikasi hijau butuh bukti diversion rate', 'Laporan bulanan merangkum berapa banyak organik yang tidak berakhir di landfill.'],
  ['Investor dan tenant bertanya soal sustainability', 'Satu halaman dampak yang rapi, mudah dibaca, dan siap dibagikan ke pihak yang perlu.'],
]
const outputs: Array<[typeof FileCheck, string, string]> = [
  [FileCheck, 'Laporan Dampak Bulanan', 'PDF berisi total kg organik yang dialihkan, estimasi CO₂e, dan jumlah batch ke farm BSF.'],
  [BarChart3, 'Dashboard Real-time', 'Pantau pickup harian, histori per outlet, dan perubahan volume dari bulan ke bulan.'],
  [Award, 'Sertifikat Diversion Tahunan', 'Dokumen resmi yang bisa dilampirkan ke laporan keberlanjutan, CSR, tender, atau audit.'],
  [Zap, 'Data API', 'Untuk paket Professional: kirim data dampak langsung ke sistem pelaporan ESG internal Anda.'],
]

export function EsgOffering({ onOpenChat }: { onOpenChat: () => void }) {
  const [showReport, setShowReport] = useState(false)
  return <section className="offering-page offering-v2"><div className="offering-hero-v2"><div><span className="terra-badge"><span /> ESG UNTUK HORECA</span><h2>Limbah dapur Anda<br /><i>punya cerita.</i><br />Sekarang bisa dibuktikan.</h2><p>Setiap kilogram organik yang Anda serahkan ke Terranava tercatat, tersalurkan, dan dilaporkan — siap untuk audit ESG Anda.</p><button className="terra-button primary" onClick={() => setShowReport(true)}>Lihat contoh laporan <FileCheck /></button></div><div className="hero-proof"><Leaf /><span>REVERSE LOGISTICS</span><strong>Dapur → hub → farm BSF</strong><small>Jejak material yang tidak berhenti di tempat sampah.</small></div></div>

    <section className="offering-section"><div className="section-heading"><span className="terra-kicker">01 / Kenapa subscribe ESG?</span><h3>Ketika data sudah ada,<br /><i>cerita dampak jadi lebih mudah.</i></h3></div><div className="pain-grid">{painPoints.map(([title, body], index) => <article className="pain-card" key={title}><span className="pain-index">0{index + 1}</span><h4>{title}</h4><p>{body}</p></article>)}</div></section>

    <section className="offering-section output-section"><div className="section-heading"><span className="terra-kicker">02 / Apa yang Anda dapatkan</span><h3>Output konkret,<br /><i>bukan janji yang abstrak.</i></h3></div><div className="output-grid">{outputs.map(([Icon, title, body], index) => <article className="output-card" key={title}><span className="output-step">0{index + 1}</span><Icon /><h4>{title}</h4><p>{body}</p></article>)}</div></section>

    <section className="offering-section pricing-section"><div className="section-heading"><span className="terra-kicker">03 / Paket & harga</span><h3>Pilih ritme yang<br /><i>sesuai kebutuhan Anda.</i></h3></div><div className="pricing-grid"><article className="pricing-card foundation"><span className="price-label">ESG FOUNDATION</span><h4>Mulai dengan data yang rapi.</h4><div className="price">Rp 1.500.000<small>/bulan</small></div><ul><li><Check /> Laporan PDF bulanan</li><li><Check /> Dashboard read-only</li><li><Check /> Sertifikat diversion tahunan</li></ul><button className="terra-button secondary full" onClick={onOpenChat}>Pilih Foundation</button></article><article className="pricing-card professional"><span className="price-label">ESG PROFESSIONAL</span><h4>Untuk tim yang ingin lebih dalam.</h4><div className="price">Rp 3.500.000<small>/bulan</small></div><ul><li><Check /> Semua benefit Foundation</li><li><Check /> Data API untuk sistem internal</li><li><Check /> Laporan custom per outlet</li><li><Check /> Dedicated impact analyst</li></ul><button className="terra-button primary full" onClick={onOpenChat}>Bicarakan Professional</button></article></div></section>

    <section className="offering-section proof-section"><div className="proof-heading"><div><span className="terra-kicker">04 / Dampak yang sudah terjadi</span><h3>Angka yang membuat<br /><i>perubahan terlihat.</i></h3></div><small>Placeholder demo · semua mitra</small></div><div className="impact-grid"><ImpactCounter value={12400} suffix=" kg" label="organik dialihkan dari TPA" detail="bulan ini" /><ImpactCounter value={8.2} suffix=" ton" label="CO₂e emisi yang dicegah" detail="estimasi dampak" /><ImpactCounter value={6} suffix=" farm" label="peternak BSF menerima manfaat" detail="dalam jaringan" /></div></section>

    <section className="offering-final"><div><span className="terra-kicker">05 / Langkah berikutnya</span><h3>Mulai lacak dampak<br /><i>Anda bulan ini.</i></h3><p>Tidak ada kontrak jangka panjang. Bisa mulai bulan depan.</p></div><button className="terra-button primary" onClick={onOpenChat}>Jadwalkan obrolan awal <Leaf /></button></section>
    {showReport && <ReportPreview onClose={() => setShowReport(false)} />}</section>
}
