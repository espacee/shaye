import React from 'react'

interface PromoBarProps {
  text?: string
  active?: boolean
}

export function PromoBar({ text, active = true }: PromoBarProps) {
  if (!active) return null

  return (
    <div className="bg-primary py-2.5 text-center text-xs text-white font-medium">
      🎉 <strong>15% korting</strong> {text || 'op je eerste bestelling met code SHAYE15 · Gratis levering vanaf €35'}
    </div>
  )
}
