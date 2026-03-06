import type { ReactNode } from 'react'

import { AdminBar } from '@/components/AdminBar'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { PromoBar } from '@/components/shaye/PromoBar'
import { Navbar } from '@/components/shaye/Navbar'
import { ShayeFooter } from '@/components/shaye/ShayeFooter'
import { Fraunces, Jost } from 'next/font/google'
import React from 'react'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '600', '700'],
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={[fraunces.variable, jost.variable].filter(Boolean).join(' ')}
      lang="nl"
      data-theme="light"
    >
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar />
          <LivePreviewListener />
          <PromoBar />
          <Navbar />
          <main>{children}</main>
          <ShayeFooter />
        </Providers>
      </body>
    </html>
  )
}
