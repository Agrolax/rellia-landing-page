import { cn } from "@/lib/utils"

export type QuoteOverlayMediaCardProps = {
  imageSrc: string
  imageAlt: string
  quote: string
  attributionName: string
  attributionRole: string
  className?: string
  /** Tighter type and padding for sidebar / contact column layouts */
  compact?: boolean
}

/**
 * Rounded media card with bottom gradient and overlaid quote + attribution (reusable marketing / contact pattern).
 */
export const QuoteOverlayMediaCard = ({
  imageSrc,
  imageAlt,
  quote,
  attributionName,
  attributionRole,
  className,
  compact = false,
}: QuoteOverlayMediaCardProps) => {
  return (
    <figure
      className={cn(
        "relative w-full overflow-hidden rounded-[26px]",
        compact
          ? "mx-auto aspect-[9/16] w-full max-w-[min(100%,280px)] max-h-[min(58svh,560px)] md:max-w-[min(100%,300px)] md:max-h-[min(62svh,600px)]"
          : "aspect-[684/907] max-h-[min(90vh,907px)]",
        className,
      )}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-rellia-teal/0 via-rellia-teal/40 to-rellia-teal mix-blend-multiply"
        aria-hidden
      />
      <figcaption
        className={cn(
          "absolute inset-x-0 bottom-0 text-white",
          compact ? "p-6 md:p-8" : "p-8 md:p-10 lg:p-12",
        )}
      >
        <blockquote
          className={cn(
            "max-w-[36ch] font-host-grotesk font-bold leading-tight tracking-tight",
            compact
              ? "mb-4 text-2xl md:mb-5 md:text-3xl lg:text-3xl"
              : "mb-8 text-3xl md:mb-10 md:text-5xl lg:text-[62px]",
          )}
        >
          <span className="text-white/95">“{quote}”</span>
        </blockquote>
        <div className="space-y-1">
          <p
            className={cn(
              "font-urbanist font-medium leading-tight",
              compact ? "text-lg md:text-xl" : "text-2xl md:text-[39px]",
            )}
          >
            {attributionName}
          </p>
          <p
            className={cn(
              "font-urbanist leading-tight text-white/60",
              compact ? "text-base md:text-lg" : "text-2xl md:text-[39px]",
            )}
          >
            {attributionRole}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}
