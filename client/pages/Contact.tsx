import { useMemo, useState } from "react"
import { useForm, Controller, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useContactPage } from "@/hooks/useCmsDocuments"
import { DEFAULT_CONTACT_PAGE } from "@shared/cms/defaults"

type ContactFormValues = {
  email: string
  firstName: string
  lastName: string
  companyName: string
  jobTitle: string
  companySize: string
  subject: string
  message: string
}

/* ─── Win2K design tokens ─────────────────────────────────────────── */
const WIN_BG = "#ECE9D8"
const WIN_PANEL = "#D4D0C8"
const WIN_DARK_BORDER = "#808080"
const WIN_DARKER = "#404040"
const WIN_WHITE = "#FFFFFF"
const WIN_TITLE_START = "#0A246A"
const WIN_TITLE_END = "#A6CAF0"

/* ─── Inline style helpers ────────────────────────────────────────── */
const raisedStyle: React.CSSProperties = {
  border: `2px solid`,
  borderColor: `${WIN_WHITE} ${WIN_DARK_BORDER} ${WIN_DARK_BORDER} ${WIN_WHITE}`,
  background: WIN_PANEL,
}

const sunkenStyle: React.CSSProperties = {
  border: `2px solid`,
  borderColor: `${WIN_DARK_BORDER} ${WIN_WHITE} ${WIN_WHITE} ${WIN_DARK_BORDER}`,
  background: WIN_WHITE,
}

const groupBoxStyle: React.CSSProperties = {
  border: `1px solid ${WIN_DARK_BORDER}`,
  borderTop: `1px solid ${WIN_DARK_BORDER}`,
  background: WIN_PANEL,
  padding: "16px 12px 12px",
  position: "relative",
  marginTop: "10px",
}

/* ─── Input / Textarea shared class ──────────────────────────────── */
const inputStyle: React.CSSProperties = {
  ...sunkenStyle,
  width: "100%",
  fontFamily: "Tahoma, Arial, sans-serif",
  fontSize: "11px",
  color: WIN_DARKER,
  padding: "2px 4px",
  outline: "none",
  boxSizing: "border-box",
}

/* ─── Win2K Window chrome ─────────────────────────────────────────── */
function TitleBar({ title }: { title: string }) {
  return (
    <div
      style={{
        background: `linear-gradient(to right, ${WIN_TITLE_START}, ${WIN_TITLE_END})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "3px 4px",
        userSelect: "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {/* tiny icon placeholder */}
        <div
          style={{
            width: 14,
            height: 14,
            background: "#FFFF00",
            border: "1px solid #808080",
            flexShrink: 0,
          }}
          aria-hidden="true"
        />
        <span
          style={{
            fontFamily: "Tahoma, Arial, sans-serif",
            fontWeight: "bold",
            fontSize: "11px",
            color: WIN_WHITE,
            letterSpacing: "0.02em",
          }}
        >
          {title}
        </span>
      </div>
      {/* Window control buttons */}
      <div style={{ display: "flex", gap: "2px" }}>
        {["_", "□", "✕"].map((label, i) => (
          <button
            key={i}
            type="button"
            aria-label={["Minimise", "Maximise", "Close"][i]}
            style={{
              ...raisedStyle,
              width: 16,
              height: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Tahoma, Arial, sans-serif",
              fontSize: "9px",
              fontWeight: "bold",
              color: WIN_DARKER,
              cursor: "default",
              padding: 0,
              lineHeight: 1,
              ...(i === 2 ? { background: "#C0392B", color: WIN_WHITE } : {}),
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─── Classic Win2K button ────────────────────────────────────────── */
function Win2KButton({
  children,
  disabled,
  type = "button",
  onClick,
  style: extraStyle,
}: {
  children: React.ReactNode
  disabled?: boolean
  type?: "button" | "submit"
  onClick?: () => void
  style?: React.CSSProperties
}) {
  const [pressed, setPressed] = useState(false)
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        border: "2px solid",
        borderColor: pressed
          ? `${WIN_DARK_BORDER} ${WIN_WHITE} ${WIN_WHITE} ${WIN_DARK_BORDER}`
          : `${WIN_WHITE} ${WIN_DARK_BORDER} ${WIN_DARK_BORDER} ${WIN_WHITE}`,
        background: WIN_PANEL,
        fontFamily: "Tahoma, Arial, sans-serif",
        fontSize: "11px",
        color: disabled ? "#808080" : WIN_DARKER,
        padding: "4px 18px",
        cursor: disabled ? "default" : "pointer",
        minWidth: 80,
        userSelect: "none",
        ...extraStyle,
      }}
    >
      {children}
    </button>
  )
}

/* ─── Win2K Select ────────────────────────────────────────────────── */
function Win2KSelect({
  id,
  value,
  onChange,
  options,
  placeholder,
  invalid,
}: {
  id: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  placeholder: string
  invalid?: boolean
}) {
  return (
    <div style={{ position: "relative" }}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid}
        style={{
          ...inputStyle,
          appearance: "none",
          WebkitAppearance: "none",
          paddingRight: 20,
          cursor: "default",
          height: 22,
          outline: "none",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {/* Win2K dropdown arrow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 2,
          top: 2,
          bottom: 2,
          width: 16,
          ...raisedStyle,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 8,
          color: WIN_DARKER,
          pointerEvents: "none",
        }}
      >
        ▼
      </div>
    </div>
  )
}

/* ─── Field wrapper ───────────────────────────────────────────────── */
function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <label
        htmlFor={htmlFor}
        style={{
          fontFamily: "Tahoma, Arial, sans-serif",
          fontSize: "11px",
          color: WIN_DARKER,
        }}
      >
        {label}
        {required && (
          <span style={{ color: "#CC0000", marginLeft: 2 }}>*</span>
        )}
      </label>
      {children}
      {error && (
        <span
          id={`${htmlFor}-error`}
          role="alert"
          style={{
            fontFamily: "Tahoma, Arial, sans-serif",
            fontSize: "10px",
            color: "#CC0000",
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          ⚠ {error}
        </span>
      )}
    </div>
  )
}

/* ─── Separator ───────────────────────────────────────────────────── */
function Win2KSep() {
  return (
    <div style={{ borderTop: `1px solid ${WIN_DARK_BORDER}`, borderBottom: `1px solid ${WIN_WHITE}`, margin: "8px 0" }} />
  )
}

/* ─── Status bar ──────────────────────────────────────────────────── */
function StatusBar({ text }: { text: string }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 2,
        padding: "2px 4px",
        borderTop: `1px solid ${WIN_DARK_BORDER}`,
        background: WIN_PANEL,
      }}
    >
      <div
        style={{
          ...sunkenStyle,
          flex: 1,
          fontFamily: "Tahoma, Arial, sans-serif",
          fontSize: "10px",
          color: WIN_DARKER,
          padding: "1px 4px",
        }}
      >
        {text}
      </div>
      <div
        style={{
          ...sunkenStyle,
          width: 80,
          fontFamily: "Tahoma, Arial, sans-serif",
          fontSize: "10px",
          color: WIN_DARKER,
          padding: "1px 4px",
          textAlign: "center",
        }}
      >
        Rellia™
      </div>
    </div>
  )
}

/* ─── Main page ───────────────────────────────────────────────────── */
export default function Contact() {
  const { data } = useContactPage()
  const copy = data ?? DEFAULT_CONTACT_PAGE

  const [submitted, setSubmitted] = useState(false)

  const subjectValues = useMemo(() => copy.subjectOptions.map((o) => o.value), [copy.subjectOptions])
  const companySizeValues = useMemo(
    () => copy.companySizeOptions.map((o) => o.value),
    [copy.companySizeOptions],
  )

  const schema = useMemo(() => {
    return z.object({
      email: z.string().trim().email("Enter a valid email"),
      firstName: z.string().trim().min(1, "Required"),
      lastName: z.string().trim().min(1, "Required"),
      companyName: z.string().trim().max(120).optional().or(z.literal("")),
      jobTitle: z.string().trim().max(120).optional().or(z.literal("")),
      companySize: z.string().trim().refine((v) => v === "" || companySizeValues.includes(v), {
        message: "Choose an option",
      }),
      subject: z
        .string()
        .trim()
        .min(1, "Required")
        .refine((v) => subjectValues.includes(v), { message: "Choose a subject" }),
      message: z.string().trim().min(10, "At least 10 characters"),
    })
  }, [subjectValues, companySizeValues])

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema) as Resolver<ContactFormValues>,
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      companyName: "",
      jobTitle: "",
      companySize: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = async (values: ContactFormValues) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        companyName: values.companyName || undefined,
        jobTitle: values.jobTitle || undefined,
        companySize: values.companySize || undefined,
        subject: values.subject,
        message: values.message,
      }),
    })
    if (!res.ok) return
    setSubmitted(true)
    reset()
  }

  return (
    /* Desktop wallpaper */
    <div
      style={{
        minHeight: "100vh",
        background: "#3A6EA5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "40px 16px 60px",
        fontFamily: "Tahoma, Arial, sans-serif",
      }}
    >
      {/* ── Taskbar-style top bar ─────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 28,
          background: `linear-gradient(to bottom, #245EDC, #1941B0)`,
          display: "flex",
          alignItems: "center",
          padding: "0 6px",
          zIndex: 100,
          borderBottom: `1px solid #1939A4`,
        }}
      >
        {/* Start button */}
        <button
          type="button"
          style={{
            background: `linear-gradient(to bottom, #3C8C3C, #2D6A2D)`,
            border: "none",
            borderRadius: 10,
            color: WIN_WHITE,
            fontFamily: "Tahoma, Arial, sans-serif",
            fontWeight: "bold",
            fontSize: 12,
            padding: "2px 10px 2px 6px",
            cursor: "default",
            display: "flex",
            alignItems: "center",
            gap: 5,
            height: 22,
          }}
        >
          <span style={{ fontSize: 14 }}>⊞</span> start
        </button>

        {/* Quick-launch dividers */}
        <div style={{ width: 1, background: "#1939A4", height: "80%", margin: "0 6px" }} />
        <div style={{ width: 1, background: "#3060CC", height: "80%", marginRight: 8 }} />

        {/* Active window pill */}
        <div
          style={{
            background: `linear-gradient(to bottom, #2457CC, #1A43A8)`,
            border: `1px solid #1434A0`,
            borderRadius: 2,
            color: WIN_WHITE,
            fontFamily: "Tahoma, Arial, sans-serif",
            fontSize: 11,
            fontWeight: "bold",
            padding: "2px 8px",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span style={{ fontSize: 10 }}>✉</span> Contact Rellia
        </div>

        {/* Clock */}
        <div
          style={{
            marginLeft: "auto",
            color: WIN_WHITE,
            fontFamily: "Tahoma, Arial, sans-serif",
            fontSize: 11,
            padding: "0 8px",
          }}
        >
          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>

      {/* ── Spacer for taskbar ──────────────────────────────────── */}
      <div style={{ height: 28 }} />

      {/* ── Main window ─────────────────────────────────────────── */}
      <div
        style={{
          width: "100%",
          maxWidth: 880,
          ...raisedStyle,
          background: WIN_PANEL,
          boxShadow: "4px 4px 10px rgba(0,0,0,0.45)",
        }}
      >
        <TitleBar title="Contact Rellia — Windows Internet Explorer" />

        {/* Menu bar */}
        <div
          style={{
            background: WIN_PANEL,
            borderBottom: `1px solid ${WIN_DARK_BORDER}`,
            padding: "2px 4px",
            display: "flex",
            gap: 2,
          }}
        >
          {["File", "Edit", "View", "Favorites", "Tools", "Help"].map((m) => (
            <button
              key={m}
              type="button"
              style={{
                background: "none",
                border: "none",
                fontFamily: "Tahoma, Arial, sans-serif",
                fontSize: "11px",
                color: WIN_DARKER,
                padding: "1px 6px",
                cursor: "default",
              }}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div
          style={{
            background: WIN_PANEL,
            borderBottom: `1px solid ${WIN_DARK_BORDER}`,
            padding: "3px 4px",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          {["◄ Back", "► Forward", "✕ Stop", "⟳ Refresh", "⌂ Home"].map((btn) => (
            <Win2KButton key={btn} style={{ fontSize: 10, padding: "2px 8px" }}>
              {btn}
            </Win2KButton>
          ))}
          <div style={{ marginLeft: 8, flex: 1, display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 10, color: WIN_DARKER, fontFamily: "Tahoma, Arial, sans-serif" }}>
              Address:
            </span>
            <div
              style={{
                ...sunkenStyle,
                flex: 1,
                padding: "1px 4px",
                fontFamily: "Tahoma, Arial, sans-serif",
                fontSize: 10,
                color: WIN_DARKER,
              }}
            >
              http://www.rellia.com/contact
            </div>
            <Win2KButton style={{ fontSize: 10, padding: "2px 12px" }}>Go</Win2KButton>
          </div>
        </div>

        {/* Content area */}
        <div style={{ background: WIN_BG, padding: "16px 20px" }}>
          {/* Page heading strip */}
          <div
            style={{
              background: `linear-gradient(to right, ${WIN_TITLE_START}, ${WIN_TITLE_END})`,
              padding: "6px 12px",
              marginBottom: 14,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 20, color: WIN_WHITE }}>✉</span>
            <div>
              <div style={{ color: WIN_WHITE, fontWeight: "bold", fontSize: 14, fontFamily: "Tahoma, Arial, sans-serif" }}>
                {copy.pageTitle}
              </div>
              <div style={{ color: "#C8DCFF", fontSize: 10, fontFamily: "Tahoma, Arial, sans-serif" }}>
                {copy.heroBadge}
              </div>
            </div>
          </div>

          {/* Two-column layout */}
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start", flexWrap: "wrap" }}>

            {/* Left panel — info */}
            <div style={{ flex: "0 0 220px", minWidth: 160, display: "flex", flexDirection: "column", gap: 10 }}>

              {/* Info group box */}
              <fieldset style={groupBoxStyle}>
                <legend
                  style={{
                    fontFamily: "Tahoma, Arial, sans-serif",
                    fontSize: "11px",
                    color: WIN_DARKER,
                    padding: "0 4px",
                    fontWeight: "bold",
                  }}
                >
                  About This Form
                </legend>
                <p style={{ fontFamily: "Tahoma, Arial, sans-serif", fontSize: "11px", color: WIN_DARKER, margin: 0, lineHeight: 1.6 }}>
                  {copy.intro}
                </p>
              </fieldset>

              {/* Quote group box */}
              <fieldset style={groupBoxStyle}>
                <legend
                  style={{
                    fontFamily: "Tahoma, Arial, sans-serif",
                    fontSize: "11px",
                    color: WIN_DARKER,
                    padding: "0 4px",
                    fontWeight: "bold",
                  }}
                >
                  Customer Testimonial
                </legend>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                  <div
                    style={{
                      ...sunkenStyle,
                      width: 32,
                      height: 32,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      background: "#C0C0FF",
                    }}
                  >
                    👤
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "Tahoma, Arial, sans-serif",
                        fontSize: "10px",
                        fontStyle: "italic",
                        color: WIN_DARKER,
                        margin: "0 0 4px 0",
                        lineHeight: 1.5,
                      }}
                    >
                      &quot;{copy.quoteText}&quot;
                    </p>
                    <p
                      style={{
                        fontFamily: "Tahoma, Arial, sans-serif",
                        fontSize: "10px",
                        fontWeight: "bold",
                        color: WIN_TITLE_START,
                        margin: 0,
                      }}
                    >
                      — {copy.quoteAttributionName}
                    </p>
                    <p
                      style={{
                        fontFamily: "Tahoma, Arial, sans-serif",
                        fontSize: "9px",
                        color: "#666",
                        margin: 0,
                      }}
                    >
                      {copy.quoteAttributionRole}
                    </p>
                  </div>
                </div>
              </fieldset>

              {/* "Side image" as a Win2K picture frame */}
              <div style={{ ...sunkenStyle, background: "#000", overflow: "hidden", aspectRatio: "4/3" }}>
                <img
                  src={copy.sideImageSrc}
                  alt={copy.sideImageAlt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>

              {/* Links panel */}
              <fieldset style={groupBoxStyle}>
                <legend
                  style={{
                    fontFamily: "Tahoma, Arial, sans-serif",
                    fontSize: "11px",
                    color: WIN_DARKER,
                    padding: "0 4px",
                    fontWeight: "bold",
                  }}
                >
                  Links
                </legend>
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {[
                    { label: "Terms of Use", href: "https://docs.google.com/document/d/1wiC9mW3mDsCeqXz-dqr93RBr_pehru-h/edit" },
                    { label: "Privacy Policy", href: "https://docs.google.com/document/d/17ZVWt9jSSCEfHKX0Np_D01ua4NuIb_Su/edit" },
                    { label: "Back to Home", href: "/" },
                  ].map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      style={{
                        fontFamily: "Tahoma, Arial, sans-serif",
                        fontSize: "11px",
                        color: "#0000CC",
                        textDecoration: "underline",
                        display: "block",
                      }}
                    >
                      🔗 {l.label}
                    </a>
                  ))}
                </div>
              </fieldset>
            </div>

            {/* Right panel — form */}
            <div style={{ flex: 1, minWidth: 280 }}>
              {submitted ? (
                /* Success dialog */
                <div
                  style={{
                    ...raisedStyle,
                    background: WIN_PANEL,
                    boxShadow: "3px 3px 8px rgba(0,0,0,0.4)",
                    maxWidth: 340,
                    margin: "20px auto",
                  }}
                >
                  <TitleBar title="Rellia — Message Sent" />
                  <div style={{ padding: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                    <div style={{ fontSize: 40 }}>✅</div>
                    <p style={{ fontFamily: "Tahoma, Arial, sans-serif", fontSize: 12, color: WIN_DARKER, textAlign: "center", margin: 0, fontWeight: "bold" }}>
                      {copy.successTitle}
                    </p>
                    <p style={{ fontFamily: "Tahoma, Arial, sans-serif", fontSize: 11, color: WIN_DARKER, textAlign: "center", margin: 0 }}>
                      {copy.successBody}
                    </p>
                    <Win2KSep />
                    <Win2KButton onClick={() => setSubmitted(false)} style={{ minWidth: 80 }}>
                      OK
                    </Win2KButton>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <fieldset style={groupBoxStyle}>
                    <legend style={{ fontFamily: "Tahoma, Arial, sans-serif", fontSize: "11px", color: WIN_DARKER, padding: "0 4px", fontWeight: "bold" }}>
                      Your Information
                    </legend>

                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <Field label={copy.labels.email} htmlFor="email" required error={errors.email?.message}>
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          placeholder={copy.placeholders.email}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          style={{ ...inputStyle, height: 22 }}
                          {...register("email")}
                        />
                      </Field>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <Field label={copy.labels.firstName} htmlFor="firstName" required error={errors.firstName?.message}>
                          <input
                            id="firstName"
                            autoComplete="given-name"
                            placeholder={copy.placeholders.firstName}
                            aria-invalid={Boolean(errors.firstName)}
                            aria-describedby={errors.firstName ? "firstName-error" : undefined}
                            style={{ ...inputStyle, height: 22 }}
                            {...register("firstName")}
                          />
                        </Field>
                        <Field label={copy.labels.lastName} htmlFor="lastName" required error={errors.lastName?.message}>
                          <input
                            id="lastName"
                            autoComplete="family-name"
                            placeholder={copy.placeholders.lastName}
                            aria-invalid={Boolean(errors.lastName)}
                            aria-describedby={errors.lastName ? "lastName-error" : undefined}
                            style={{ ...inputStyle, height: 22 }}
                            {...register("lastName")}
                          />
                        </Field>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <Field label={copy.labels.companyName} htmlFor="companyName">
                          <input
                            id="companyName"
                            autoComplete="organization"
                            placeholder={copy.placeholders.companyName}
                            style={{ ...inputStyle, height: 22 }}
                            {...register("companyName")}
                          />
                        </Field>
                        <Field label={copy.labels.jobTitle} htmlFor="jobTitle">
                          <input
                            id="jobTitle"
                            autoComplete="organization-title"
                            placeholder={copy.placeholders.jobTitle}
                            style={{ ...inputStyle, height: 22 }}
                            {...register("jobTitle")}
                          />
                        </Field>
                      </div>
                    </div>
                  </fieldset>

                  <fieldset style={groupBoxStyle}>
                    <legend style={{ fontFamily: "Tahoma, Arial, sans-serif", fontSize: "11px", color: WIN_DARKER, padding: "0 4px", fontWeight: "bold" }}>
                      Message Details
                    </legend>

                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <Field label={copy.labels.companySize} htmlFor="companySize" error={errors.companySize?.message}>
                        <Controller
                          name="companySize"
                          control={control}
                          render={({ field }) => (
                            <Win2KSelect
                              id="companySize"
                              value={field.value}
                              onChange={field.onChange}
                              options={copy.companySizeOptions}
                              placeholder={copy.companySizePlaceholder}
                              invalid={Boolean(errors.companySize)}
                            />
                          )}
                        />
                      </Field>

                      <Field label={copy.labels.subject} htmlFor="subject" required error={errors.subject?.message}>
                        <Controller
                          name="subject"
                          control={control}
                          render={({ field }) => (
                            <Win2KSelect
                              id="subject"
                              value={field.value}
                              onChange={field.onChange}
                              options={copy.subjectOptions}
                              placeholder={copy.subjectPlaceholder}
                              invalid={Boolean(errors.subject)}
                            />
                          )}
                        />
                      </Field>

                      <Field label={copy.labels.message} htmlFor="message" required error={errors.message?.message}>
                        <textarea
                          id="message"
                          rows={5}
                          placeholder={copy.placeholders.message}
                          aria-invalid={Boolean(errors.message)}
                          aria-describedby={errors.message ? "message-error" : undefined}
                          style={{
                            ...inputStyle,
                            height: "auto",
                            resize: "vertical",
                            padding: "3px 4px",
                            lineHeight: 1.5,
                          }}
                          {...register("message")}
                        />
                      </Field>
                    </div>
                  </fieldset>

                  <Win2KSep />

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 6, alignItems: "center" }}>
                    <span
                      style={{
                        fontFamily: "Tahoma, Arial, sans-serif",
                        fontSize: "10px",
                        color: "#666",
                        flex: 1,
                      }}
                    >
                      Fields marked <span style={{ color: "#CC0000" }}>*</span> are required
                    </span>
                    <Win2KButton type="button" onClick={() => reset()}>
                      Clear
                    </Win2KButton>
                    <Win2KButton type="submit" disabled={isSubmitting} style={{ fontWeight: "bold" }}>
                      {isSubmitting ? "Sending…" : copy.submitLabel}
                    </Win2KButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Status bar */}
        <StatusBar text={`Done — ${copy.heroBadge}`} />
      </div>

      {/* ── Desktop icons ──────────────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          left: 12,
          top: 44,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {[
          { icon: "🖥", label: "My Computer" },
          { icon: "🗑", label: "Recycle Bin" },
          { icon: "📁", label: "My Documents" },
          { icon: "🌐", label: "Internet\nExplorer" },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 60,
              cursor: "default",
              userSelect: "none",
            }}
          >
            <div style={{ fontSize: 28, lineHeight: 1 }}>{item.icon}</div>
            <span
              style={{
                fontFamily: "Tahoma, Arial, sans-serif",
                fontSize: "10px",
                color: WIN_WHITE,
                textAlign: "center",
                textShadow: "1px 1px 2px #000",
                whiteSpace: "pre-line",
                lineHeight: 1.3,
                marginTop: 3,
              }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
