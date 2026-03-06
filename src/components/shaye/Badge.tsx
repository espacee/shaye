import React from 'react'

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent2 text-primary rounded-full text-xs font-semibold">
      {children}
    </span>
  )
}
