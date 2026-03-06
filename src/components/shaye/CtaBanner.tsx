import React from 'react'
import Link from 'next/link'

interface CtaBannerProps {
  title: string
  subtitle: string
  buttonText: string
  href?: string
}

export function CtaBanner({ title, subtitle, buttonText, href = '/#menu' }: CtaBannerProps) {
  return (
    <div className="mx-9 mb-9 p-10 bg-gradient-to-br from-primary to-primary/90 rounded-2xl text-center text-white">
      <h2 className="font-heading text-[28px] font-bold mb-2.5">{title}</h2>
      <p className="text-[15px] opacity-90 mb-5">{subtitle}</p>
      <Link
        href={href}
        className="inline-block px-10 py-3.5 bg-white text-primary rounded-pill text-[15px] font-bold hover:bg-white/90 transition-colors"
      >
        {buttonText} &rarr;
      </Link>
    </div>
  )
}
