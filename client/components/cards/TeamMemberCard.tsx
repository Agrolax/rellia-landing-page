import { useEffect, useState } from "react";
import { personImageByFirstName } from "@/lib/person-image";
import { cn } from "@/lib/utils";

export type TeamMemberCardProps = {
  name: string;
  role?: string;
  bio?: string;
  /** Override default `/images/{Firstname}.png` */
  imageSrc?: string;
  className?: string;
};

export function TeamMemberCard({
  name,
  role,
  bio,
  imageSrc,
  className,
}: TeamMemberCardProps) {
  const [showBio, setShowBio] = useState(false);
  const descriptionText = bio?.trim() ? bio.trim() : "No description";

  // Team images live in `public/images/` but the extension varies (.png / .jpg / .jpeg).
  // Try common extensions so the card doesn't break if the file is not a .png.
  const base = imageSrc ?? personImageByFirstName(name);
  const baseNoExt = base.replace(/\.(png|jpe?g)$/i, "");
  const candidates = Array.from(
    new Set([
      base,
      `${baseNoExt}.png`,
      `${baseNoExt}.jpg`,
      `${baseNoExt}.jpeg`,
    ]),
  );

  const [candidateIndex, setCandidateIndex] = useState(0);
  const src = candidates[Math.min(candidateIndex, candidates.length - 1)];

  useEffect(() => {
    setCandidateIndex(0);
  }, [name, imageSrc]);

  return (
    <div
      className={cn("cursor-default", className)}
      onMouseEnter={() => setShowBio(true)}
      onMouseLeave={() => setShowBio(false)}
    >
      <div className="relative mb-6 aspect-square overflow-hidden rounded-3xl bg-rellia-cream/40 shadow-md">
        <img
          src={src}
          alt={name}
          onError={() => {
            setCandidateIndex((i) => Math.min(i + 1, candidates.length - 1));
          }}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500",
            showBio ? "scale-100" : "scale-105",
          )}
        />

        <div
          className={cn(
            "pointer-events-none absolute inset-0 transition-colors duration-300",
            showBio ? "bg-rellia-teal/65" : "bg-rellia-teal/0",
          )}
          aria-hidden
        />

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 max-h-[55%] overflow-hidden",
            "bg-gradient-to-t from-rellia-teal/90 via-rellia-teal/70 to-transparent px-4 pb-5 pt-10",
            "transition-transform duration-300 ease-out",
            showBio ? "translate-y-0" : "translate-y-full",
          )}
        >
          <p className="font-urbanist text-sm leading-relaxed text-white/95 md:text-[15px]">
            {descriptionText}
          </p>
        </div>
      </div>

      {/* Name/role (bio is driven by whole-card hover) */}
      <div>
        <h3 className="mb-1 text-2xl font-bold text-black">{name}</h3>
        {role ? (
          <p className="text-sm font-semibold uppercase tracking-wider text-rellia-teal">{role}</p>
        ) : null}
      </div>
    </div>
  );
}
