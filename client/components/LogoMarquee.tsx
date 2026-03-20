const logos = [
  {
    name: "miraei",
    src: "https://api.builder.io/api/v1/image/assets/TEMP/1f1a58b68543f65dfe25124f5b09305254072718?width=664",
  },
  {
    name: "CarePathStudio",
    src: "https://api.builder.io/api/v1/image/assets/TEMP/0395f3d79af738c4c3bd0a9029dc97494e3e4c4d?width=660",
  },
  {
    name: "Newgen Health",
    src: "https://api.builder.io/api/v1/image/assets/TEMP/b85275518f3e69584b17e270d0eac5724f763ca6?width=660",
  },
  {
    name: "Glowlytics",
    src: "https://api.builder.io/api/v1/image/assets/TEMP/62de522c69d85e066e7b1842624fedd22b6c37fc?width=660",
  },
];

// Duplicate for seamless loop
const allLogos = [...logos, ...logos, ...logos];

export default function LogoMarquee() {
  return (
    <section className="w-full bg-white py-8 md:py-12 overflow-hidden border-y border-black/5">
      <p className="text-center font-urbanist text-sm md:text-base font-medium text-black/60 mb-6 md:mb-8 px-6">
        Portfolio Companies
      </p>
      <div className="relative flex items-center">
        {/* Gradient fade left */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />

        {/* Scrolling logos */}
        <div className="flex items-center animate-marquee gap-12 md:gap-20 whitespace-nowrap">
          {allLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex items-center justify-center h-16 md:h-20 shrink-0"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-10 md:h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>

        {/* Gradient fade right */}
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
