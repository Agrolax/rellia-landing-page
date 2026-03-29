export type SanityPortableText = Array<{
  _type: string
  _key?: string
  [key: string]: unknown
}>

export type SanityImageAsset = {
  _type?: string
  asset?: {
    _ref?: string
    url?: string
  }
  url?: string
}

export type HomeMetric = {
  label: string
  value: number
  suffix?: string
}

export type HomeWhyFeature = {
  iconKey: string
  title: string
  description: string
}

export type HomeTestimonial = {
  name: string
  role: string
  company: string
  quote: string
  companyInfo: string
  imageSrc: string
}

export type HomePageContent = {
  headlinePrefix: string
  headlineAccent: string
  subheadline: string
  primaryCtaLabel: string
  primaryCtaPath: string
  secondaryCtaLabel: string
  secondaryCtaPath: string
  metricsHeading: string
  metricsSubheading: string
  metrics: HomeMetric[]
  whyFeatures: HomeWhyFeature[]
  ctaTitle: string
  ctaButtonLabel: string
  ctaButtonPath: string
  ctaImageUrl: string
  ctaImageAlt: string
  howItWorksSectionTitle: string
  testimonialsTitleLead: string
  testimonialsTitleAccent: string
  testimonials: HomeTestimonial[]
}

export type GlobalSettingsContent = {
  footerTagline: string
  supportEmail: string
  linkedinUrl: string
  instagramUrl: string
  copyrightLine: string
}

export type AboutValue = {
  iconKey: string
  title: string
  description: string
}

export type AboutTeamMember = {
  name: string
  role?: string
  bio?: string
  imageSrc: string
}

export type AboutPageContent = {
  heroLine1: string
  heroLine2Mint: string
  heroLine3: string
  heroIntro: string
  missionTitle: string
  missionParagraphs: string[]
  missionImageSrc: string
  missionImageAlt: string
  valuesTitle: string
  valuesSubtitle: string
  values: AboutValue[]
  teamTitle: string
  teamSubtitle: string
  team: AboutTeamMember[]
  ctaTitle: string
  ctaBody: string
  ctaFounderLabel: string
  ctaTeamLabel: string
}

export type FaqItem = {
  id: string
  question: string
  answer: string
}

export type FaqPageContent = {
  badge: string
  title: string
  subtitle: string
  items: FaqItem[]
  sidebarTitle: string
  sidebarBody: string
  sidebarCtaLabel: string
  sidebarCtaPath: string
  bottomTitle: string
  bottomBody: string
  bottomCtaLabel: string
  bottomCtaPath: string
}

export type ProgramsEventCard = {
  title: string
  dateTime: string
  person: string
  imageSrc: string
  href?: string
  comingSoon?: boolean
  buttonText?: string
}

export type ProgramsProgramCard = {
  title: string
  description: string
  imageSrc: string
  href: string
  buttonText: string
}

export type ProgramsLandingContent = {
  heroTitleLine1: string
  heroTitleMint: string
  heroSubtitle: string
  heroPrimaryCtaLabel: string
  heroSecondaryCtaLabel: string
  programsSectionTitle: string
  programsSectionSubtitle: string
  programs: ProgramsProgramCard[]
  upcomingEvents: ProgramsEventCard[]
  pastEvents: ProgramsEventCard[]
  ctaTitle: string
  ctaBody: string
  ctaButtonLabel: string
  ctaButtonHref: string
}

export type ContactSubjectOption = {
  value: string
  label: string
}

export type ContactPageContent = {
  heroBadge: string
  pageTitle: string
  intro: string
  sideImageSrc: string
  sideImageAlt: string
  quoteText: string
  quoteAttributionName: string
  quoteAttributionRole: string
  successTitle: string
  successBody: string
  labels: {
    firstName: string
    lastName: string
    email: string
    phone: string
    companyName: string
    jobTitle: string
    companySize: string
    subject: string
    message: string
  }
  placeholders: {
    firstName: string
    lastName: string
    email: string
    phone: string
    companyName: string
    jobTitle: string
    message: string
  }
  subjectPlaceholder: string
  companySizePlaceholder: string
  subjectOptions: ContactSubjectOption[]
  companySizeOptions: ContactSubjectOption[]
  submitLabel: string
  sendingLabel: string
}

export type QmsProgramContent = {
  paymentUrl: string
  heroTitle: string
  heroDescription: string
  heroCtaLabel: string
  outcomesTitle: string
  outcomesIntro: string
  outcomes: string[]
  howItWorksTitle: string
  howItWorksIntro: string
  pillarsTitle: string
  timelineTitle: string
  timelineSubtitle: string
  pricingBadge: string
  pricingAmount: string
  pricingSubAmount: string
  pricingDescription: string
  pricingBullets: string[]
  bottomCtaTitle: string
  bottomCtaBody: string
  bottomCtaButtonLabel: string
  bottomContactHref: string
}

export type MarketingPageContent = {
  title: string
  subtitle: string
  body?: SanityPortableText | null
}

export type NotFoundContent = {
  title: string
  message: string
  ctaLabel: string
}
