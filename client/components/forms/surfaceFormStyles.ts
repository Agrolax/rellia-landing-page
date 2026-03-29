import { cn } from "@/lib/utils"

/**
 * Contact / marketing form controls.
 * Single 2px border — brand teal on focus (no ring, avoids double-outline with shadcn Input/Select defaults).
 */
export const surfaceControlClass = cn(
  "w-full rounded-xl border-2 border-black/[0.12] bg-white font-host-grotesk text-base md:text-lg text-black placeholder:text-black/40 px-4 shadow-none",
  "transition-[border-color] duration-150",
  "outline-none !ring-0 !ring-offset-0",
  "focus:border-rellia-teal focus:!ring-0 focus-visible:border-rellia-teal focus-visible:!ring-0",
  "aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:border-red-600 aria-[invalid=true]:focus-visible:border-red-600",
)

export const surfaceInputClass = cn(surfaceControlClass, "h-14 min-h-[3.5rem]")

export const surfaceTextareaClass = cn(
  surfaceControlClass,
  "min-h-[180px] py-3.5 resize-y md:min-h-[200px]",
)

/** Select triggers merge with ui/select defaults — override ring so only border shows */
export const surfaceSelectTriggerClass = cn(
  surfaceInputClass,
  "items-center justify-between",
  "focus:!ring-0 focus-visible:!ring-0",
  "data-[state=open]:border-rellia-teal",
  "aria-[invalid=true]:border-red-500 aria-[invalid=true]:data-[state=open]:border-red-600",
)
