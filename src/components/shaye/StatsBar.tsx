import React from 'react'

interface Stat {
  value: string
  label: string
}

export function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 border border-border rounded-card overflow-hidden bg-card">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`p-5 text-center ${i < stats.length - 1 ? 'sm:border-r sm:border-border' : ''} ${i < stats.length - 2 ? 'border-b sm:border-b-0 border-border' : ''}`}
        >
          <div className="font-heading font-bold text-2xl text-primary">{stat.value}</div>
          <div className="text-xs text-sub mt-0.5">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}
