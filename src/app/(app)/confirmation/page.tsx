import React from 'react'
import Link from 'next/link'
import { CONFIRMATION } from '@/lib/constants'
import type { Metadata } from 'next'

export default function ConfirmationPage() {
  return (
    <div className="bg-background min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4 py-20">
        <div className="text-7xl mb-6">\uD83C\uDF89</div>
        <h1 className="font-heading text-[28px] font-bold mb-3">{CONFIRMATION.title}</h1>
        <p className="text-[15px] text-sub mb-8">{CONFIRMATION.subtitle}</p>
        <Link
          href="/"
          className="inline-block px-10 py-3.5 bg-primary text-white rounded-pill text-[15px] font-bold hover:bg-primary/90 transition-colors"
        >
          {CONFIRMATION.cta} &rarr;
        </Link>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Bedankt | Shaye',
  description: 'Bedankt voor je bestelling.',
}
