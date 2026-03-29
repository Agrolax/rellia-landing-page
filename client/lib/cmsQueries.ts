export const globalSettingsQuery = `*[_type == "globalSettings"][0]{
  footerTagline,
  supportEmail,
  linkedinUrl,
  instagramUrl,
  copyrightLine
}`

export const homePageQuery = `*[_type == "homePage"][0]{
  headlinePrefix,
  headlineAccent,
  subheadline,
  primaryCtaLabel,
  primaryCtaPath,
  secondaryCtaLabel,
  secondaryCtaPath,
  metricsHeading,
  metricsSubheading,
  metrics[]{ label, value, suffix },
  howItWorksSectionTitle,
  testimonialsTitleLead,
  testimonialsTitleAccent,
  whyFeatures[]{ iconKey, title, description },
  ctaTitle,
  ctaButtonLabel,
  ctaButtonPath,
  ctaImageUrl,
  ctaImageAlt,
  testimonials[]{
    name,
    role,
    company,
    quote,
    companyInfo,
    "imageSrc": coalesce(image.asset->url, imageSrc)
  }
}`

export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  heroLine1,
  heroLine2Mint,
  heroLine3,
  heroIntro,
  missionTitle,
  missionParagraphs,
  "missionImageSrc": coalesce(missionImage.asset->url, missionImageSrc),
  missionImageAlt,
  valuesTitle,
  valuesSubtitle,
  values[]{ iconKey, title, description },
  teamTitle,
  teamSubtitle,
  team[]{
    name,
    role,
    bio,
    "imageSrc": coalesce(image.asset->url, imageSrc)
  },
  ctaTitle,
  ctaBody,
  ctaFounderLabel,
  ctaTeamLabel
}`

export const faqPageQuery = `*[_type == "faqPage"][0]{
  badge,
  title,
  subtitle,
  items[]{ id, question, answer },
  sidebarTitle,
  sidebarBody,
  sidebarCtaLabel,
  sidebarCtaPath,
  bottomTitle,
  bottomBody,
  bottomCtaLabel,
  bottomCtaPath
}`

export const programsLandingQuery = `*[_type == "programsLandingPage"][0]{
  heroTitleLine1,
  heroTitleMint,
  heroSubtitle,
  heroPrimaryCtaLabel,
  heroSecondaryCtaLabel,
  programsSectionTitle,
  programsSectionSubtitle,
  programs[]{ title, description, imageSrc, href, buttonText },
  upcomingEvents[]{ title, dateTime, person, imageSrc, href, comingSoon },
  pastEvents[]{ title, dateTime, person, imageSrc, href, buttonText },
  ctaTitle,
  ctaBody,
  ctaButtonLabel,
  ctaButtonHref
}`

export const contactPageQuery = `*[_type == "contactPage"][0]{
  heroBadge,
  pageTitle,
  intro,
  "sideImageSrc": coalesce(sideImage.asset->url, sideImageSrc),
  sideImageAlt,
  quoteText,
  quoteAttributionName,
  quoteAttributionRole,
  successTitle,
  successBody,
  labels,
  placeholders,
  subjectPlaceholder,
  companySizePlaceholder,
  subjectOptions[]{ value, label },
  companySizeOptions[]{ value, label },
  submitLabel,
  sendingLabel
}`

export const qmsProgramQuery = `*[_type == "qmsProgramPage"][0]{
  paymentUrl,
  heroTitle,
  heroDescription,
  heroCtaLabel,
  outcomesTitle,
  outcomesIntro,
  outcomes,
  howItWorksTitle,
  howItWorksIntro,
  pillarsTitle,
  timelineTitle,
  timelineSubtitle,
  pricingBadge,
  pricingAmount,
  pricingSubAmount,
  pricingDescription,
  pricingBullets,
  bottomCtaTitle,
  bottomCtaBody,
  bottomCtaButtonLabel,
  bottomContactHref
}`

export const notFoundQuery = `*[_type == "notFoundPage"][0]{
  title,
  message,
  ctaLabel
}`

export const marketingPageBySlugQuery = `*[_type == "marketingPage" && slug.current == $slug][0]{
  title,
  subtitle,
  body
}`
