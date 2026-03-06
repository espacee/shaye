'use client'

import React from 'react'
import Link from 'next/link'
import { useShayeCart } from '@/hooks/useShayeCart'
import { QtyControl } from '@/components/shaye/QtyControl'
import { OrderSummary } from '@/components/shaye/OrderSummary'
import { formatEUR } from '@/lib/utils'
import { CART } from '@/lib/constants'

export default function CartPage() {
  const cart = useShayeCart()

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <div className="px-4 sm:px-9 py-4 text-[13px] text-sub">
        <Link href="/" className="text-primary hover:underline">Home</Link>
        {' / '}
        <span>{CART.title}</span>
      </div>

      <div className="px-4 sm:px-9 pb-12">
        <h1 className="font-heading text-[30px] font-bold mb-6">
          {CART.title}{' '}
          <span className="text-lg text-sub font-sans">({cart.count} items)</span>
        </h1>

        {!cart.cart?.items?.length ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">\uD83D\uDED2</div>
            <div className="font-heading text-[22px] font-bold mb-2">{CART.empty}</div>
            <div className="text-[15px] text-sub mb-6">{CART.emptySubtitle}</div>
            <Link
              href="/"
              className="inline-block px-9 py-3.5 bg-primary text-white rounded-pill font-bold hover:bg-primary/90 transition-colors"
            >
              Bekijk het menu &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_0.5fr] gap-8 items-start">
            {/* Items */}
            <div>
              {/* Header */}
              <div className="hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 pb-3 border-b border-border text-[11px] font-bold text-sub uppercase tracking-[1px]">
                <span>Product</span>
                <span>Prijs</span>
                <span>Aantal</span>
                <span>Totaal</span>
                <span className="w-7" />
              </div>

              {cart.cart.items.map((item, i) => {
                const product = typeof item.product === 'object' ? item.product : null
                if (!product) return null
                const price = (product as any).priceInUSD || 0
                const emoji = (product as any).emoji || '\uD83C\uDF7D\uFE0F'
                const calories = (product as any).calories || 0
                const protein = (product as any).protein || 0

                return (
                  <div
                    key={i}
                    className="grid grid-cols-1 sm:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 py-4 border-b border-border items-center"
                  >
                    <div className="flex gap-3.5 items-center">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] flex items-center justify-center text-3xl flex-shrink-0">
                        {emoji}
                      </div>
                      <div>
                        <Link
                          href={`/products/${(product as any).slug}`}
                          className="font-heading font-bold text-[15px] hover:text-primary transition-colors"
                        >
                          {product.title}
                        </Link>
                        <div className="text-[11px] text-sub">{calories} kcal &middot; {protein}g eiwit</div>
                      </div>
                    </div>
                    <div className="text-sm text-sub">&euro;{formatEUR(price)}</div>
                    <div>
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
                    </div>
                    <div className="font-heading font-bold text-[15px]">
                      &euro;{formatEUR(price * (item.quantity || 1))}
                    </div>
                    <button
                      onClick={() => cart.removeItem(String(item.id))}
                      className="w-7 h-7 rounded-full bg-accent2 flex items-center justify-center cursor-pointer text-xs text-primary hover:bg-primary hover:text-white transition-colors"
                      aria-label="Remove item"
                    >
                      &times;
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Sidebar */}
            <OrderSummary />
          </div>
        )}
      </div>
    </div>
  )
}
