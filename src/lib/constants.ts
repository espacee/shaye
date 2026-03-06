export type SortFilterItem = {
  reverse: boolean
  slug: null | string
  title: string
}

export const defaultSort: SortFilterItem = {
  slug: null,
  reverse: false,
  title: 'Alfabetisch A-Z',
}

export const sorting: SortFilterItem[] = [
  defaultSort,
  { slug: '-createdAt', reverse: true, title: 'Nieuwste eerst' },
  { slug: 'priceInUSD', reverse: false, title: 'Prijs: laag-hoog' },
  { slug: '-priceInUSD', reverse: true, title: 'Prijs: hoog-laag' },
]

// Navigation
export const NAV = {
  brand: 'Shaye',
  links: [
    { label: 'Zo werkt het', href: '/#hoe-werkt-het' },
    { label: 'Onze keuken', href: '/#menu' },
    { label: 'Reviews', href: '/#reviews' },
  ],
  cta: 'Bestellen',
  cart: 'Winkelmandje',
} as const

// Hero
export const HERO = {
  badge: '100% Halal · Dagvers uit Vlaanderen',
  title: '500+ klanten\nvertrouwen op',
  titleHighlight: 'Shaye.',
  subtitle: 'Verse sportmaaltijden, elke dag bereid in onze keuken. Gekoeld aan je deur, klaar in 3 minuten.',
  cta1: 'Bekijk het menu',
  cta2: 'Hoe werkt het?',
  socialProof: '500+',
  socialProofText: 'klanten',
  rating: '4.8/5',
  videoLabel: 'Bekijk onze keuken',
} as const

// Menu Section
export const MENU = {
  title: 'Populair deze week',
  tabs: ['Alles', 'Afvallen', 'Spiermassa', 'Droogtrainen', 'Aankomen'],
  addToCart: '+ Toevoegen',
  added: 'Toegevoegd',
} as const

// How it Works
export const HOW_IT_WORKS = {
  overline: 'Zo werkt het',
  title: 'In 3 stappen aan tafel',
  steps: [
    { number: '1', icon: '📱', title: 'Kies & bestel', description: 'Filter op doel, selecteer je favorieten. Geen abonnement nodig.' },
    { number: '2', icon: '👨‍🍳', title: 'Wij koken vers', description: 'Dezelfde ochtend bereid met 100% halal ingrediënten.' },
    { number: '3', icon: '📦', title: 'Vanavond in huis', description: 'Gekoeld geleverd in Vlaanderen & Nederland.' },
  ],
} as const

// Reviews
export const REVIEWS_SECTION = {
  overline: 'Reviews',
  title: 'Wat klanten zeggen',
} as const

// CTA Banner
export const CTA_BANNER = {
  title: 'Klaar om te proeven?',
  subtitle: 'Code SHAYE15 = 15% korting op je eerste bestelling.',
  cta: 'Bekijk het menu',
} as const

// Cart
export const CART = {
  title: 'Winkelmandje',
  empty: 'Je mandje is leeg',
  emptySubtitle: 'Ontdek onze verse maaltijden en voeg ze toe!',
  subtotal: 'Subtotaal',
  shipping: 'Verzending',
  shippingFree: 'Gratis',
  shippingCost: '€5,95',
  freeShippingMessage: (remaining: string) => `Nog €${remaining} voor gratis verzending!`,
  checkout: 'Afrekenen',
  viewCart: 'Bekijk winkelmandje',
  continueShopping: 'Verder winkelen',
  total: 'Totaal',
  discountHint: 'Kortingscode? Voer in bij checkout.',
} as const

// Checkout
export const CHECKOUT = {
  title: 'Afrekenen',
  steps: ['Bezorging', 'Gegevens & Betaling'],
  deliveryTitle: '1. Bezorging',
  deliveryAddress: 'Bezorgadres',
  deliveryMethod: 'Bezorgmethode',
  sameDayTitle: 'Same-day delivery',
  sameDayDesc: 'Besteld vóór 10:00 = vanavond 17:00–22:00',
  chooseDayTitle: 'Kies een leverdag',
  chooseDayDesc: 'Selecteer hieronder je gewenste leverdag',
  availableDays: 'Beschikbare leverdagen:',
  personalTitle: '2. Gegevens & Betaling',
  personalDetails: 'Persoonlijke gegevens',
  paymentTitle: 'Betaalmethode',
  placeOrder: 'Bestelling plaatsen',
  modify: 'Wijzigen',
  fields: {
    street: 'Straat + huisnummer',
    postalCode: 'Postcode',
    city: 'Gemeente',
    country: 'Land',
    firstName: 'Voornaam',
    lastName: 'Achternaam',
    email: 'E-mailadres',
    phone: 'Telefoonnummer',
  },
  countries: ['België', 'Nederland'],
} as const

// Product Page
export const PRODUCT = {
  halal: '100% Halal',
  addToCart: (price: string) => `Toevoegen — €${price}`,
  addedToCart: 'Toegevoegd aan mandje!',
  ingredients: 'Ingrediënten',
  allergens: 'Allergenen',
  storage: 'Bewaring',
  related: 'Misschien ook lekker',
  macros: {
    calories: 'Calorieën',
    protein: 'Eiwit',
    carbs: 'Koolhydraten',
    fat: 'Vet',
  },
} as const

// Confirmation
export const CONFIRMATION = {
  title: 'Bedankt voor je bestelling!',
  subtitle: 'Je ontvangt een bevestigingsmail met track & trace.',
  cta: 'Terug naar de homepage',
} as const

// Footer
export const FOOTER = {
  brand: 'Shaye',
  tagline: 'Verse, halal sportmaaltijden uit Boortmeerbeek. Bereid met liefde, geleverd met zorg.',
  columns: [
    { title: 'Menu', items: ['Afvallen', 'Spiermassa', 'Droogtrainen'] },
    { title: 'Info', items: ['Zo werkt het', 'Over ons', 'FAQ'] },
    { title: 'Volg ons', items: ['Instagram', 'TikTok', 'Facebook'] },
  ],
  copyright: '© 2026 Shaye — Boortmeerbeek, Vlaanderen',
  badges: '100% Halal · Dagvers · Gekoeld · Geen abonnement',
} as const

// Day names in Dutch
export const DAY_NAMES = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'] as const
export const MONTH_NAMES = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'] as const
