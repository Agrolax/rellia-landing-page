import { cn } from "@/lib/utils";
import ScrollReveal from "@/components/ScrollReveal";

export default function SectionHeading({
  title,
  description,
  align = "left",
  tone = "dark",
  className,
}: {
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}) {
  const isCenter = align === "center";
  const isLight = tone === "light";

  return (
    <ScrollReveal className={cn(isCenter && "text-center", className)}>
      <h2
        className={cn(
          "font-host-grotesk font-semibold leading-tight tracking-tight",
          isLight ? "text-white" : "text-black",
          "text-3xl md:text-[40px]",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "font-urbanist font-medium leading-relaxed tracking-tight mt-4",
            isLight ? "text-white/80" : "text-black/70",
            "text-base md:text-lg",
            isCenter && "mx-auto max-w-[680px]",
          )}
        >
          {description}
        </p>
      ) : null}
    </ScrollReveal>
  );
}

