import type { GlobalConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
    update: adminOnly,
  },
  fields: [
    {
      name: 'promo_bar_text',
      type: 'text',
      defaultValue: '15% korting op je eerste bestelling met code SHAYE15 \u00B7 Gratis levering vanaf \u20AC35',
    },
    {
      name: 'promo_bar_active',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'hero_title',
      type: 'text',
      defaultValue: '500+ klanten vertrouwen op Shaye.',
    },
    {
      name: 'hero_subtitle',
      type: 'textarea',
      defaultValue: 'Verse sportmaaltijden, elke dag bereid in onze keuken. Gekoeld aan je deur, klaar in 3 minuten.',
    },
    {
      name: 'discount_code',
      type: 'text',
      defaultValue: 'SHAYE15',
    },
    {
      name: 'discount_percentage',
      type: 'number',
      defaultValue: 15,
    },
    {
      name: 'free_shipping_threshold',
      type: 'number',
      defaultValue: 35,
    },
    {
      name: 'shipping_cost',
      type: 'number',
      defaultValue: 5.95,
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
