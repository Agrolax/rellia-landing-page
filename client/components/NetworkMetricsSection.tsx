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

function MetricValue({
  metric,
  index,
  entered,
}: {
  metric: Metric;
  index: number;
  entered: boolean;
}) {
  const count = useCountUp(metric.value, entered, 1200 + index * 150);

  return (
    <div className="flex flex-col items-start">
      <div className="font-host-grotesk font-bold text-black text-5xl md:text-6xl tracking-tight leading-none">
        {count}
        {metric.suffix ?? ""}
      </div>
      <p className="mt-4 font-urbanist text-black/70 text-sm md:text-base leading-snug max-w-[18rem]">
        {metric.label}
      </p>
    </div>
  );
}

export default function NetworkMetricsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [entered, setEntered] = useState(false);

  const metrics: Metric[] = useMemo(
    () => [
      { label: "Members in the Rellia community", value: 291 },
      { label: "Health tech startups", value: 81 },
      { label: "Countries around the world", value: 11 },
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
        <ScrollReveal className="mb-10 md:mb-14 flex flex-col items-center text-center">
          <span className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-4 py-1 text-xs md:text-sm font-urbanist text-black/60 mb-6 backdrop-blur">
            The network
          </span>
          <h2 className="font-host-grotesk font-semibold text-black text-3xl md:text-[40px] leading-tight tracking-tight max-w-2xl">
            The right people make all the difference.
          </h2>
          <p className="font-urbanist font-medium text-black/70 leading-relaxed tracking-tight mt-4 text-base md:text-lg max-w-[680px] mx-auto">
            Here is a look at the Rellia network—where health tech founders are connected with people
            who understand exactly what you&apos;re up against.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
          {metrics.map((m, i) => {
            return (
              <ScrollReveal key={m.label} delay={i * 0.08}>
                <MetricValue metric={m} index={i} entered={entered} />
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

