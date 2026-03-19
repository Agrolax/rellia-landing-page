"use client";

import { useMemo, useState } from "react";
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

type Category = {
  name: string;
  icon: React.ElementType;
  group: "Product" | "Clinical" | "Strategy" | "Operations" | "Legal";
};

const categories: Category[] = [
  { name: "Product design & UI/UX", icon: Palette, group: "Product" },
  { name: "Technology and architecture", icon: Cpu, group: "Product" },
  { name: "Regulatory compliance", icon: ShieldCheck, group: "Clinical" },
  { name: "Clinical evidence", icon: Activity, group: "Clinical" },
  { name: "Legal, privacy, cybersecurity", icon: Lock, group: "Legal" },
  { name: "IP strategy", icon: Lightbulb, group: "Legal" },
  { name: "Reimbursement strategy", icon: DollarSign, group: "Strategy" },
  { name: "Fundraising & investment", icon: TrendingUp, group: "Strategy" },
  { name: "Marketing and branding", icon: Megaphone, group: "Strategy" },
  { name: "Go-to-market strategy", icon: MapPin, group: "Strategy" },
  {
    name: "Navigating health system procurement and adoption",
    icon: Hospital,
    group: "Operations",
  },
  { name: "Customer success", icon: Users, group: "Operations" },
  { name: "Operations and scaling", icon: Layers, group: "Operations" },
  { name: "Leadership mindset and resilience", icon: Heart, group: "Operations" },
];

const groups: { key: Category["group"]; label: string }[] = [
  { key: "Product", label: "Product" },
  { key: "Clinical", label: "Clinical" },
  { key: "Strategy", label: "Strategy" },
  { key: "Operations", label: "Operations" },
  { key: "Legal", label: "Legal" },
];

export default function StartupDiagnostics() {
  const [activeGroup, setActiveGroup] = useState<Category["group"] | "All">("All");

  const filtered = useMemo(() => {
    if (activeGroup === "All") return categories;
    return categories.filter((c) => c.group === activeGroup);
  }, [activeGroup]);

  return (
    <section className="w-full bg-white py-16 md:py-24 px-6 md:px-10">
      <div className="max-w-[1300px] mx-auto">
        <SectionHeading
          align="center"
          title="Startup Diagnostic"
          description="A structured, deep-dive assessment of the areas most likely to unlock faster progress for your healthcare startup."
          className="max-w-2xl mx-auto mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 md:gap-14 items-start">
          {/* Left */}
          <div className="rounded-[24px] border border-black/10 bg-rellia-cream/60 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-rellia-mint/25 flex items-center justify-center shrink-0">
                <ClipboardCheck className="w-6 h-6 text-rellia-teal" strokeWidth={1.75} />
              </div>
              <h3 className="font-host-grotesk font-semibold text-black text-2xl md:text-3xl leading-tight tracking-tight">
                What you get
              </h3>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-black/5 bg-white/70 px-5 py-4">
                <p className="font-host-grotesk font-semibold text-black text-lg">Gap Analysis Report</p>
                <p className="font-urbanist text-black/70 text-sm md:text-base leading-relaxed mt-1">
                  A focused diagnostic to identify the top areas for improvement—so you know exactly what to do next.
                </p>
              </div>

              <div className="rounded-2xl border border-black/5 bg-white/70 px-5 py-4">
                <p className="font-host-grotesk font-semibold text-black text-lg">Advisor matching</p>
                <p className="font-urbanist text-black/70 text-sm md:text-base leading-relaxed mt-1">
                  Founders are matched with the most qualified advisors to tackle critical gaps directly.
                </p>
              </div>

              <div className="rounded-2xl border border-black/5 bg-white/70 px-5 py-4">
                <p className="font-host-grotesk font-semibold text-black text-lg">Actionable next steps</p>
                <p className="font-urbanist text-black/70 text-sm md:text-base leading-relaxed mt-1">
                  Clear priorities that help your team execute in the right order.
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="rounded-[24px] border border-black/10 bg-white p-6 md:p-8">
            <h4 className="font-host-grotesk font-semibold text-black text-xl md:text-2xl leading-tight tracking-tight mb-6">
              Categories we assess
            </h4>

            <div className="flex flex-wrap gap-3 mb-6">
              <button
                type="button"
                onClick={() => setActiveGroup("All")}
                className={`px-4 py-2 rounded-full border transition-colors font-host-grotesk text-sm md:text-base ${
                  activeGroup === "All"
                    ? "bg-rellia-teal text-white border-rellia-teal"
                    : "bg-white text-rellia-teal border-black/10 hover:border-black/20"
                }`}
              >
                All
              </button>
              {groups.map((g) => (
                <button
                  key={g.key}
                  type="button"
                  onClick={() => setActiveGroup(g.key)}
                  className={`px-4 py-2 rounded-full border transition-colors font-host-grotesk text-sm md:text-base ${
                    activeGroup === g.key
                      ? "bg-rellia-teal text-white border-rellia-teal"
                      : "bg-white text-rellia-teal border-black/10 hover:border-black/20"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div
                    key={cat.name}
                    className="group rounded-2xl border border-black/5 bg-rellia-cream/40 px-4 py-4 hover:bg-white transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-9 h-9 rounded-xl bg-rellia-mint/25 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-rellia-teal" strokeWidth={1.75} />
                      </span>
                      <p className="font-urbanist font-semibold text-black/80 text-sm md:text-base leading-snug">
                        {cat.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

