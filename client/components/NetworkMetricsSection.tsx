import ScrollReveal from "@/components/ScrollReveal";
import { useEffect, useMemo, useRef, useState } from "react";

function useCountUp(target: number, enabled: boolean, durationMs = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setValue(0);
      return;
    }

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduceMotion) {
      setValue(target);
      return;
    }

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, target, durationMs]);

  return value;
}

type Metric = {
  label: string;
  value: number;
  suffix?: string;
};

export default function NetworkMetricsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [entered, setEntered] = useState(false);

  const metrics: Metric[] = useMemo(
    () => [
      { label: "Members in the Rellia network", value: 217 },
      { label: "Active founders on Slack", value: 51 },
      { label: "Clinical focus areas", value: 11, suffix: "+" },
    ],
    [],
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (entered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [entered]);

  return (
    <section
      ref={(node) => {
        sectionRef.current = node;
      }}
      className="w-full bg-rellia-cream/60 py-14 md:py-20 px-6 md:px-10 border-y border-black/5"
    >
      <div className="max-w-[1300px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 mb-10 md:mb-14">
          <ScrollReveal className="max-w-2xl">
            <h2 className="font-host-grotesk font-semibold text-black text-3xl md:text-[40px] leading-tight tracking-tight">
              Real people. Real traction.
            </h2>
            <p className="font-urbanist text-black/70 text-base md:text-lg leading-relaxed mt-4">
              A quick look at the community behind Rellia—built for founders who want to move
              faster with the right network around them.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
          {metrics.map((m, i) => {
            const count = useCountUp(m.value, entered, 1200 + i * 150);

            return (
              <ScrollReveal key={m.label} delay={i * 0.08}>
                <div className="flex flex-col items-start">
                  <div className="font-host-grotesk font-bold text-black text-5xl md:text-6xl tracking-tight leading-none">
                    {count}
                    {m.suffix ?? ""}
                  </div>
                  <p className="mt-4 font-urbanist text-black/70 text-sm md:text-base leading-snug max-w-[18rem]">
                    {m.label}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

