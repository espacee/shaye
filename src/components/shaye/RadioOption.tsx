'use client'

import React from 'react'

interface RadioOptionProps {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}

export function RadioOption({ selected, onClick, children }: RadioOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex gap-3.5 items-center w-full p-3.5 border-[1.5px] rounded-xl mb-2 cursor-pointer transition-all text-left ${
        selected
          ? 'border-primary bg-primary/[0.03]'
          : 'border-border bg-transparent hover:border-primary/30'
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
          selected ? 'border-primary' : 'border-sub'
        }`}
      >
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
      </div>
      {children}
    </button>
  )
}
