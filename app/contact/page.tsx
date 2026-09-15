import type { Metadata } from 'next'
import ContactPage from '@/components/contact-page'

export const metadata: Metadata = {
  title: 'Hubungi Kami | TERRANAVA',
  description: 'Hubungi tim TERRANAVA untuk ekonomi sirkular, kemitraan HORECA, dan pelaporan ESG.',
}

export default function Page() {
  return <ContactPage />
}
