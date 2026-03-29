import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { loadStripe } from "@stripe/stripe-js"
import type { StripeEmbeddedCheckout } from "@stripe/stripe-js"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const STRIPE_PAYMENT_FALLBACK_URL = "https://buy.stripe.com/14A4gs2jF6Lla0HgCC6wE03"

const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined

type GateState = "loading" | "denied" | "allowed"

export default function Payment() {
  const [searchParams] = useSearchParams()
  const [gate, setGate] = useState<GateState>("loading")
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [useFallbackLink, setUseFallbackLink] = useState(false)
  const [embedLoading, setEmbedLoading] = useState(false)
  const checkoutRef = useRef<StripeEmbeddedCheckout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const meta = document.createElement("meta")
    meta.name = "robots"
    meta.content = "noindex, nofollow"
    document.head.appendChild(meta)
    return () => {
      document.head.removeChild(meta)
    }
  }, [])

  useEffect(() => {
    const key = searchParams.get("key")
    if (!key) {
      setGate("denied")
      return
    }

    let cancelled = false
    const run = async () => {
      try {
        const res = await fetch(`/api/payment-access?key=${encodeURIComponent(key)}`)
        if (cancelled) {
          return
        }
        setGate(res.ok ? "allowed" : "denied")
      } catch {
        if (!cancelled) {
          setGate("denied")
        }
      }
    }
    void run()
    return () => {
      cancelled = true
    }
  }, [searchParams])

  useEffect(() => {
    if (gate !== "allowed") {
      return
    }

    const key = searchParams.get("key")
    if (!key) {
      return
    }

    if (!publishableKey) {
      setUseFallbackLink(true)
      return
    }

    let cancelled = false

    const run = async () => {
      setEmbedLoading(true)
      setUseFallbackLink(false)

      const stripe = await loadStripe(publishableKey)
      if (!stripe || cancelled) {
        setUseFallbackLink(true)
        setEmbedLoading(false)
        return
      }

      const fetchClientSecret = async () => {
        const res = await fetch("/api/create-embedded-checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key }),
        })
        const data = (await res.json()) as { clientSecret?: string }
        if (!res.ok || !data.clientSecret) {
          throw new Error("Checkout session failed")
        }
        return data.clientSecret
      }

      const handleComplete = () => {
        checkoutRef.current?.destroy()
        checkoutRef.current = null
        setPaymentComplete(true)
        setEmbedLoading(false)
      }

      try {
        const checkout = await stripe.createEmbeddedCheckoutPage({
          fetchClientSecret,
          onComplete: handleComplete,
        })
        checkoutRef.current = checkout

        if (cancelled) {
          checkout.destroy()
          checkoutRef.current = null
          return
        }

        const el = containerRef.current
        if (!el) {
          checkout.destroy()
          checkoutRef.current = null
          setUseFallbackLink(true)
          setEmbedLoading(false)
          return
        }

        checkout.mount(el)
        setEmbedLoading(false)
      } catch {
        if (!cancelled) {
          setUseFallbackLink(true)
          setEmbedLoading(false)
        }
      }
    }

    void run()

    return () => {
      cancelled = true
      checkoutRef.current?.destroy()
      checkoutRef.current = null
    }
  }, [gate, searchParams])

  return (
    <div className="min-h-screen bg-white font-host-grotesk overflow-x-hidden">
      <Navbar />

      <main>
        <section className="relative overflow-x-hidden bg-rellia-cream/80 pb-20 pt-[72px] md:pb-28 md:pt-[86px]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-10 -top-24 h-64 w-64 rounded-full bg-rellia-mint/40 blur-3xl" />
            <div className="absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-rellia-teal/10 blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-[720px] px-6 md:px-10">
            {gate === "loading" ? (
              <p className="font-urbanist text-lg text-black/60">Checking your link…</p>
            ) : null}

            {gate === "denied" ? (
              <div className="rounded-2xl border border-black/10 bg-white/95 p-8 shadow-lg md:p-10">
                <h1 className="mb-3 text-2xl font-bold text-black md:text-3xl">Link not valid</h1>
                <p className="font-urbanist text-base leading-relaxed text-black/60">
                  This page requires a valid access key. If you believe this is a mistake, contact Rellia Health.
                </p>
              </div>
            ) : null}

            {gate === "allowed" ? (
              <div className="rounded-2xl border border-black/10 bg-white/95 p-8 shadow-lg md:p-10">
                <p className="mb-2 font-urbanist text-xs font-semibold uppercase tracking-[0.2em] text-black/45">
                  Rellia Health
                </p>
                {paymentComplete ? (
                  <>
                    <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-black md:text-4xl">
                      Payment received
                    </h1>
                    <p className="font-urbanist text-base leading-relaxed text-black/60 md:text-lg">
                      Thank you — your enrollment payment went through. We&apos;ll be in touch with next steps.
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-black md:text-4xl">
                      You&apos;re approved for the Rellia program!
                    </h1>
                    <p className="mb-6 font-urbanist text-base leading-relaxed text-black/60 md:text-lg">
                      {useFallbackLink
                        ? "Complete your enrollment with the secure Stripe payment page (opens in a new tab)."
                        : "Complete your enrollment with the secure checkout below."}
                    </p>

                    {embedLoading ? (
                      <p className="font-urbanist text-base text-black/50">Loading checkout…</p>
                    ) : null}

                    {!useFallbackLink ? (
                      <div
                        ref={containerRef}
                        className="min-h-[480px] w-full [&_iframe]:min-h-[480px]"
                        aria-live="polite"
                      />
                    ) : null}

                    {useFallbackLink ? (
                      <a
                        href={STRIPE_PAYMENT_FALLBACK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center rounded-xl border-2 border-rellia-teal bg-rellia-teal px-6 py-4 font-host-grotesk text-base font-semibold text-white transition-all duration-200 hover:bg-white hover:text-rellia-teal md:w-auto md:min-w-[240px]"
                      >
                        Pay now with Stripe
                      </a>
                    ) : null}
                  </>
                )}
              </div>
            ) : null}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
