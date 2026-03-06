import React from 'react'

interface SectionTitleProps {
  overline?: string
  title: string
  centered?: boolean
}

export function SectionTitle({ overline, title, centered = false }: SectionTitleProps) {
  return (
    <div className={centered ? 'text-center mb-6' : 'mb-6'}>
      {overline && (
        <div className="text-[11px] tracking-[2.5px] text-primary uppercase font-semibold mb-2">
          {overline}
        </div>
      )}
      <h2 className="font-heading text-[28px] font-bold">{title}</h2>
    </div>
  )
}
