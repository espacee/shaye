'use client'

import React from 'react'

interface FilterTabsProps {
  tabs: readonly string[] | string[]
  activeIndex: number
  onSelect: (index: number) => void
}

export function FilterTabs({ tabs, activeIndex, onSelect }: FilterTabsProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => onSelect(i)}
          className={`px-5 py-2.5 rounded-pill text-[13px] font-semibold border-[1.5px] cursor-pointer transition-all ${
            i === activeIndex
              ? 'bg-primary text-white border-primary'
              : 'bg-transparent text-sub border-border hover:border-primary/30'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
