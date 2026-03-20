import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type IconFeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  /**
   * `static` — clean white tiles (About Values / reference layout): light icon well, no color flip.
   * `interactive` — homepage cards: subtle lift/shadow only (no color flip).
   */
  variant?: "static" | "interactive";
  className?: string;
};

export function IconFeatureCard({
  icon: Icon,
  title,
  description,
  variant = "static",
  className,
}: IconFeatureCardProps) {
  if (variant === "interactive") {
    return (
      <div
        className={cn(
          "group relative flex h-full min-w-0 cursor-default flex-col gap-6 rounded-[20px] border border-black/10 bg-white p-8 shadow-sm transition-all duration-300 md:p-10",
          "hover:-translate-y-1 hover:shadow-lg",
          className,
        )}
      >
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-rellia-mint/20 transition-all duration-300">
          <Icon className="h-7 w-7 text-rellia-teal transition-colors duration-300" strokeWidth={1.75} />
        </div>
        <h3 className="font-host-grotesk text-2xl font-bold leading-tight tracking-tight text-black transition-colors duration-300 md:text-[28px]">
          {title}
        </h3>
        <p className="font-urbanist text-base font-medium leading-relaxed tracking-tight text-black/70 transition-colors duration-300 md:text-[18px]">
          {description}
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-full flex-col gap-5 rounded-3xl border border-black/[0.08] bg-white p-8 shadow-md transition-all duration-300 md:gap-6 md:p-9",
        "hover:shadow-xl hover:-translate-y-1",
        className,
      )}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-neutral-100 md:h-14 md:w-14">
        <Icon className="h-6 w-6 text-neutral-800 md:h-7 md:w-7" strokeWidth={1.75} />
      </div>
      <h3 className="font-host-grotesk text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
        {title}
      </h3>
      <p className="font-urbanist text-base leading-relaxed text-black/60">{description}</p>
    </div>
  );
}
