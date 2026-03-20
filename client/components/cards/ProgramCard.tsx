import { Link } from "react-router-dom";

export type ProgramCardProps = {
  tag?: string;
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  buttonText: string;
};

export function ProgramCard({
  tag,
  title,
  description,
  imageSrc,
  href,
  buttonText,
}: ProgramCardProps) {
  return (
    <div className="rounded-3xl overflow-hidden border border-black/5 shadow-sm bg-white h-full">
      <div className="relative aspect-[16/9] bg-rellia-cream/40">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-6 md:p-7">
        {tag ? (
          <span className="inline-flex items-center rounded-full border border-rellia-teal/15 bg-rellia-teal/5 px-4 py-1 text-[11px] md:text-xs font-urbanist text-rellia-teal mb-4">
            {tag}
          </span>
        ) : null}

        <h3 className="font-host-grotesk font-bold text-black text-2xl md:text-3xl leading-tight mb-3">
          {title}
        </h3>

        <p className="font-urbanist text-black/65 text-base leading-relaxed">
          {description}
        </p>

        <div className="mt-6">
          <Link
            to={href}
            className="inline-flex items-center justify-center rounded-full bg-rellia-teal text-white font-host-grotesk font-semibold px-6 py-3 md:px-8 md:py-4 border-2 border-rellia-teal hover:bg-white hover:text-rellia-teal transition-all duration-200 w-full sm:w-auto"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}

