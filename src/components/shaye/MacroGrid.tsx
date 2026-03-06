import React from 'react'
import { PRODUCT } from '@/lib/constants'

interface MacroGridProps {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export function MacroGrid({ calories, protein, carbs, fat }: MacroGridProps) {
  const macros = [
    { label: PRODUCT.macros.calories, value: calories, unit: 'kcal' },
    { label: PRODUCT.macros.protein, value: protein, unit: 'g' },
    { label: PRODUCT.macros.carbs, value: carbs, unit: 'g' },
    { label: PRODUCT.macros.fat, value: fat, unit: 'g' },
  ]

  return (
    <div className="grid grid-cols-4 gap-2.5">
      {macros.map((m) => (
        <div key={m.label} className="bg-accent2 rounded-xl p-3.5 text-center">
          <div className="text-[11px] text-sub mb-1">{m.label}</div>
          <div className="font-heading font-bold text-[22px] text-primary">
            {m.value}
            <span className="text-xs font-normal">{m.unit}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
