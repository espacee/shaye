'use client'

import React from 'react'
import Link from 'next/link'
import { useShayeCart } from '@/hooks/useShayeCart'
import { QtyControl } from './QtyControl'
import { formatEUR } from '@/lib/utils'
import { CART } from '@/lib/constants'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const cart = useShayeCart()

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 z-[200] transition-opacity"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-[400px] bg-background z-[201] flex flex-col transition-transform duration-300 ease-out ${
          open ? 'translate-x-0 shadow-[-8px_0_40px_rgba(0,0,0,0.1)]' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-border flex justify-between items-center">
          <div className="font-heading text-xl font-bold">
            {CART.title}{' '}
            <span className="text-sm text-sub font-sans">({cart.count})</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-accent2 flex items-center justify-center cursor-pointer text-base text-primary hover:bg-primary hover:text-white transition-colors"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-auto px-6 py-4">
          {!cart.cart?.items?.length ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🛒</div>
              <div className="font-heading text-lg font-bold mb-2">{CART.empty}</div>
              <div className="text-sm text-sub">{CART.emptySubtitle}</div>
            </div>
          ) : (
            cart.cart.items.map((item, i) => {
              const product = typeof item.product === 'object' ? item.product : null
              if (!product) return null
              const price = (product as any).priceInUSD || 0
              const emoji = (product as any).emoji || '🍽️'
              const calories = (product as any).calories || 0
              const protein = (product as any).protein || 0

              return (
                <div
                  key={i}
                  className="flex gap-3.5 py-3.5 border-b border-border"
                >
                  <div className="w-[60px] h-[60px] rounded-[10px] bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] flex items-center justify-center text-3xl flex-shrink-0">
                    {emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-heading font-bold text-sm mb-1 truncate">
                      {product.title}
                    </div>
                    <div className="text-[11px] text-sub mb-2">
                      {calories} kcal · {protein}g eiwit
                    </div>
                    <div className="flex justify-between items-center">
                      <QtyControl
                        qty={item.quantity || 1}
                        onChange={(q) => {
                          const itemId = String(item.id)
                          if (q <= 0) {
                            cart.removeItem(itemId)
                          } else if (q > (item.quantity || 1)) {
                            cart.incrementItem(itemId)
                          } else {
                            cart.decrementItem(itemId)
                          }
                        }}
                      />
                      <span className="font-heading font-bold text-primary text-[15px]">
                        €{formatEUR(price * (item.quantity || 1))}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer */}
        {cart.cart?.items && cart.cart.items.length > 0 && (
          <div className="px-6 py-5 border-t border-border bg-card">
            <div className="flex justify-between mb-1.5">
              <span className="text-sm text-sub">{CART.subtotal}</span>
              <span className="font-heading font-bold text-base">
                €{formatEUR(cart.subtotal)}
              </span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-xs text-sub">{CART.shipping}</span>
              <span className={`text-xs ${cart.shipping === 0 ? 'text-success' : 'text-sub'}`}>
                {cart.shipping === 0 ? `${CART.shippingFree} ✓` : CART.shippingCost}
              </span>
            </div>
            {cart.freeShippingRemaining > 0 && (
              <div className="text-xs text-primary bg-accent2 rounded-lg px-3 py-2 mb-3 text-center">
                {CART.freeShippingMessage(formatEUR(cart.freeShippingRemaining))}
              </div>
            )}
            <Link
              href="/checkout"
              onClick={onClose}
              className="block px-3.5 py-3.5 bg-primary text-white rounded-pill text-center font-bold text-[15px] hover:bg-primary/90 transition-colors mb-2"
            >
              {CART.checkout} →
            </Link>
            <Link
              href="/cart"
              onClick={onClose}
              className="block px-3 py-3 border-[1.5px] border-primary/25 text-primary rounded-pill text-center font-semibold text-[13px] hover:bg-accent2 transition-colors"
            >
              {CART.viewCart}
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
