'use client'

import Link from 'next/link'
import { ArrowUpRight, Camera as InstagramIcon, Clock3, Hash as TwitterIcon, Mail, MapPin, MessageCircle, Send } from 'lucide-react'

const channels = [
  { label: 'WhatsApp', handle: '+62 812 3456 7890', detail: 'Untuk percakapan cepat dan operasional pickup.', href: 'https://wa.me/6281234567890', icon: MessageCircle },
  { label: 'Telegram', handle: '@terranava', detail: 'Untuk update jaringan dan kolaborasi komunitas.', href: 'https://t.me/terranava', icon: Send },
  { label: 'X / Twitter', handle: '@terranava', detail: 'Ikuti catatan pendek tentang ekonomi sirkular.', href: 'https://x.com/terranava', icon: TwitterIcon },
  { label: 'Instagram', handle: '@terranava', detail: 'Lihat cerita di balik setiap aliran organik.', href: 'https://instagram.com/terranava', icon: InstagramIcon },
  { label: 'Email', handle: 'terranava@official.co.id', detail: 'Untuk kemitraan, ESG, dan pertanyaan umum.', href: 'mailto:terranava@official.co.id', icon: Mail },
]

export function ContactPage() { return <main className="contact-page"><nav className="contact-topbar"><Link href="/" className="contact-brand"><span>TI</span><strong>TERRANAVA <small>INDONESIA</small></strong></Link><Link href="/" className="contact-back">Kembali ke ruang dampak <ArrowUpRight /></Link></nav><section className="contact-hero"><div><span className="terra-kicker">TERRANAVA / HUBUNGI KAMI</span><h1>Mulai dari<br /><i>percakapan kecil.</i></h1><p>Ceritakan apa yang sedang Anda bangun, ukur, atau ingin ubah. Tim TERRANAVA siap membantu menemukan langkah sirkular yang paling masuk akal.</p></div><div className="contact-hero-mark"><MessageCircle /><span>09</span><small>CONNECTED<br />BY IMPACT</small></div></section><section className="contact-status-card"><span className="contact-status-dot"><i /> Tim kami aktif</span><p>Senin–Jumat · 09.00–17.00 WIB</p><span className="contact-response">Respons rata-rata <b>&lt; 1 hari kerja</b></span></section><section className="contact-channel-grid">{channels.map(({ label, handle, detail, href, icon: Icon }) => <a className="contact-channel-card" href={href} key={label} target={href.startsWith('mailto:') ? undefined : '_blank'} rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}><span className="contact-icon"><Icon /></span><span><small>{label}</small><strong>{handle}</strong><p>{detail}</p></span><ArrowUpRight /></a>)}</section><section className="contact-bottom"><div><span className="terra-kicker">KANTOR KAMI</span><h2>Datang dan<br /><i>berkenalan.</i></h2></div><div className="contact-location"><MapPin /><div><strong>Jakarta, Indonesia</strong><p>Ruang kolaborasi TERRANAVA<br />Jakarta Selatan · Dengan janji temu</p></div></div><div className="contact-location"><Clock3 /><div><strong>Butuh presentasi ESG?</strong><p>Kirim kebutuhan Anda ke<br />terranava@official.co.id</p></div></div></section></main> }
export default ContactPage
