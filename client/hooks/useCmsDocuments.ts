import { useQuery } from "@tanstack/react-query"
import { sanityFetch } from "@/lib/sanity"
import {
  aboutPageQuery,
  contactPageQuery,
  faqPageQuery,
  globalSettingsQuery,
  homePageQuery,
  marketingPageBySlugQuery,
  notFoundQuery,
  programsLandingQuery,
  qmsProgramQuery,
} from "@/lib/cmsQueries"
import {
  mergeAboutPage,
  mergeContactPage,
  mergeFaqPage,
  mergeGlobalSettings,
  mergeHomePage,
  mergeMarketingPage,
  mergeNotFound,
  mergeProgramsLanding,
  mergeQmsProgram,
} from "@shared/cms/defaults"
import type {
  AboutPageContent,
  ContactPageContent,
  FaqPageContent,
  GlobalSettingsContent,
  HomePageContent,
  MarketingPageContent,
  NotFoundContent,
  ProgramsLandingContent,
  QmsProgramContent,
} from "@shared/cms/types"

const staleTimeMs = 5 * 60 * 1000

export const useGlobalSettings = () =>
  useQuery({
    queryKey: ["cms", "globalSettings"],
    queryFn: async () => {
      const raw = await sanityFetch<Partial<GlobalSettingsContent>>(globalSettingsQuery)
      return mergeGlobalSettings(raw ?? undefined)
    },
    staleTime: staleTimeMs,
  })

export const useHomePage = () =>
  useQuery({
    queryKey: ["cms", "homePage"],
    queryFn: async () => {
      const raw = await sanityFetch<Partial<HomePageContent>>(homePageQuery)
      return mergeHomePage(raw ?? undefined)
    },
    staleTime: staleTimeMs,
  })

export const useAboutPage = () =>
  useQuery({
    queryKey: ["cms", "aboutPage"],
    queryFn: async () => {
      const raw = await sanityFetch<Partial<AboutPageContent>>(aboutPageQuery)
      return mergeAboutPage(raw ?? undefined)
    },
    staleTime: staleTimeMs,
  })

export const useFaqPage = () =>
  useQuery({
    queryKey: ["cms", "faqPage"],
    queryFn: async () => {
      const raw = await sanityFetch<Partial<FaqPageContent>>(faqPageQuery)
      return mergeFaqPage(raw ?? undefined)
    },
    staleTime: staleTimeMs,
  })

export const useProgramsLandingPage = () =>
  useQuery({
    queryKey: ["cms", "programsLandingPage"],
    queryFn: async () => {
      const raw = await sanityFetch<Partial<ProgramsLandingContent>>(programsLandingQuery)
      return mergeProgramsLanding(raw ?? undefined)
    },
    staleTime: staleTimeMs,
  })

export const useContactPage = () =>
  useQuery({
    queryKey: ["cms", "contactPage"],
    queryFn: async () => {
      const raw = await sanityFetch<Partial<ContactPageContent>>(contactPageQuery)
      return mergeContactPage(raw ?? undefined)
    },
    staleTime: staleTimeMs,
  })

export const useQmsProgramPage = () =>
  useQuery({
    queryKey: ["cms", "qmsProgramPage"],
    queryFn: async () => {
      const raw = await sanityFetch<Partial<QmsProgramContent>>(qmsProgramQuery)
      return mergeQmsProgram(raw ?? undefined)
    },
    staleTime: staleTimeMs,
  })

export const useNotFoundPage = () =>
  useQuery({
    queryKey: ["cms", "notFoundPage"],
    queryFn: async () => {
      const raw = await sanityFetch<Partial<NotFoundContent>>(notFoundQuery)
      return mergeNotFound(raw ?? undefined)
    },
    staleTime: staleTimeMs,
  })

export const useMarketingPage = (
  slug: string,
  fallback?: Partial<Pick<MarketingPageContent, "title" | "subtitle">>,
) =>
  useQuery({
    queryKey: ["cms", "marketingPage", slug, fallback?.title, fallback?.subtitle],
    queryFn: async () => {
      const raw = await sanityFetch<Partial<MarketingPageContent>>(marketingPageBySlugQuery, { slug })
      return mergeMarketingPage(raw ?? undefined, fallback)
    },
    staleTime: staleTimeMs,
  })
