import type {
  AboutPageContent,
  ContactPageContent,
  ContactSubjectOption,
  FaqPageContent,
  GlobalSettingsContent,
  HomePageContent,
  MarketingPageContent,
  NotFoundContent,
  ProgramsLandingContent,
  QmsProgramContent,
} from "./types"

/** Drop nullish values so `{ ...defaults, ...partial }` cannot wipe strings with CMS nulls */
const omitNullish = <T extends Record<string, unknown>>(obj: T): Partial<T> =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v != null)) as Partial<T>

const compactList = <T>(arr: T[] | null | undefined): NonNullable<T>[] =>
  (arr ?? []).filter((x): x is NonNullable<T> => x != null)

const isSubjectOption = (o: unknown): o is ContactSubjectOption =>
  typeof o === "object" &&
  o != null &&
  "value" in o &&
  "label" in o &&
  typeof (o as ContactSubjectOption).value === "string" &&
  typeof (o as ContactSubjectOption).label === "string"

export const DEFAULT_GLOBAL_SETTINGS: GlobalSettingsContent = {
  footerTagline:
    "Rellia connects promising digital health founders with industry experts, clinicians, and engaged investors.",
  supportEmail: "hello@relliahealth.com",
  linkedinUrl: "https://www.linkedin.com/company/relliahealth",
  instagramUrl: "https://www.instagram.com/relliahealth/",
  copyrightLine: "Rellia Health. All rights reserved.",
}

export const DEFAULT_HOME_PAGE: HomePageContent = {
  headlinePrefix: "You are the future of",
  headlineAccent: "healthcare.",
  subheadline: "The expertise you need. The support you deserve.",
  primaryCtaLabel: "Get Involved Now",
  primaryCtaPath: "/network",
  secondaryCtaLabel: "See our Programs",
  secondaryCtaPath: "/programs",
  metricsHeading: "The right people make all the difference.",
  metricsSubheading:
    "Here is a look at the Rellia network—where health tech founders are connected with people who understand exactly what you're up against.",
  metrics: [
    { label: "Members in the Rellia community", value: 291 },
    { label: "Health tech startups", value: 81 },
    { label: "Countries around the world", value: 11 },
  ],
  howItWorksSectionTitle: "How does it work?",
  whyFeatures: [
    {
      iconKey: "target",
      title: "The Outcomes",
      description:
        "Avoid mistakes on your path to market and easily achieve your milestones through our customized programs",
    },
    {
      iconKey: "userRound",
      title: "The Advisors",
      description:
        "Access 1:1 guidance from experts with years of experience scaling health tech businesses (consulting that would cost >$300/hr anywhere else).",
    },
    {
      iconKey: "bookOpen",
      title: "The Resources",
      description:
        "Apply tangible tools, hands-on workshops, and proven templates to move your business forward right now",
    },
    {
      iconKey: "users",
      title: "The Community",
      description:
        "Beta test your ideas, find an accountability buddy, cheer each other on, share your deepest worries. Connect with fellow health tech founders who have been through it before.",
    },
    {
      iconKey: "circleDollarSign",
      title: "The Investors",
      description:
        "Strengthen your pitch and access health tech investors through a network that vouches for you.",
    },
    {
      iconKey: "stethoscope",
      title: "The Clinicians",
      description:
        "Design the right product from the start by developing alongside healthcare practitioners",
    },
  ],
  ctaTitle: "Are you the next Rellia Health success story?",
  ctaButtonLabel: "Apply to Join Now",
  ctaButtonPath: "/network",
  ctaImageUrl:
    "https://api.builder.io/api/v1/image/assets/TEMP/8f739cef8f0df3b598f7661fb2212eab44955a7a?width=1200",
  ctaImageAlt: "Man speaking at conference",
  testimonialsTitleLead: "Trusted by the next generation of",
  testimonialsTitleAccent: "healthcare leaders",
  testimonials: [
    {
      name: "Dr. Sahil Khan",
      role: "Founder",
      company: "NovusTex Corp",
      quote:
        "Rellia has been nothing short of exceptional—a truly dynamic incubator where early ventures are not only given space to grow, but are actively empowered to connect, refine, pitch, and evolve.",
      companyInfo:
        "A rehabilitation-focused company bringing novel performance textiles and assistive solutions to support mobility, reduce injury risk, and enhance comfort during recovery for patients with musculoskeletal and neurological conditions.",
      imageSrc: "/images/sahilkhan-testimonials.jpeg",
    },
    {
      name: "Dhandre Weekes",
      role: "CEO",
      company: "CareLog",
      quote:
        "Rellia is full of driven founders and healthcare innovators, which is actually where I connected with my advisory council members.",
      companyInfo:
        "An elder care platform to help assisted living, memory care, and specialized residential homes manage daily care, reporting, and family communication.",
      imageSrc: "/images/dhandreW-testimonials.jpeg",
    },
    {
      name: "Melissa Williams",
      role: "Founder & Chief Orchestrator",
      company: "HorminaCare",
      quote:
        "Being part of this group has been a great experience. Rellia has created a supportive space for health tech founders, with valuable resources and opportunities to connect.",
      companyInfo:
        "HorminaCare provides virtual access to expert medical professionals for science-backed treatment for hormone-related conditions such as PCOS, adult acne, PMDD, and beyond.",
      imageSrc: "/images/melissaW-testimonials.jpeg",
    },
    {
      name: "Irene Saliandra",
      role: "CEO",
      company: "Digital Flow",
      quote:
        "I've thoroughly enjoyed being part of the Rellia community—not only has it opened doors to expand my network, but also given me opportunities to test my ideas with like minded folks.",
      companyInfo:
        "Digital Flow empowers entrepreneurs and small business owners through their digital transformation journey.",
      imageSrc: "/images/ireneS-testimonials.jpeg",
    },
    {
      name: "Michelle Risinger",
      role: "CEO",
      company: "Restore Enterprises Corporation",
      quote:
        "I've found the Rellia community full of smart, inclusive and generous members eager to provide support, connections and ideas.",
      companyInfo:
        "Restore is an API that optimizes daily performance using chronobiology.",
      imageSrc: "/images/michelleR-testimonials.png",
    },
    {
      name: "Rafael Rodeiro",
      role: "CEO",
      company: "Roster",
      quote:
        "In a matter of days, Rellia was able to connect me with exactly the right people. Specific, high-quality introductions that would have taken me weeks to find on my own.",
      companyInfo:
        "Roster is the first AI-native employee giving platform built specifically for health systems.",
      imageSrc: "/images/rafaelR-testimonials.jpeg",
    },
    {
      name: "Nick Sabamehr",
      role: "CEO",
      company: "MA EdTech Solutions",
      quote:
        "Rellia has been a big support in our journey from the first conversation, and we have built our strongest relationships through Rellia's support.",
      companyInfo:
        "MA Edtech Solutions helps immigrant children and their parents experience a better life in their country of residence.",
      imageSrc: "/images/nickS-testimonials.jpeg",
    },
    {
      name: "Rooaa Shanshal",
      role: "Co-Founder",
      company: "Power of Play",
      quote:
        "Being part of Rellia has been so incredibly valuable. Since joining, we've made real progress on building our QMS which is something that previously felt overwhelming.",
      companyInfo: "Power of Play takes a play-based approach to pediatric rehabilitation",
      imageSrc: "/images/rooaaS-testimonials.jpeg",
    },
    {
      name: "Rebecca Lyons",
      role: "CEO",
      company: "HerSay",
      quote:
        "Rellia has been a great resource for our team as we have navigated early stage validation and finding market fit.",
      companyInfo:
        "HerSay is an AI-powered doctor visit companion designed to help women feel seen, heard and prepared while navigating the healthcare system.",
      imageSrc: "/images/rebeccaL-testimonials.jpeg",
    },
  ],
}

export const DEFAULT_ABOUT_PAGE: AboutPageContent = {
  heroLine1: "Empowering the",
  heroLine2Mint: "next generation",
  heroLine3: "of health tech.",
  heroIntro:
    "Rellia Health is a virtual incubator dedicated to accelerating the commercialization of digital health solutions that matter.",
  missionTitle: "Our Mission",
  missionParagraphs: [
    "The healthcare industry is notoriously difficult to navigate. Brilliant founders often struggle not because their ideas lack merit, but because they are trying to figure it out without the right people around them.",
    "At Rellia, we meet health tech founders where they are, surrounding them with deep industry expertise and individualized support so that the complexities of healthcare innovation feel less overwhelming. Because when founders have the right people in their corner, meaningful innovation actually reaches the patients who need it.",
  ],
  missionImageSrc: "/images/TabletMeeting.png",
  missionImageAlt: "Team collaborating over a tablet in a meeting",
  valuesTitle: "Values",
  valuesSubtitle: "These principles guide every partnership, program, and decision we make.",
  values: [
    {
      iconKey: "heart",
      title: "Generous",
      description:
        "Building in health tech is hard enough. Everyone here genuinely wants to see you succeed, and that makes all the difference.",
    },
    {
      iconKey: "stethoscope",
      title: "Healthcare-Specific",
      description:
        "Generic startup guidance does not work in healthcare. Everything we offer is built around the specific realities of health tech commercialization.",
    },
    {
      iconKey: "globe",
      title: "Globally Connected",
      description:
        "Great ideas and great mentors are not concentrated in one city. Rellia is a virtual community, and that breadth makes it stronger.",
    },
    {
      iconKey: "zap",
      title: "Radically Practical",
      description:
        "You don't need more learning, you need more things accomplished. We focus on helping you achieve the outcomes that actually move your business forward.",
    },
  ],
  teamTitle: "Meet The Team",
  teamSubtitle: "Health tech insiders who saw a better way, so they built it. Just like you did.",
  team: [
    {
      name: "Megan Kane",
      role: "Executive Director, Co-Founder",
      bio: "Regulatory and Quality Management executive specializing in global market entry strategy and FDA/Health Canada submissions for SaMD and digital health companies.",
      imageSrc: "/images/megankane-team.jpeg",
    },
    {
      name: "Deena Al-Sammak",
      role: "Program Manager",
      imageSrc: "/images/deenasammak-team.jpeg",
    },
    { name: "Priyanka", imageSrc: "/images/nopicture-female.jpg" },
    { name: "Khali", imageSrc: "/images/nopicture-male.jpg" },
    { name: "Kelly", imageSrc: "/images/nopicture-female.jpg" },
  ],
  ctaTitle: "You're in the right place.",
  ctaBody:
    "If you're a founder who wants to do this right, we have the network and expertise to make it happen.",
  ctaFounderLabel: "Apply to join as a founder",
  ctaTeamLabel: "Contact us to join the Rellia team",
}

export const DEFAULT_FAQ_PAGE: FaqPageContent = {
  badge: "Frequently Asked Questions",
  title: "Everything you need to know about Rellia",
  subtitle: "We've collected the most common questions our members ask before joining.",
  items: [
    {
      id: "products",
      question: "What kind of products does Rellia work with?",
      answer:
        "We specialize in healthcare-focused innovations with a software component - digital health, health tech, medtech, whatever you call it. Whether it's a connected medical device, a diagnostic platform, a digital therapeutic, or a general wellness app, our programs are built to help you succeed specifically in the complex healthcare technology market.",
    },
    {
      id: "funding",
      question: "Does my company need funding or revenue to join?",
      answer:
        "We work with companies at every stage of development, from pre-seed to Series A, with customized programs to meet you where you are. As long as you have a clear idea of the problem you're solving and a vision for the solution, we can help.",
    },
    {
      id: "cost",
      question: "What is the cost to join?",
      answer:
        "Rellia operates on a monthly membership model that gives you full access to our advisors, community, and a core set of included programs. Some specialized programs carry an additional cost, and we are always transparent about what is included before you commit to anything.",
    },
    {
      id: "equity",
      question: "Do founders need to give up equity to join?",
      answer:
        "No. We believe founders should keep control of their companies. Once you're a member, you'll have access to the expertise and resources you need without giving up a stake in your business.",
    },
    {
      id: "country",
      question: "Do I need to be based in a specific country to join?",
      answer:
        "No, Relia Health is a global network with members across the world. We work with the best of the best, regardless of where they happen to live.",
    },
    {
      id: "after-join",
      question: "What happens once I join?",
      answer:
        "Once your application is approved, you will receive an invitation to join our community. From there, you can reach out to our team directly and we will connect you with the specific advisors, programs, clinicians, or fellow founders that match what you are working on.",
    },
    {
      id: "programs-without-membership",
      question: "Can I join a program without becoming a member?",
      answer:
        "Yes, most Rellia programs are available to non-members as well. If you decide to become a member, you will get discounted access to programs alongside everything else membership includes.",
    },
    {
      id: "advisor-time",
      question: "How much time do advisors commit to?",
      answer:
        "Advisors typically volunteer a few hours a month to high-impact conversations with founders who are building in areas they're passionate about.",
    },
    {
      id: "investors",
      question: "What does Rellia Health offer to investors?",
      answer:
        "Investors get curated access to high-potential startups, due diligence support, and the opportunity to invest alongside a network of experienced partners in healthcare and technology.",
    },
    {
      id: "industry-partner",
      question: "I'm an industry partner - how can I collaborate with Rellia Health?",
      answer:
        "Industry partners can engage with our founder community through sponsored programs or events, mentorship, and founder referrals.",
    },
    {
      id: "apply",
      question: "How do I apply or express interest in joining?",
      answer:
        "You can apply through our website by completing the short interest form. Our team will follow up with next steps.",
    },
  ],
  sidebarTitle: "Still have questions?",
  sidebarBody:
    "Learn more about how Rellia works and explore the different pathways available for founders, advisors, investors, and industry partners.",
  sidebarCtaLabel: "Explore the Network",
  sidebarCtaPath: "/network",
  bottomTitle: "Every startup is different",
  bottomBody:
    "Tell us more about where you are today and where you want to be in the next 12–18 months. We'll share how Rellia can help accelerate that path, or recommend a better fit if we're not it.",
  bottomCtaLabel: "Get in Touch",
  bottomCtaPath: "/contact",
}

export const DEFAULT_PROGRAMS_LANDING: ProgramsLandingContent = {
  heroTitleLine1: "Less theory.",
  heroTitleMint: "More progress.",
  heroSubtitle:
    "Targeted programs and live events designed to help you accomplish your next milestone, not just learn about it.",
  heroPrimaryCtaLabel: "View Programs",
  heroSecondaryCtaLabel: "View Events",
  programsSectionTitle: "Programming that fits your startup",
  programsSectionSubtitle:
    "Every program is built around a single, focused outcome. Spend your time on exactly what you need right now, and leave the rest for later.",
  programs: [
    {
      title: "Build Your Quality Management System",
      description:
        "Build a lean, scalable QMS to comply with ISO 13485, MDSAP, FDA, and MDR requirements, with personalized guidance from quality experts every step of the way",
      imageSrc: "/images/QMS-programs.webp",
      href: "/programs/qms",
      buttonText: "Get Started",
    },
  ],
  upcomingEvents: [
    {
      title: "Health System Adoption for Startups",
      dateTime: "April 9th at 2PM",
      person: "Rellia Health",
      imageSrc: "/images/banner-whitelogo.png",
      href: "https://luma.com/ao1g8a7h",
    },
    {
      title: "Leadership Mindset for Health tech founders",
      dateTime: "6 may at 12pm",
      person: "Rellia Health",
      imageSrc: "/images/leadershipMindset-events.webp",
      comingSoon: true,
    },
  ],
  pastEvents: [
    {
      title: "Why Healthcare Keeps Saying No to Your AI (And How to Fix It)",
      dateTime: "Thursday, March 12 — 1:00 PM EDT",
      person: "Brenton Hill | Coalition for Health AI",
      imageSrc: "/images/banner-whitelogo.png",
      href: "https://luma.com/1vx5stu2",
      buttonText: "View Event",
    },
    {
      title: "Ask a QMS Expert",
      dateTime: "Thursday, February 19 — 12:00 PM EST",
      person: "Rellia Health",
      imageSrc: "/images/banner-whitelogo.png",
      href: "https://luma.com/w61qj0g5",
      buttonText: "View Event",
    },
    {
      title: "Set Your Stage",
      dateTime: "Thursday, December 4, 2025 — 12:00 PM EST",
      person: "Alexis Orchard | Rellia Health",
      imageSrc: "/images/banner-darklogo.png",
      href: "https://luma.com/5s736thc",
      buttonText: "View Event",
    },
    {
      title: "Clinician Connect: Women's Health",
      dateTime: "Thursday, November 20, 2025 — 12:00 PM EST",
      person: "Rellia Health",
      imageSrc: "/images/banner-darklogo.png",
      href: "https://luma.com/k6fbogr8",
      buttonText: "View Event",
    },
  ],
  ctaTitle: "Want the full experience?",
  ctaBody:
    "Join the Rellia community to get access to all programs, events, mentors, and resources.",
  ctaButtonLabel: "Get Involved",
  ctaButtonHref: "mailto:hello@relliahealth.com?subject=Join%20Rellia",
}

export const DEFAULT_CONTACT_PAGE: ContactPageContent = {
  heroBadge: "Contact",
  pageTitle: "Send Us A Message",
  intro:
    "Have questions or want to explore opportunities with Rellia Health?\n\nWe’re here to listen, support, and collaborate. Drop us a message!",
  sideImageSrc: "/images/hero-contact.png",
  sideImageAlt: "Rellia contact — team and collaboration",
  quoteText:
    "Lorem ipsum dolor sit amet consectetur. Eu tellus cursus sapien elementum.",
  quoteAttributionName: "Megan Kane",
  quoteAttributionRole: "Founder & CEO",
  successTitle: "Message sent",
  successBody: "Thanks for reaching out. We'll be in touch shortly.",
  labels: {
    firstName: "First Name",
    lastName: "Last Name",
    email: "E-mail Address",
    phone: "Phone",
    companyName: "Company Name",
    jobTitle: "Job Title",
    companySize: "Company Size",
    subject: "Subject",
    message: "Your Message",
  },
  placeholders: {
    firstName: "Jane",
    lastName: "Doe",
    email: "you@company.com",
    phone: "+1 (555) 000-0000",
    companyName: "Your company",
    jobTitle: "Your role",
    message: "Tell us what you're looking for…",
  },
  subjectPlaceholder: "Please Select",
  companySizePlaceholder: "Please Select",
  subjectOptions: [
    { value: "general", label: "General inquiry" },
    { value: "programs", label: "Programs" },
    { value: "partnerships", label: "Partnerships" },
    { value: "careers", label: "Careers" },
    { value: "media", label: "Media" },
    { value: "other", label: "Other" },
  ],
  companySizeOptions: [
    { value: "1-10", label: "1–10" },
    { value: "11-50", label: "11–50" },
    { value: "51-200", label: "51–200" },
    { value: "201-500", label: "201–500" },
    { value: "501+", label: "501+" },
    { value: "unsure", label: "Prefer not to say" },
  ],
  submitLabel: "Submit",
  sendingLabel: "Sending…",
}

export const DEFAULT_QMS_PROGRAM: QmsProgramContent = {
  paymentUrl: "https://forms.fillout.com/t/1GPWpbBbWcus",
  heroTitle: "Build Your QMS",
  heroDescription:
    "A simplified, mentor-led program that helps medical device founders build an audit-ready Quality Management System - without needing a background in regulatory affairs",
  heroCtaLabel: "Get Started",
  outcomesTitle: "Program Outcomes",
  outcomesIntro:
    "By the end of this program, you will have a complete quality management system. A well-designed QMS enables your company to:",
  outcomes: [
    "A compliant Quality Management System tailored to your product classification",
    "Pass regulator audits and inspections",
    "Demonstrate a critical early milestone to investors",
    "Execute business operations more efficiently",
    "Gain customer trust and competitive advantage",
  ],
  howItWorksTitle: "How It Works",
  howItWorksIntro:
    "Each week, you will receive the following guidance to ensure your success throughout the program.",
  pillarsTitle: "Program Pillars",
  timelineTitle: "Program Timeline & Details",
  timelineSubtitle: "A structured journey through the key requirements for a successful QMS",
  pricingBadge: "Monthly subscription",
  pricingAmount: "$2000",
  pricingSubAmount: ".00",
  pricingDescription:
    "Join the only program designed to help you implement an audit-ready Quality Management System without the headaches.",
  pricingBullets: [
    "Pause or cancel at any time.",
    "Weekly consultations",
    "Instructional content",
    "Frameworks & templates",
  ],
  bottomCtaTitle: "Let's Build Your QMS",
  bottomCtaBody:
    "Still have questions or want to learn more about the program? Reach out at any time to speak with us directly.",
  bottomCtaButtonLabel: "Contact",
  bottomContactHref: "/contact",
}

export const DEFAULT_NOT_FOUND: NotFoundContent = {
  title: "Page not found",
  message: "The page you're looking for doesn't exist or has been moved.",
  ctaLabel: "Back to home",
}

export const DEFAULT_MARKETING_PLACEHOLDER: MarketingPageContent = {
  title: "Coming soon",
  subtitle: "This page is currently under development. Stay tuned for the full Rellia Health experience!",
}

export function mergeGlobalSettings(
  partial: Partial<GlobalSettingsContent> | null | undefined,
): GlobalSettingsContent {
  const p = omitNullish((partial ?? {}) as Record<string, unknown>) as Partial<GlobalSettingsContent>
  return { ...DEFAULT_GLOBAL_SETTINGS, ...p }
}

export function mergeHomePage(partial: Partial<HomePageContent> | null | undefined): HomePageContent {
  const p = omitNullish((partial ?? {}) as Record<string, unknown>) as Partial<HomePageContent>
  const base = { ...DEFAULT_HOME_PAGE, ...p }
  const metrics = compactList(p.metrics)
  base.metrics = metrics.length > 0 ? metrics : DEFAULT_HOME_PAGE.metrics
  const whyFeatures = compactList(p.whyFeatures)
  base.whyFeatures = whyFeatures.length > 0 ? whyFeatures : DEFAULT_HOME_PAGE.whyFeatures
  const testimonials = compactList(p.testimonials)
  base.testimonials = testimonials.length > 0 ? testimonials : DEFAULT_HOME_PAGE.testimonials
  return base
}

export function mergeAboutPage(partial: Partial<AboutPageContent> | null | undefined): AboutPageContent {
  const p = omitNullish((partial ?? {}) as Record<string, unknown>) as Partial<AboutPageContent>
  const base = { ...DEFAULT_ABOUT_PAGE, ...p }
  const missionParagraphs = compactList(p.missionParagraphs)
  base.missionParagraphs =
    missionParagraphs.length > 0 ? missionParagraphs : DEFAULT_ABOUT_PAGE.missionParagraphs
  const values = compactList(p.values)
  base.values = values.length > 0 ? values : DEFAULT_ABOUT_PAGE.values
  const team = compactList(p.team)
  base.team = team.length > 0 ? team : DEFAULT_ABOUT_PAGE.team
  return base
}

export function mergeFaqPage(partial: Partial<FaqPageContent> | null | undefined): FaqPageContent {
  const p = omitNullish((partial ?? {}) as Record<string, unknown>) as Partial<FaqPageContent>
  const base = { ...DEFAULT_FAQ_PAGE, ...p }
  const items = compactList(p.items)
  base.items = items.length > 0 ? items : DEFAULT_FAQ_PAGE.items
  return base
}

export function mergeProgramsLanding(
  partial: Partial<ProgramsLandingContent> | null | undefined,
): ProgramsLandingContent {
  const p = omitNullish((partial ?? {}) as Record<string, unknown>) as Partial<ProgramsLandingContent>
  const base = { ...DEFAULT_PROGRAMS_LANDING, ...p }
  const programs = compactList(p.programs)
  base.programs = programs.length > 0 ? programs : DEFAULT_PROGRAMS_LANDING.programs
  const upcomingEvents = compactList(p.upcomingEvents)
  base.upcomingEvents =
    upcomingEvents.length > 0 ? upcomingEvents : DEFAULT_PROGRAMS_LANDING.upcomingEvents
  const pastEvents = compactList(p.pastEvents)
  base.pastEvents = pastEvents.length > 0 ? pastEvents : DEFAULT_PROGRAMS_LANDING.pastEvents
  return base
}

export function mergeContactPage(
  partial: Partial<ContactPageContent> | null | undefined,
): ContactPageContent {
  const p = omitNullish((partial ?? {}) as Record<string, unknown>) as Partial<ContactPageContent>
  const labelOverrides = omitNullish((p.labels ?? {}) as Record<string, unknown>) as Partial<
    ContactPageContent["labels"]
  >
  const placeholderOverrides = omitNullish((p.placeholders ?? {}) as Record<string, unknown>) as Partial<
    ContactPageContent["placeholders"]
  >
  const base: ContactPageContent = {
    ...DEFAULT_CONTACT_PAGE,
    ...p,
    labels: { ...DEFAULT_CONTACT_PAGE.labels, ...labelOverrides },
    placeholders: { ...DEFAULT_CONTACT_PAGE.placeholders, ...placeholderOverrides },
  }
  const subjectOptions = compactList(p.subjectOptions).filter(isSubjectOption)
  base.subjectOptions =
    subjectOptions.length > 0 ? subjectOptions : DEFAULT_CONTACT_PAGE.subjectOptions
  const companySizeOptions = compactList(p.companySizeOptions).filter(isSubjectOption)
  base.companySizeOptions =
    companySizeOptions.length > 0 ? companySizeOptions : DEFAULT_CONTACT_PAGE.companySizeOptions
  if (!base.quoteText?.trim()) {
    base.quoteText = DEFAULT_CONTACT_PAGE.quoteText
  }
  if (!base.quoteAttributionName?.trim()) {
    base.quoteAttributionName = DEFAULT_CONTACT_PAGE.quoteAttributionName
  }
  if (!base.quoteAttributionRole?.trim()) {
    base.quoteAttributionRole = DEFAULT_CONTACT_PAGE.quoteAttributionRole
  }
  if (!base.companySizePlaceholder?.trim()) {
    base.companySizePlaceholder = DEFAULT_CONTACT_PAGE.companySizePlaceholder
  }
  if (!base.heroBadge?.trim()) {
    base.heroBadge = DEFAULT_CONTACT_PAGE.heroBadge
  }
  if (!base.sideImageSrc?.trim()) {
    base.sideImageSrc = DEFAULT_CONTACT_PAGE.sideImageSrc
  }
  if (!base.sideImageAlt?.trim()) {
    base.sideImageAlt = DEFAULT_CONTACT_PAGE.sideImageAlt
  }
  return base
}

export function mergeQmsProgram(
  partial: Partial<QmsProgramContent> | null | undefined,
): QmsProgramContent {
  const p = omitNullish((partial ?? {}) as Record<string, unknown>) as Partial<QmsProgramContent>
  const base = { ...DEFAULT_QMS_PROGRAM, ...p }
  const outcomes = compactList(p.outcomes)
  base.outcomes = outcomes.length > 0 ? outcomes : DEFAULT_QMS_PROGRAM.outcomes
  const pricingBullets = compactList(p.pricingBullets)
  base.pricingBullets =
    pricingBullets.length > 0 ? pricingBullets : DEFAULT_QMS_PROGRAM.pricingBullets
  return base
}

export function mergeNotFound(partial: Partial<NotFoundContent> | null | undefined): NotFoundContent {
  const p = omitNullish((partial ?? {}) as Record<string, unknown>) as Partial<NotFoundContent>
  return { ...DEFAULT_NOT_FOUND, ...p }
}

export function mergeMarketingPage(
  partial: Partial<MarketingPageContent> | null | undefined,
  fallback?: Partial<Pick<MarketingPageContent, "title" | "subtitle">>,
): MarketingPageContent {
  const p = omitNullish((partial ?? {}) as Record<string, unknown>) as Partial<MarketingPageContent>
  const hasCmsTitle = Boolean(partial?.title && String(partial.title).trim() !== "")
  const hasCmsSubtitle = Boolean(partial?.subtitle && String(partial.subtitle).trim() !== "")
  const base = { ...DEFAULT_MARKETING_PLACEHOLDER, ...p }
  if (fallback?.title && !hasCmsTitle) {
    base.title = fallback.title
  }
  if (fallback?.subtitle && !hasCmsSubtitle) {
    base.subtitle = fallback.subtitle
  }
  return base
}
