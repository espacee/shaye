'use client'

import React from 'react'
import { getNextWeekdays } from '@/lib/utils'

interface DayPickerProps {
  selectedIndex: number
  onSelect: (index: number) => void
}

export function DayPicker({ selectedIndex, onSelect }: DayPickerProps) {
  const days = getNextWeekdays(4)

  return (
    <div className="mt-3 mb-2">
      <div className="text-xs text-sub mb-2.5">Beschikbare leverdagen:</div>
      <div className="grid grid-cols-4 gap-2">
        {days.map((d, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            className={`p-3.5 text-center rounded-xl border-[1.5px] cursor-pointer transition-all ${
              selectedIndex === i
                ? 'border-primary bg-primary/[0.03]'
                : 'border-border bg-transparent hover:border-primary/30'
            }`}
          >
            <div className={`text-xs font-semibold ${selectedIndex === i ? 'text-primary' : 'text-sub'}`}>
              {d.day}
            </div>
            <div className={`text-base font-bold my-1 ${selectedIndex === i ? 'text-primary' : 'text-foreground'}`}>
              {d.dateNum}
            </div>
            <div className="text-[10px] text-sub">{d.month}</div>
            <div className="text-[10px] text-sub mt-1.5">17:00–22:00</div>
          </button>
        ))}
      </div>
    </div>
  )
}
