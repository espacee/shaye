'use client'

import React, { useState } from 'react'
import { QtyControl } from '@/components/shaye/QtyControl'
import { MacroGrid } from '@/components/shaye/MacroGrid'
import { Badge } from '@/components/shaye/Badge'
import { formatEUR } from '@/lib/utils'
import { PRODUCT } from '@/lib/constants'
import { useShayeCart } from '@/hooks/useShayeCart'

interface ProductDetailClientProps {
  product: {
    id: string | number
    title: string
    emoji?: string
    tag?: string
    priceInUSD?: number
    calories?: number
    protein?: number
    carbs?: number
    fat?: number
    ingredients?: string
    allergens?: string
    storage_instructions?: string
    halal?: boolean
  }
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const cart = useShayeCart()

  const price = product.priceInUSD || 0

  const handleAdd = () => {
    cart.addItem({ product: typeof product.id === 'number' ? product.id : Number(product.id) }, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const details = [
    { title: PRODUCT.ingredients, content: product.ingredients },
    { title: PRODUCT.allergens, content: product.allergens },
    { title: PRODUCT.storage, content: product.storage_instructions },
  ].filter((d) => d.content)

  return (
    <div className="pt-2.5">
      {product.halal && <Badge>&#x262A; {PRODUCT.halal}</Badge>}
      <h1 className="font-heading text-[34px] font-bold mt-3.5 mb-2">{product.title}</h1>
      <div className="font-heading text-[28px] font-bold text-primary mb-4">
        &euro;{formatEUR(price)}
      </div>

      {/* Macros */}
      {product.calories != null && (
        <div className="mb-6">
          <MacroGrid
            calories={product.calories || 0}
            protein={product.protein || 0}
            carbs={product.carbs || 0}
            fat={product.fat || 0}
          />
        </div>
      )}

      {/* Qty + Add */}
      <div className="flex gap-3.5 items-center mb-6">
        <QtyControl qty={qty} onChange={(q) => setQty(Math.max(1, q))} size="large" />
        <button
          onClick={handleAdd}
          className={`flex-1 py-3.5 rounded-pill text-center font-bold text-[15px] text-white cursor-pointer transition-colors ${
            added ? 'bg-success' : 'bg-primary hover:bg-primary/90'
          }`}
        >
          {added ? `\u2713 ${PRODUCT.addedToCart}` : PRODUCT.addToCart(formatEUR(price * qty))}
        </button>
      </div>

      {/* Details accordion */}
      {details.map((section) => (
        <div key={section.title} className="border-t border-border py-3.5">
          <div className="text-sm font-bold mb-1.5">{section.title}</div>
          <div className="text-[13px] text-sub leading-relaxed">{section.content}</div>
        </div>
      ))}
    </div>
  )
}
