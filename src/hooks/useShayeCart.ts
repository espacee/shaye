'use client'

import { useCart } from '@payloadcms/plugin-ecommerce/client/react'
import { useMemo, useState, useCallback } from 'react'

const FREE_SHIPPING_THRESHOLD = 35
const SHIPPING_COST = 5.95

export function useShayeCart() {
  const cart = useCart()
  const [discountCode, setDiscountCode] = useState('')
  const [discountApplied, setDiscountApplied] = useState(false)
  const discountPercentage = 15

  const count = useMemo(() => {
    if (!cart.cart?.items) return 0
    return cart.cart.items.reduce((sum, item) => sum + (item.quantity || 0), 0)
  }, [cart.cart?.items])

  const subtotal = useMemo(() => {
    if (!cart.cart?.items) return 0
    return cart.cart.items.reduce((sum, item) => {
      const product = item.product
      if (typeof product === 'object' && product !== null) {
        const price = (product as any).priceInUSD || 0
        return sum + price * (item.quantity || 0)
      }
      return sum
    }, 0)
  }, [cart.cart?.items])

  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const freeShippingRemaining = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FREE_SHIPPING_THRESHOLD - subtotal

  const discountAmount = discountApplied ? subtotal * (discountPercentage / 100) : 0
  const grandTotal = subtotal - discountAmount + shipping

  const applyDiscount = useCallback((code: string) => {
    if (code.toUpperCase() === 'SHAYE15') {
      setDiscountApplied(true)
      setDiscountCode(code)
      return true
    }
    return false
  }, [])

  return {
    ...cart,
    count,
    subtotal,
    shipping,
    freeShippingRemaining,
    discountCode,
    discountApplied,
    discountAmount,
    discountPercentage,
    grandTotal,
    applyDiscount,
  }
}
