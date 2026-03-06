import React from 'react'
import Link from 'next/link'
import { FOOTER } from '@/lib/constants'

export function ShayeFooter() {
  return (
    <footer className="px-4 sm:px-9 py-9 border-t border-border bg-background">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
        <div>
          <div className="font-heading text-xl font-bold mb-2.5">{FOOTER.brand}</div>
          <div className="text-[13px] text-sub leading-[1.7]">{FOOTER.tagline}</div>
        </div>
        {FOOTER.columns.map((col) => (
          <div key={col.title}>
            <div className="text-[11px] font-bold tracking-[1px] uppercase mb-3">
              {col.title}
            </div>
            {col.items.map((item) => (
              <div key={item} className="text-[13px] text-sub mb-1.5 cursor-pointer hover:text-primary transition-colors">
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-4 flex flex-col sm:flex-row justify-between text-[11px] text-sub gap-2">
        <span>{FOOTER.copyright}</span>
        <span>{FOOTER.badges}</span>
      </div>
    </footer>
  )
}
