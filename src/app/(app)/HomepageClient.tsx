'use client'

import React, { useState } from 'react'
import { MealCard } from '@/components/shaye/MealCard'
import { FilterTabs } from '@/components/shaye/FilterTabs'
import { MENU } from '@/lib/constants'
import { useShayeCart } from '@/hooks/useShayeCart'

interface Meal {
  id: string | number
  slug: string
  title: string
  emoji?: string
  tag?: string
  calories?: number
  protein?: number
  carbs?: number
  fat?: number
  priceInUSD?: number
  imageUrl?: string | null
}

export function HomepageClient({ meals }: { meals: Meal[] }) {
  const [filterIndex, setFilterIndex] = useState(0)
  const cart = useShayeCart()

  const filtered =
    filterIndex === 0
      ? meals
      : meals.filter((m) => m.tag === MENU.tabs[filterIndex])

  return (
    <section id="menu">
      <div className="px-4 sm:px-9 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="font-heading text-2xl font-bold">{MENU.title}</h2>
        <FilterTabs tabs={MENU.tabs} activeIndex={filterIndex} onSelect={setFilterIndex} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 sm:px-9 pb-12">
        {filtered.map((meal) => (
          <MealCard
            key={meal.id}
            id={meal.id}
            slug={meal.slug}
            name={meal.title}
            emoji={meal.emoji}
            tag={meal.tag}
            calories={meal.calories || 0}
            protein={meal.protein || 0}
            carbs={meal.carbs || 0}
            fat={meal.fat || 0}
            price={meal.priceInUSD || 0}
            imageUrl={meal.imageUrl || undefined}
            onAdd={() => {
              cart.addItem({ product: typeof meal.id === 'number' ? meal.id : Number(meal.id) })
            }}
          />
        ))}
      </div>
    </section>
  )
}
