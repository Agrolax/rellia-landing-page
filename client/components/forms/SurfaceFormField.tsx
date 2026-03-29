import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export type SurfaceFormFieldProps = {
  label: string
  htmlFor: string
  required?: boolean
  error?: string
  className?: string
  children: ReactNode
}

/**
 * Label + control stack aligned with standard marketing pages (Urbanist labels, compact spacing).
 */
export const SurfaceFormField = ({
  label,
  htmlFor,
  required = false,
  error,
  className,
  children,
}: SurfaceFormFieldProps) => {
  return (
    <div className={cn("flex flex-col gap-2.5 w-full min-w-0", className)}>
      <label
        htmlFor={htmlFor}
        className="font-urbanist text-base font-medium text-black/80"
      >
        {label}
        {required ? <span className="text-black/80">*</span> : null}
      </label>
      <div className="min-w-0">{children}</div>
      {error ? (
        <p id={`${htmlFor}-error`} className="text-sm text-red-600 font-urbanist" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
