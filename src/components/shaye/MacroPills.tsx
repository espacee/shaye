import React from 'react'

interface MacroPillsProps {
  calories: number
  protein: number
  carbs: number
  fat: number
}

export function MacroPills({ calories, protein, carbs, fat }: MacroPillsProps) {
  const pills = [
    `${calories} kcal`,
    `${protein}g eiwit`,
    `${carbs}g carbs`,
    `${fat}g vet`,
  ]
  return (
    <div className="flex gap-1.5 flex-wrap">
      {pills.map((pill) => (
        <span
          key={pill}
          className="px-2 py-0.5 bg-accent2 rounded-md text-[10px] text-primary font-semibold"
        >
          {pill}
        </span>
      ))}
    </div>
  )
}
