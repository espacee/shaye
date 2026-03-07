import React from 'react'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ProductDetailClient } from './ProductDetail.client'
import { PRODUCT } from '@/lib/constants'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const product = result.docs[0] as any
  if (!product) return notFound()

  // Fetch related products by same tag
  let related: any[] = []
  try {
    const relatedResult = await payload.find({
      collection: 'products',
      where: {
        and: [
          { id: { not_equals: product.id } },
          ...(product.tag ? [{ tag: { equals: product.tag } }] : []),
        ],
      },
      limit: 3,
    })
    related = relatedResult.docs
  } catch {}

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <div className="px-4 sm:px-9 py-4 text-[13px] text-sub">
        <Link href="/" className="text-primary hover:underline">Home</Link>
        {' / '}
        <Link href="/#menu" className="text-primary hover:underline">Menu</Link>
        {' / '}
        <span>{product.title}</span>
      </div>

      {/* Product detail */}
      <div className="px-4 sm:px-9 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Image */}
        <div className="bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] rounded-[20px] aspect-square flex items-center justify-center text-[120px] relative overflow-hidden">
          {product.gallery?.[0]?.image?.url ? (
            <Image
              src={product.gallery[0].image.url}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            product.emoji || '\uD83C\uDF7D\uFE0F'
          )}
          {product.tag && (
            <div className="absolute top-4 left-4 px-3.5 py-1 bg-white/[0.92] rounded-lg text-xs font-bold text-primary uppercase z-10">
              {product.tag}
            </div>
          )}
        </div>

        {/* Info */}
        <ProductDetailClient product={{
          id: product.id,
          title: product.title,
          emoji: product.emoji,
          tag: product.tag,
          priceInUSD: product.priceInUSD,
          calories: product.calories,
          protein: product.protein,
          carbs: product.carbs,
          fat: product.fat,
          ingredients: product.ingredients,
          allergens: product.allergens,
          storage_instructions: product.storage_instructions,
          halal: product.halal,
        }} />
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="px-4 sm:px-9 pb-12">
          <h2 className="font-heading text-[22px] font-bold mb-4">{PRODUCT.related}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((m: any) => (
              <div key={m.id} className="bg-card border border-border rounded-card overflow-hidden cursor-pointer">
                <Link href={`/products/${m.slug}`}>
                  <div className="h-[100px] bg-gradient-to-br from-[var(--gradient-from)] to-[var(--gradient-to)] flex items-center justify-center text-4xl relative overflow-hidden">
                    {m.gallery?.[0]?.image?.url ? (
                      <Image
                        src={m.gallery[0].image.url}
                        alt={m.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      m.emoji || '\uD83C\uDF7D\uFE0F'
                    )}
                  </div>
                  <div className="p-3.5">
                    <div className="font-heading font-bold text-sm mb-1">{m.title}</div>
                    <div className="text-[11px] text-sub mb-2">{m.calories || 0} kcal &middot; {m.protein || 0}g eiwit</div>
                    <div className="font-heading font-bold text-primary">&euro;{((m.priceInUSD || 0)).toFixed(2).replace('.', ',')}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'products',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const product = result.docs[0]
    if (product) {
      return {
        title: `${product.title} | Shaye`,
        description: `${product.title} - Halal meal prep van Shaye`,
      }
    }
  } catch {}
  return { title: 'Product | Shaye' }
}
