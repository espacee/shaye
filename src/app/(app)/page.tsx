import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Badge } from '@/components/shaye/Badge'
import { SocialProof } from '@/components/shaye/SocialProof'
import { StatsBar } from '@/components/shaye/StatsBar'
import { SectionTitle } from '@/components/shaye/SectionTitle'
import { StepCard } from '@/components/shaye/StepCard'
import { ReviewCard } from '@/components/shaye/ReviewCard'
import { CtaBanner } from '@/components/shaye/CtaBanner'
import { HomepageClient } from './HomepageClient'
import { HOW_IT_WORKS, REVIEWS_SECTION, CTA_BANNER, HERO } from '@/lib/constants'
import Link from 'next/link'

const defaultStats = [
  { value: '500+', label: 'Klanten' },
  { value: '4.8/5', label: 'Google Reviews' },
  { value: '15.000+', label: 'Maaltijden geleverd' },
  { value: '<3 min', label: 'Klaar om te eten' },
]

const defaultReviews = [
  { name: 'Yasmine B.', location: 'Antwerpen', text: 'Eindelijk meal prep die echt lekker smaakt. En 100% halal!', stars: 5 },
  { name: 'Mehdi A.', location: 'Brussel', text: 'Perfecte macro\'s voor mijn cut. Kip shawarma is ongelooflijk.', stars: 5 },
  { name: 'Sophie V.', location: 'Gent', text: 'Mijn man en ik bestellen elke week. Scheelt ons zoveel tijd!', stars: 5 },
  { name: 'Karim D.', location: 'Mechelen', text: 'Betere smaak dan de concurrentie, en de macro\'s kloppen altijd.', stars: 5 },
]

export default async function HomePage() {
  let meals: any[] = []
  let stats = defaultStats
  let reviews = defaultReviews

  try {
    const payload = await getPayload({ config: configPromise })

    const productsResult = await payload.find({
      collection: 'products',
      limit: 50,
      sort: 'sort_order',
      where: {
        _status: { equals: 'published' },
      },
    })
    meals = productsResult.docs.map((doc: any) => ({
      id: doc.id,
      slug: doc.slug,
      title: doc.title,
      emoji: doc.emoji,
      tag: doc.tag,
      calories: doc.calories,
      protein: doc.protein,
      carbs: doc.carbs,
      fat: doc.fat,
      priceInUSD: doc.priceInUSD,
    }))

    try {
      const siteSettings = await payload.findGlobal({ slug: 'site-settings' })
      if (siteSettings?.stats && siteSettings.stats.length > 0) {
        stats = siteSettings.stats as typeof defaultStats
      }
    } catch {}

    try {
      const reviewsResult = await payload.find({
        collection: 'reviews',
        where: { featured: { equals: true } },
        limit: 4,
      })
      if (reviewsResult.docs.length > 0) {
        reviews = reviewsResult.docs.map((r: any) => ({
          name: r.name,
          location: r.location,
          text: r.text,
          stars: r.stars,
        }))
      }
    } catch {}
  } catch {}

  return (
    <div className="bg-background">
      {/* HERO */}
      <div className="px-4 sm:px-9 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
        <div>
          <Badge>&#9770; {HERO.badge}</Badge>
          <h1 className="font-heading font-bold text-3xl sm:text-[44px] leading-[1.1] mt-5 mb-4">
            {HERO.title.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </React.Fragment>
            ))}{' '}
            <span className="text-primary">{HERO.titleHighlight}</span>
          </h1>
          <p className="text-[15px] leading-[1.75] text-sub mb-7">{HERO.subtitle}</p>
          <div className="flex flex-wrap gap-3 mb-5">
            <Link
              href="/#menu"
              className="px-7 py-3.5 bg-primary text-white rounded-pill text-[15px] font-semibold hover:bg-primary/90 transition-colors"
            >
              {HERO.cta1} &darr;
            </Link>
            <Link
              href="/#hoe-werkt-het"
              className="px-7 py-3.5 border-[1.5px] border-primary/25 text-primary rounded-pill text-[15px] font-medium hover:bg-accent2 transition-colors"
            >
              {HERO.cta2}
            </Link>
          </div>
          <SocialProof />
        </div>

        {/* Hero Video */}
        <div className="rounded-[20px] overflow-hidden aspect-[9/14] max-h-[480px] relative border border-border shadow-[0_8px_40px_rgba(148,64,88,0.10)]">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="/shaye-hero-video.mp4"
          />
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-foreground/60 to-transparent">
            <div className="flex gap-2">
              {['100% Halal', 'Dagvers', 'Boortmeerbeek'].map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-white/20 rounded-xl text-[11px] text-white font-semibold"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute top-3.5 right-3.5 bg-white/[0.92] rounded-lg px-3 py-1.5 flex items-center gap-1">
            <span className="text-[#F5A623] text-xs">&#9733;</span>
            <span className="text-xs font-bold">{HERO.rating}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-4 sm:mx-9 mb-9">
        <StatsBar stats={stats} />
      </div>

      {/* Menu */}
      <HomepageClient meals={meals} />

      {/* How It Works */}
      <section id="hoe-werkt-het" className="px-4 sm:px-9 pb-12">
        <SectionTitle overline={HOW_IT_WORKS.overline} title={HOW_IT_WORKS.title} centered />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {HOW_IT_WORKS.steps.map((step) => (
            <StepCard
              key={step.number}
              number={step.number}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="px-4 sm:px-9 pb-12">
        <SectionTitle overline={REVIEWS_SECTION.overline} title={REVIEWS_SECTION.title} centered />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {reviews.map((review) => (
            <ReviewCard
              key={review.name}
              name={review.name}
              location={review.location}
              text={review.text}
              stars={review.stars}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <CtaBanner
        title={CTA_BANNER.title}
        subtitle={CTA_BANNER.subtitle}
        buttonText={CTA_BANNER.cta}
      />
    </div>
  )
}

export const metadata = {
  title: 'Shaye \u2014 Halal Meal Prep',
  description: 'Verse, halal sportmaaltijden uit Boortmeerbeek. Bereid met liefde, geleverd met zorg.',
}
