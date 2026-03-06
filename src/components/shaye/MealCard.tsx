'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MacroPills } from './MacroPills'
import { formatEUR } from '@/lib/utils'

interface MealCardProps {
  id: string | number
  slug: string
  name: string
  emoji?: string
  tag?: string
  calories: number
  protein: number
  carbs: number
  fat: number
  price: number
  imageUrl?: string
  onAdd: () => void
}

export function MealCard({
  slug,
  name,
  emoji,
  tag,
  calories,
  protein,
  carbs,
  fat,
  price,
  onAdd,
}: MealCardProps) {
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onAdd()
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <div className="bg-card border border-border rounded-card overflow-hidden">
      <Link
        href={`/products/${slug}`}
        className="block h-[130px] bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] flex items-center justify-center text-5xl relative"
      >
        {emoji || '🍽️'}
        {tag && (
          <span className="absolute top-2 left-2 px-2.5 py-0.5 bg-white/[0.92] rounded-md text-[10px] font-bold text-primary uppercase">
            {tag}
          </span>
        )}
      </Link>
      <div className="p-4">
        <Link href={`/products/${slug}`} className="block font-heading font-bold text-[15px] mb-2 hover:text-primary transition-colors">
          {name}
        </Link>
        <MacroPills calories={calories} protein={protein} carbs={carbs} fat={fat} />
        <div className="flex justify-between items-center mt-3">
          <span className="font-heading font-bold text-primary text-[17px]">
            &euro;{formatEUR(price)}
          </span>
          <button
            onClick={handleAdd}
            className={`px-4 py-2 rounded-pill text-[11px] font-semibold text-white cursor-pointer transition-colors ${
              added ? 'bg-success' : 'bg-primary hover:bg-primary/90'
            }`}
          >
            {added ? '✓ Toegevoegd' : '+ Toevoegen'}
          </button>
        </div>
      </div>
    </div>
  )
}
