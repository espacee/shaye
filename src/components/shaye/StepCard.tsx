import React from 'react'

interface StepCardProps {
  number: string
  icon: string
  title: string
  description: string
}

export function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="flex gap-3.5 bg-card border border-border rounded-card p-[22px]">
      <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
        {number}
      </div>
      <div>
        <div className="font-heading font-bold text-[15px] mb-1">{title}</div>
        <div className="text-xs text-sub leading-relaxed">{description}</div>
      </div>
    </div>
  )
}
