import React from 'react'

export function SocialProof() {
  const avatars = ['👩', '👨', '👩', '👨']
  return (
    <div className="flex gap-3.5 items-center">
      <div className="flex">
        {avatars.map((emoji, i) => (
          <div
            key={i}
            className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] border-2 border-background flex items-center justify-center text-xs"
            style={{ marginLeft: i > 0 ? '-8px' : 0 }}
          >
            {emoji}
          </div>
        ))}
      </div>
      <div className="text-[13px] text-sub">
        <strong className="text-foreground">500+</strong> klanten &middot;{' '}
        <span className="text-[#F5A623]">★★★★★</span> 4.8/5
      </div>
    </div>
  )
}
