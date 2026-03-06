'use client'

import React from 'react'

interface QtyControlProps {
  qty: number
  onChange: (qty: number) => void
  size?: 'default' | 'large'
}

export function QtyControl({ qty, onChange, size = 'default' }: QtyControlProps) {
  const s = size === 'large' ? 'w-9 h-9' : 'w-7 h-7'

  return (
    <div className="flex items-center border-[1.5px] border-border rounded-lg overflow-hidden">
      <button
        onClick={() => onChange(qty - 1)}
        className={`${s} flex items-center justify-center text-sub bg-background hover:bg-accent2 transition-colors`}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <div className={`${s} flex items-center justify-center text-sm font-bold`}>
        {qty}
      </div>
      <button
        onClick={() => onChange(qty + 1)}
        className={`${s} flex items-center justify-center text-primary bg-background hover:bg-accent2 transition-colors`}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}
