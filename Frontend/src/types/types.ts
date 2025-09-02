export type Feature = {
  title: string
  description: string
  icon?: React.ReactNode
  ctaLabel?: string
  ctaHref?: string
}

export type Testimonial = {
  name: string
  handle?: string
  quote: string
  avatar?: string
  role?: string
}

export type Partner = { name: string; logo: string; href?: string }

export type ShowcaseTab = {
  key: string
  label: string
  image?: string
  code?: string
  caption?: string
}
