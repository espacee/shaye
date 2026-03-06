'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useShayeCart } from '@/hooks/useShayeCart'
import { OrderSummary } from '@/components/shaye/OrderSummary'
import { InputField } from '@/components/shaye/InputField'
import { RadioOption } from '@/components/shaye/RadioOption'
import { DayPicker } from '@/components/shaye/DayPicker'
import { formatEUR } from '@/lib/utils'
import { CHECKOUT, CART } from '@/lib/constants'

export default function CheckoutPage() {
  const cart = useShayeCart()
  const [step, setStep] = useState(1)
  const [deliveryMethod, setDeliveryMethod] = useState(0)
  const [deliveryDay, setDeliveryDay] = useState(0)

  if (!cart.cart?.items?.length) {
    return (
      <div className="bg-background px-9 py-20 text-center">
        <div className="text-6xl mb-4">\uD83D\uDED2</div>
        <div className="font-heading text-[22px] font-bold mb-6">{CART.empty}</div>
        <Link
          href="/"
          className="inline-block px-9 py-3.5 bg-primary text-white rounded-pill font-bold hover:bg-primary/90 transition-colors"
        >
          Bekijk het menu &rarr;
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <div className="px-4 sm:px-9 py-4 text-[13px] text-sub">
        <Link href="/" className="text-primary hover:underline">Home</Link>
        {' / '}
        <Link href="/cart" className="text-primary hover:underline">{CART.title}</Link>
        {' / '}
        <span>Afrekenen</span>
      </div>

      <div className="px-4 sm:px-9 pb-12 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
        {/* LEFT: Form */}
        <div>
          <h1 className="font-heading text-[28px] font-bold mb-7">{CHECKOUT.title}</h1>

          {/* Progress */}
          <div className="flex gap-0 mb-8">
            {CHECKOUT.steps.map((s, i) => (
              <div key={i} className="flex-1 text-center relative">
                <div
                  className={`w-8 h-8 rounded-full mx-auto mb-1.5 flex items-center justify-center text-[13px] font-bold ${
                    step > i + 1
                      ? 'bg-primary text-white'
                      : step === i + 1
                        ? 'bg-primary text-white'
                        : 'bg-accent2 text-sub'
                  }`}
                >
                  {step > i + 1 ? '\u2713' : i + 1}
                </div>
                <div
                  className={`text-xs ${
                    step === i + 1 ? 'text-primary font-bold' : 'text-sub'
                  }`}
                >
                  {s}
                </div>
                {i === 0 && (
                  <div
                    className={`absolute top-4 left-[60%] right-[-40%] h-0.5 ${
                      step > 1 ? 'bg-primary' : 'bg-accent2'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* STEP 1: Delivery */}
          <div
            className={`bg-card border rounded-2xl p-6 mb-4 ${
              step === 1 ? 'border-primary/20' : 'border-border'
            }`}
          >
            <div className="flex justify-between items-center mb-5">
              <div className="font-heading text-lg font-bold">{CHECKOUT.deliveryTitle}</div>
              {step > 1 && (
                <button
                  onClick={() => setStep(1)}
                  className="text-[13px] text-primary cursor-pointer hover:underline"
                >
                  {CHECKOUT.modify}
                </button>
              )}
            </div>

            {step === 1 && (
              <>
                <div className="text-[13px] font-bold mb-3 text-primary tracking-[0.5px]">
                  {CHECKOUT.deliveryAddress}
                </div>
                <div className="mb-3">
                  <InputField label={CHECKOUT.fields.street} name="street" placeholder="Kerkstraat 42" required />
                </div>
                <div className="grid grid-cols-[1fr_2fr] gap-3 mb-3">
                  <InputField label={CHECKOUT.fields.postalCode} name="postalCode" placeholder="3190" required />
                  <InputField label={CHECKOUT.fields.city} name="city" placeholder="Boortmeerbeek" required />
                </div>
                <div className="mb-6">
                  <label htmlFor="country" className="text-xs text-sub block mb-1.5">
                    {CHECKOUT.fields.country} *
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="w-full px-4 py-3 border-[1.5px] border-border rounded-input text-sm font-sans outline-none bg-card cursor-pointer focus:border-primary transition-colors"
                  >
                    {CHECKOUT.countries.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="text-[13px] font-bold mb-3 text-primary tracking-[0.5px]">
                  {CHECKOUT.deliveryMethod}
                </div>
                <RadioOption selected={deliveryMethod === 0} onClick={() => setDeliveryMethod(0)}>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{CHECKOUT.sameDayTitle}</div>
                    <div className="text-xs text-sub">{CHECKOUT.sameDayDesc}</div>
                  </div>
                  <div className={`text-[13px] font-bold ${cart.shipping === 0 ? 'text-success' : ''}`}>
                    {cart.shipping === 0 ? 'Gratis' : '\u20AC5,95'}
                  </div>
                </RadioOption>
                <RadioOption selected={deliveryMethod === 1} onClick={() => setDeliveryMethod(1)}>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{CHECKOUT.chooseDayTitle}</div>
                    <div className="text-xs text-sub">{CHECKOUT.chooseDayDesc}</div>
                  </div>
                  <div className={`text-[13px] font-bold ${cart.shipping === 0 ? 'text-success' : ''}`}>
                    {cart.shipping === 0 ? 'Gratis' : '\u20AC5,95'}
                  </div>
                </RadioOption>

                {deliveryMethod === 1 && (
                  <DayPicker selectedIndex={deliveryDay} onSelect={setDeliveryDay} />
                )}

                <button
                  onClick={() => setStep(2)}
                  className="w-full mt-4 py-3.5 bg-primary text-white rounded-pill text-center font-bold text-[15px] cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  Verder naar betaling &rarr;
                </button>
              </>
            )}
          </div>

          {/* STEP 2: Personal & Payment */}
          {step >= 2 && (
            <div
              className={`bg-card border rounded-2xl p-6 ${
                step === 2 ? 'border-primary/20' : 'border-border'
              }`}
            >
              <div className="font-heading text-lg font-bold mb-5">
                {CHECKOUT.personalTitle}
              </div>

              <div className="text-[13px] font-bold mb-3 text-primary tracking-[0.5px]">
                {CHECKOUT.personalDetails}
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <InputField label={CHECKOUT.fields.firstName} name="firstName" placeholder="Jan" required />
                <InputField label={CHECKOUT.fields.lastName} name="lastName" placeholder="Janssen" required />
              </div>
              <div className="mb-3">
                <InputField label={CHECKOUT.fields.email} name="email" placeholder="jan@email.be" type="email" required />
              </div>
              <div className="mb-6">
                <InputField label={CHECKOUT.fields.phone} name="phone" placeholder="+32 471 23 45 67" type="tel" />
              </div>

              <div className="text-[13px] font-bold mb-3 text-primary tracking-[0.5px]">
                {CHECKOUT.paymentTitle}
              </div>
              <div className="border border-border rounded-xl p-4 mb-6 text-sm text-sub text-center">
                Stripe Payment Element wordt hier geladen
              </div>

              <Link
                href="/confirmation"
                className="block w-full py-3.5 bg-primary text-white rounded-pill text-center font-bold text-[15px] hover:bg-primary/90 transition-colors"
              >
                {CHECKOUT.placeOrder} &rarr;
              </Link>
            </div>
          )}
        </div>

        {/* RIGHT: Order Summary */}
        <OrderSummary showDiscount />
      </div>
    </div>
  )
}
