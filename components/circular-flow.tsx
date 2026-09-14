'use client'

import { useState } from 'react'
import { Activity, ArrowDown, ArrowRight, Bug, CheckCircle2, CircleHelp, Clock3, Droplets, Leaf, MapPin, PackageCheck, Sprout, UtensilsCrossed, Warehouse, Wheat } from 'lucide-react'

const nodes = [
  { key: 'horeca', icon: UtensilsCrossed, title: 'Dapur HORECA', body: 'Limbah organik dikumpulkan rutin setiap hari', tone: 'light' },
  { key: 'hub', icon: Warehouse, title: 'Hub Pemilahan', body: 'Sortir, timbang, catat volume & kualitas', tone: 'mid' },
  { key: 'farm', icon: Bug, title: 'Farm BSF Mitra', body: 'Limbah jadi pakan larva Black Soldier Fly', tone: 'dark' },
  { key: 'feed', icon: Wheat, title: 'Pakan Ternak', body: 'Protein pakan untuk ayam & ikan', tone: 'product' },
  { key: 'compost', icon: Sprout, title: 'Pupuk Organik', body: 'Frass menjadi pupuk tanah premium', tone: 'product' },
]
// TODO: Replace placeholder metrics and activity rows with live database/API data.
const activities = [
  ['08:23', 'Plataran Menteng', '65 kg', 'Dikirim ke farm', 'done'],
  ['09:10', 'Anomali Coffee', '48 kg', 'Dikirim ke farm', 'done'],
  ['10:45', 'Nusa Indonesian', '72 kg', 'Di hub, menunggu', 'waiting'],
  ['11:30', 'Tugu Kunstkring', '56 kg', 'Dijemput', 'pickup'],
  ['13:00', 'Sate Khas Senayan', '44 kg', 'Terjadwal', 'scheduled'],
]

function FlowConnector({ label, down = false }: { label: string; down?: boolean }) { return <div className={`flow-connector ${down ? 'down' : ''}`}><span className="flow-dots" /><small>{label}</small>{down ? <ArrowDown /> : <ArrowRight />}</div> }
function FlowNode({ node, active, onSelect }: { node: typeof nodes[number]; active: boolean; onSelect: () => void }) { const Icon = node.icon; return <button className={`circular-node ${node.tone} ${active ? 'selected' : ''}`} onClick={onSelect}><span className="node-icon"><Icon /></span><strong>{node.title}</strong><small>{node.body}</small></button> }

export function CircularFlow({ onBack }: { onBack: () => void }) {
  const [active, setActive] = useState('hub')
  return <section className="circular-page"><div className="circular-intro"><div><span className="terra-badge"><span /> MATERIAL JOURNEY / LIVE VIEW</span><h2>Dari dapur,<br /><i>kembali ke ekosistem.</i></h2><p>Lacak perjalanan material dari dapur Anda sampai kembali memberi manfaat.</p></div><button className="terra-text-button" onClick={onBack}>Kembali ke Home <ArrowRight /></button></div>

    <div className="circular-diagram" aria-label="Diagram alur sirkular Terranava"><div className="flow-main-row"><FlowNode node={nodes[0]} active={active === nodes[0].key} onSelect={() => setActive(nodes[0].key)} /><FlowConnector label="Pickup terjadwal" /><FlowNode node={nodes[1]} active={active === nodes[1].key} onSelect={() => setActive(nodes[1].key)} /><FlowConnector label="Distribusi harian" /><FlowNode node={nodes[2]} active={active === nodes[2].key} onSelect={() => setActive(nodes[2].key)} /><div className="branch-connectors"><FlowConnector label="Protein" down /><FlowConnector label="Nutrisi" down /></div><div className="product-stack"><FlowNode node={nodes[3]} active={active === nodes[3].key} onSelect={() => setActive(nodes[3].key)} /><FlowNode node={nodes[4]} active={active === nodes[4].key} onSelect={() => setActive(nodes[4].key)} /></div></div><div className="loop-caption"><Droplets /> <span>Kembali ke ekosistem pangan</span> <Leaf /></div></div>

    <section className="circular-stats"><div className="circular-section-label"><span className="terra-kicker">01 / Metrik live hari ini</span><span className="active-badge"><i /> Sistem aktif <CircleHelp aria-label="Data diperbarui setiap 30 menit" /></span></div><div className="circular-stat-grid"><article><PackageCheck /><span>Volume masuk hari ini</span><strong>-- kg</strong></article><article><MapPin /><span>Outlet aktif</span><strong>-- outlet</strong></article><article><TruckIcon /><span>Terkirim ke farm</span><strong>-- kg</strong></article><article><CheckCircle2 /><span>Batch selesai</span><strong>-- batch</strong></article></div></section>

    <section className="activity-section"><div className="circular-section-label"><span className="terra-kicker">02 / Log aktivitas terkini</span><span className="log-note"><Clock3 /> diperbarui berkala</span></div><div className="activity-table"><div className="activity-row activity-head"><span>Waktu</span><span>Outlet</span><span>Volume</span><span>Status</span></div>{activities.map(([time, outlet, volume, status, state]) => <div className="activity-row" key={`${time}-${outlet}`}><span>{time}</span><strong>{outlet}</strong><span>{volume}</span><span className={`status ${state}`}><i />{status}</span></div>)}</div></section>
  </section>
}
function TruckIcon() { return <Activity /> }
