import { PortableText, type PortableTextComponents } from "@portabletext/react"
import type { SanityPortableText } from "@shared/cms/types"
import { cn } from "@/lib/utils"

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-host-grotesk text-2xl md:text-3xl font-bold text-black mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-host-grotesk text-xl font-semibold text-rellia-teal mt-6 mb-3">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="font-urbanist text-black/70 text-base md:text-lg leading-relaxed mb-4">{children}</p>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const href = typeof value?.href === "string" ? value.href : "#"
      const isExternal = /^https?:\/\//.test(href)
      return (
        <a
          href={href}
          className="text-rellia-teal font-semibold underline-offset-2 hover:underline"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      )
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 space-y-2 mb-4 font-urbanist text-black/70">{children}</ul>,
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2 mb-4 font-urbanist text-black/70">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
}

type PortableRichTextProps = {
  value: SanityPortableText | null | undefined
  className?: string
}

export const PortableRichText = ({ value, className }: PortableRichTextProps) => {
  if (!value || value.length === 0) return null
  return (
    <div className={cn("prose prose-neutral max-w-none", className)}>
      <PortableText value={value} components={components} />
    </div>
  )
}
