'use client'

import React, { useState } from 'react'

interface DiscountCodeProps {
  onApply: (code: string) => boolean
  applied: boolean
}

export function DiscountCode({ onApply, applied }: DiscountCodeProps) {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)

  const handleApply = () => {
    const success = onApply(code)
    if (!success) setError(true)
    else setError(false)
  }

  return (
    <div>
      <div className="text-xs text-sub mb-2">Kortingscode</div>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => { setCode(e.target.value); setError(false) }}
          placeholder="Voer code in"
          disabled={applied}
          className="flex-1 px-3 py-2.5 border-[1.5px] border-border rounded-input text-sm outline-none bg-card focus:border-primary transition-colors disabled:opacity-50"
        />
        <button
          onClick={handleApply}
          disabled={applied || !code}
          className="px-4 py-2.5 bg-primary text-white rounded-input text-sm font-semibold disabled:opacity-50 cursor-pointer hover:bg-primary/90 transition-colors"
        >
          {applied ? '✓ Toegepast' : 'Toepassen'}
        </button>
      </div>
      {error && <div className="text-xs text-error mt-1">Ongeldige kortingscode</div>}
      {applied && <div className="text-xs text-success mt-1">SHAYE15 — 15% korting toegepast!</div>}
    </div>
  )
}
