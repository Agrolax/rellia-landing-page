import { useMemo } from "react"
import { useForm, Controller, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { SurfaceFormField } from "@/components/forms/SurfaceFormField"
import {
  surfaceInputClass,
  surfaceSelectTriggerClass,
  surfaceTextareaClass,
} from "@/components/forms/surfaceFormStyles"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useContactPage } from "@/hooks/useCmsDocuments"
import { DEFAULT_CONTACT_PAGE } from "@shared/cms/defaults"
import { cn } from "@/lib/utils"

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

export default function Contact() {
  const { data } = useContactPage()
  const copy = data ?? DEFAULT_CONTACT_PAGE

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
      message: z.string().trim().min(10, "Please add a bit more detail (at least 10 characters)"),
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

    if (!res.ok) {
      toast.error("Something went wrong. Please try again or email us directly.")
      return
    }

    toast.success(copy.successTitle, { description: copy.successBody })
    reset()
  }

  const selectTriggerClass = cn(
    surfaceSelectTriggerClass,
    "data-[placeholder]:text-black/40 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:opacity-50",
  )

  return (
    <div className="min-h-screen bg-white font-host-grotesk overflow-x-hidden">
      <Navbar />

      <main>
        {/* Single page scroll — no nested overflow regions */}
        <section className="relative overflow-x-hidden bg-rellia-cream/80 pb-16 pt-[72px] md:pb-24 md:pt-[86px]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-10 -top-24 h-64 w-64 rounded-full bg-rellia-mint/40 blur-3xl" />
            <div className="absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-rellia-teal/10 blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col px-6 py-8 md:px-10 md:py-10 lg:flex-row-reverse lg:items-start lg:gap-8 xl:gap-10">
            {/* DOM first → visual right on lg (row-reverse). Each column 50% width. Mobile: order-2 so hero stays above. */}
            <div className="order-2 flex w-full min-w-0 flex-col lg:order-none lg:basis-0 lg:flex-1">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col rounded-2xl border border-black/10 bg-white/95 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.06)] backdrop-blur-sm md:p-7 lg:p-6"
                noValidate
              >
                <div className="space-y-4 px-1.5 py-0.5 md:space-y-5">
                  <SurfaceFormField
                    label={copy.labels.email}
                    htmlFor="email"
                    required
                    error={errors.email?.message}
                  >
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder={copy.placeholders.email}
                      className={surfaceInputClass}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      {...register("email")}
                    />
                  </SurfaceFormField>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 sm:gap-x-4">
                    <SurfaceFormField
                      label={copy.labels.firstName}
                      htmlFor="firstName"
                      required
                      error={errors.firstName?.message}
                    >
                      <Input
                        id="firstName"
                        autoComplete="given-name"
                        placeholder={copy.placeholders.firstName}
                        className={surfaceInputClass}
                        aria-invalid={Boolean(errors.firstName)}
                        aria-describedby={errors.firstName ? "firstName-error" : undefined}
                        {...register("firstName")}
                      />
                    </SurfaceFormField>
                    <SurfaceFormField
                      label={copy.labels.lastName}
                      htmlFor="lastName"
                      required
                      error={errors.lastName?.message}
                    >
                      <Input
                        id="lastName"
                        autoComplete="family-name"
                        placeholder={copy.placeholders.lastName}
                        className={surfaceInputClass}
                        aria-invalid={Boolean(errors.lastName)}
                        aria-describedby={errors.lastName ? "lastName-error" : undefined}
                        {...register("lastName")}
                      />
                    </SurfaceFormField>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 sm:gap-x-4">
                    <SurfaceFormField label={copy.labels.companyName} htmlFor="companyName">
                      <Input
                        id="companyName"
                        autoComplete="organization"
                        placeholder={copy.placeholders.companyName}
                        className={surfaceInputClass}
                        {...register("companyName")}
                      />
                    </SurfaceFormField>
                    <SurfaceFormField label={copy.labels.jobTitle} htmlFor="jobTitle">
                      <Input
                        id="jobTitle"
                        autoComplete="organization-title"
                        placeholder={copy.placeholders.jobTitle}
                        className={surfaceInputClass}
                        {...register("jobTitle")}
                      />
                    </SurfaceFormField>
                  </div>

                  <SurfaceFormField
                    label={copy.labels.companySize}
                    htmlFor="companySize"
                    error={errors.companySize?.message}
                  >
                    <Controller
                      name="companySize"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value || undefined} onValueChange={field.onChange}>
                          <SelectTrigger
                            id="companySize"
                            className={selectTriggerClass}
                            aria-invalid={Boolean(errors.companySize)}
                            aria-describedby={errors.companySize ? "companySize-error" : undefined}
                            onBlur={field.onBlur}
                            ref={field.ref}
                          >
                            <SelectValue placeholder={copy.companySizePlaceholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {copy.companySizeOptions.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </SurfaceFormField>

                  <SurfaceFormField label={copy.labels.subject} htmlFor="subject" error={errors.subject?.message}>
                    <Controller
                      name="subject"
                      control={control}
                      render={({ field }) => (
                        <Select value={field.value || undefined} onValueChange={field.onChange}>
                          <SelectTrigger
                            id="subject"
                            className={selectTriggerClass}
                            aria-invalid={Boolean(errors.subject)}
                            aria-describedby={errors.subject ? "subject-error" : undefined}
                            onBlur={field.onBlur}
                            ref={field.ref}
                          >
                            <SelectValue placeholder={copy.subjectPlaceholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {copy.subjectOptions.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </SurfaceFormField>

                  <SurfaceFormField label={copy.labels.message} htmlFor="message" error={errors.message?.message}>
                    <Textarea
                      id="message"
                      rows={4}
                      placeholder={copy.placeholders.message}
                      className={cn(surfaceTextareaClass, "min-h-[120px] md:min-h-[140px]")}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      {...register("message")}
                    />
                  </SurfaceFormField>
                </div>

                <p className="mt-4 shrink-0 px-1 text-center font-urbanist text-[11px] leading-snug text-black/45 md:px-2 md:text-xs">
                  By submitting this form you agree to our{" "}
                  <a
                    href="https://docs.google.com/document/d/1wiC9mW3mDsCeqXz-dqr93RBr_pehru-h/edit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black/55 underline underline-offset-2 hover:text-rellia-teal"
                  >
                    Terms of Use
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://docs.google.com/document/d/17ZVWt9jSSCEfHKX0Np_D01ua4NuIb_Su/edit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black/55 underline underline-offset-2 hover:text-rellia-teal"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 inline-flex w-full shrink-0 items-center justify-center rounded-xl border-2 border-rellia-teal bg-rellia-teal px-6 py-3.5 font-host-grotesk text-sm font-semibold text-white transition-all duration-200 hover:bg-white hover:text-rellia-teal disabled:pointer-events-none disabled:opacity-60 md:py-4 md:text-base"
                >
                  {isSubmitting ? copy.sendingLabel : copy.submitLabel}
                </button>
              </form>
            </div>

            {/* DOM second → visual left on lg (50% width). Mobile: order-1 so copy stacks above form. */}
            <div className="order-1 flex w-full min-w-0 flex-col justify-center pb-8 lg:order-none lg:basis-0 lg:flex-1 lg:justify-center lg:pb-0 lg:pr-4">
              <div className="shrink-0">
                <p className="mb-3 font-urbanist text-[11px] font-semibold uppercase tracking-[0.2em] text-black/45 md:mb-4 md:text-xs">
                  {copy.heroBadge}
                </p>
                <h1 className="mb-4 text-4xl font-bold leading-[1.1] tracking-tight text-black md:mb-5 md:text-5xl lg:text-6xl">
                  {copy.pageTitle}
                </h1>
                <p className="max-w-xl whitespace-pre-line font-urbanist text-base leading-relaxed text-black/55 md:text-lg">
                  {copy.intro}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
