'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useShayeCart } from '@/hooks/useShayeCart'
import { CartDrawer } from './CartDrawer'

interface NavLink {
  label: string
  href: string
}

interface NavbarClientProps {
  brand: string
  links: NavLink[]
  cta: string
}

export function NavbarClient({ brand, links, cta }: NavbarClientProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const cart = useShayeCart()

  return (
    <>
      <nav className="flex justify-between items-center px-4 sm:px-9 py-3.5 border-b border-border bg-background sticky top-0 z-[100]">
        <Link href="/" className="font-heading text-[26px] font-bold text-foreground">
          {brand}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-sub hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative cursor-pointer text-xl"
            aria-label="Open cart"
          >
            🛒
            {cart.count > 0 && (
              <span className="absolute -top-2 -right-2.5 w-[18px] h-[18px] rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                {cart.count}
              </span>
            )}
          </button>
          <Link
            href="/#menu"
            className="px-6 py-2.5 bg-primary text-white rounded-pill text-[13px] font-semibold hover:bg-primary/90 transition-colors"
          >
            {cta}
          </Link>
        </div>

        {/* Mobile nav */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative cursor-pointer text-xl"
            aria-label="Open cart"
          >
            🛒
            {cart.count > 0 && (
              <span className="absolute -top-2 -right-2.5 w-[18px] h-[18px] rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                {cart.count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-2xl cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 py-4 flex flex-col gap-3 z-[99]">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-sub hover:text-primary py-1"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#menu"
            onClick={() => setMobileOpen(false)}
            className="px-6 py-2.5 bg-primary text-white rounded-pill text-[13px] font-semibold text-center hover:bg-primary/90 transition-colors"
          >
            {cta}
          </Link>
        </div>
      )}

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
