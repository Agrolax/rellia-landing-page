import {
  ClipboardCheck,
  Palette,
  Cpu,
  ShieldCheck,
  Activity,
  Lock,
  Lightbulb,
  DollarSign,
  TrendingUp,
  Megaphone,
  MapPin,
  Hospital,
  Users,
  Layers,
  Heart,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

type DiagnosticItem = {
  name: string;
  description: string;
  icon: React.ElementType;
};

const diagnosticItems: DiagnosticItem[] = [
  {
    name: "Product design & UI/UX",
    description:
      "Clarity, accessibility, and trust in the product experience—especially workflows clinicians and patients will actually use.",
    icon: Palette,
  },
  {
    name: "Technology and architecture",
    description:
      "Scalability, integrations, reliability, and security-minded engineering choices that hold up under healthcare workloads.",
    icon: Cpu,
  },
  {
    name: "Regulatory compliance",
    description:
      "Pathways and evidence expectations across the regulations that matter for your device, software, or service.",
    icon: ShieldCheck,
  },
  {
    name: "Clinical evidence",
    description:
      "Study plans, endpoints, and credibility signals that support adoption, partnerships, and payer conversations.",
    icon: Activity,
  },
  {
    name: "Legal, privacy, cybersecurity",
    description:
      "Contracts, data use, breach readiness, and cross-border considerations that reduce risk as you scale.",
    icon: Lock,
  },
  {
    name: "IP strategy",
    description:
      "What to protect, when to file, and how IP supports differentiation, fundraising, and partnership discussions.",
    icon: Lightbulb,
  },
  {
    name: "Reimbursement strategy",
    description:
      "Coding, coverage, and economic narratives that connect your solution to how customers actually get paid.",
    icon: DollarSign,
  },
  {
    name: "Fundraising & investment",
    description:
      "Narrative, milestones, diligence readiness, and investor alignment for health tech–specific expectations.",
    icon: TrendingUp,
  },
  {
    name: "Marketing and branding",
    description:
      "Positioning, claims discipline, and channel strategy that builds demand without creating regulatory headaches.",
    icon: Megaphone,
  },
  {
    name: "Go-to-market strategy",
    description:
      "Segments, pilots, pricing hypotheses, and a realistic path from first users to repeatable revenue.",
    icon: MapPin,
  },
  {
    name: "Navigating health system procurement and adoption",
    description:
      "Stakeholder mapping, pilot design, and the operational realities of selling into hospitals and health systems.",
    icon: Hospital,
  },
  {
    name: "Customer success",
    description:
      "Onboarding, retention, and expansion motions that keep clinical users successful and reduce churn.",
    icon: Users,
  },
  {
    name: "Operations and scaling",
    description:
      "Processes, hiring, and execution systems that keep quality high as the team and customer base grow.",
    icon: Layers,
  },
  {
    name: "Leadership mindset and resilience",
    description:
      "Decision-making under uncertainty, stakeholder management, and sustainability for founders in a long-cycle industry.",
    icon: Heart,
  },
];

export default function StartupDiagnostics() {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-[1300px] mx-auto">
        <SectionHeading
          align="center"
          title="Startup Diagnostic"
          description="A structured, deep-dive assessment of the areas most likely to unlock faster progress for your healthcare startup."
          className="max-w-2xl mx-auto mb-12 md:mb-16"
        />

        <div className="rounded-[24px] border border-black/10 bg-white p-6 md:p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-rellia-mint/25 flex items-center justify-center shrink-0">
              <ClipboardCheck className="w-6 h-6 text-rellia-teal" strokeWidth={1.75} />
            </div>
            <h4 className="font-host-grotesk font-semibold text-black text-xl md:text-2xl leading-tight tracking-tight">
              Categories we assess
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {diagnosticItems.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.name}
                  tabIndex={0}
                  className={cn(
                    "group rounded-2xl border border-black/5 bg-rellia-cream/40 px-4 py-4",
                    "transition-all duration-200 focus-visible:outline-none",
                    "hover:bg-rellia-teal hover:border-rellia-teal hover:shadow-md",
                    "focus-within:bg-rellia-teal focus-within:border-rellia-teal focus-within:shadow-md",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-xl bg-rellia-mint/25 group-hover:bg-white/15 group-focus-within:bg-white/15 flex items-center justify-center shrink-0 transition-colors duration-200">
                      <Icon className="w-5 h-5 text-rellia-teal group-hover:text-rellia-mint group-focus-within:text-rellia-mint transition-colors duration-200" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <p className="font-urbanist font-semibold text-black/80 group-hover:text-white group-focus-within:text-white text-sm md:text-base leading-snug transition-colors duration-200">
                        {cat.name}
                      </p>
                      <p
                        className={cn(
                          "font-urbanist text-sm leading-relaxed overflow-hidden transition-all duration-200",
                          "text-black/65 group-hover:text-white/85 group-focus-within:text-white/85",
                          "mt-2 max-lg:max-h-48 max-lg:opacity-100",
                          "lg:mt-0 lg:max-h-0 lg:opacity-0",
                          "lg:group-hover:mt-2 lg:group-hover:max-h-48 lg:group-hover:opacity-100",
                          "lg:group-focus-within:mt-2 lg:group-focus-within:max-h-48 lg:group-focus-within:opacity-100",
                        )}
                      >
                        {cat.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
