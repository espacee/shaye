import React from 'react'

interface ReviewCardProps {
  name: string
  location: string
  text: string
  stars: number
}

export function ReviewCard({ name, location, text, stars }: ReviewCardProps) {
  return (
    <div className="bg-card border border-border rounded-card p-[22px]">
      <div className="text-[#F5A623] text-sm mb-2.5">
        {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
      </div>
      <div className="text-sm leading-[1.7] italic mb-3">&ldquo;{text}&rdquo;</div>
      <div className="text-[13px] font-bold">{name}</div>
      <div className="text-[11px] text-sub">{location}</div>
    </div>
  )
}
