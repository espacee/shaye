'use client'

import React from 'react'
import { useShayeCart } from '@/hooks/useShayeCart'
import { DiscountCode } from './DiscountCode'
import { formatEUR } from '@/lib/utils'
import { CART } from '@/lib/constants'

interface OrderSummaryProps {
  showDiscount?: boolean
}

export function OrderSummary({ showDiscount = false }: OrderSummaryProps) {
  const cart = useShayeCart()

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sticky top-[100px]">
      <div className="font-heading text-lg font-bold mb-5">Overzicht</div>

      {/* Items */}
      {cart.cart?.items?.map((item, i) => {
        const product = typeof item.product === 'object' ? item.product : null
        if (!product) return null
        const price = (product as any).priceInUSD || 0
        const emoji = (product as any).emoji || '🍽️'

        return (
          <div key={i} className="flex gap-3 items-center py-2 border-b border-border">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] flex items-center justify-center text-xl flex-shrink-0">
              {emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate">{product.title}</div>
              <div className="text-[11px] text-sub">x{item.quantity}</div>
            </div>
            <div className="text-sm font-semibold">€{formatEUR(price * (item.quantity || 1))}</div>
          </div>
        )
      })}

      <div className="mt-4 space-y-2.5">
        {/* Discount code */}
        {showDiscount && (
          <div className="mb-3">
            <DiscountCode onApply={cart.applyDiscount} applied={cart.discountApplied} />
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-sub">{CART.subtotal}</span>
          <span className="font-semibold">€{formatEUR(cart.subtotal)}</span>
        </div>

        {cart.discountApplied && (
          <div className="flex justify-between text-sm">
            <span className="text-sub">Korting ({cart.discountPercentage}%)</span>
            <span className="font-semibold text-success">-€{formatEUR(cart.discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-sub">{CART.shipping}</span>
          <span className={`font-semibold ${cart.shipping === 0 ? 'text-success' : ''}`}>
            {cart.shipping === 0 ? `${CART.shippingFree} ✓` : `€${formatEUR(cart.shipping)}`}
          </span>
        </div>

        {cart.freeShippingRemaining > 0 && (
          <div className="text-xs text-primary bg-accent2 rounded-lg px-3 py-2 text-center">
            {CART.freeShippingMessage(formatEUR(cart.freeShippingRemaining))}
          </div>
        )}

        <div className="border-t border-border pt-3 mt-2 flex justify-between">
          <span className="font-bold text-base">{CART.total}</span>
          <span className="font-heading font-bold text-[22px] text-primary">
            €{formatEUR(cart.grandTotal)}
          </span>
        </div>
      </div>
    </div>
  )
}
