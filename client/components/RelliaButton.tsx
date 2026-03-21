import { cn } from "@/lib/utils";

export default function RelliaButton({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
}) {
  const sizeCls =
    size === "lg"
      ? "text-base md:text-lg px-10 py-5"
      : "text-base md:text-lg px-9 py-4";

  const base =
    "font-host-grotesk font-semibold rounded-full whitespace-nowrap tracking-tight transition-all duration-200 hover:-translate-y-1 hover:shadow-xl border-2";

  const variants =
    variant === "primary"
      ? "bg-rellia-teal text-white border-rellia-teal hover:bg-transparent hover:text-rellia-mint hover:border-rellia-mint"
      : "bg-transparent text-rellia-mint border-rellia-mint hover:bg-white hover:text-rellia-teal hover:border-white";

  return <button className={cn(base, sizeCls, variants, className)} {...props} />;
}

