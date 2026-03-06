import React from 'react'
import { NavbarClient } from './Navbar.client'
import { NAV } from '@/lib/constants'

export function Navbar() {
  return (
    <NavbarClient
      brand={NAV.brand}
      links={[...NAV.links]}
      cta={NAV.cta}
    />
  )
}
