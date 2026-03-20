import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      el.style.animationDelay = `${delay}s`;
      el.classList.add("animate-fade-up");
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.unobserve(el);
        }
      },
      // Any overlap counts; avoids columns staying invisible if only part of the row intersects
      { threshold: 0, rootMargin: "0px 0px 12% 0px" },
    );

    observer.observe(el);

    // If already in view after layout (e.g. short hero, or observer edge cases), reveal — avoids stuck opacity-0
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        if (rect.top < vh && rect.bottom > 0) {
          reveal();
          observer.unobserve(el);
        }
      });
    });

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`opacity-0 ${className}`}
    >
      {children}
    </div>
  );
}
