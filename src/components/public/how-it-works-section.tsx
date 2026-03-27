import {
  SearchCheck,
  ShieldCheck,
  CreditCard,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Step = {
  id: string;
  title: string;
  description: string;
  note: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    id: "01",
    title: "Choose a Service",
    description:
      "Pick the service you need and browse trusted professionals near your location.",
    note: "Fast filters by service type and availability.",
    icon: SearchCheck,
  },
  {
    id: "02",
    title: "Compare Providers",
    description:
      "Review profiles, ratings, and pricing so you can confidently choose the right match.",
    note: "Verified providers with transparent details.",
    icon: ShieldCheck,
  },
  {
    id: "03",
    title: "Book & Pay Securely",
    description:
      "Confirm your booking in minutes and complete payment through a secure checkout flow.",
    note: "Track status and updates from your dashboard.",
    icon: CreditCard,
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-background p-5 sm:p-7 lg:p-8">
      <div className="pointer-events-none absolute right-6 top-0 h-px w-24 bg-gradient-to-l from-primary/40 via-primary/10 to-transparent" />

      <div className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            How It Works
          </p>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Book home services in three simple steps.
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            From discovery to confirmation, everything is designed to keep booking
            simple, transparent, and secure.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Card
                key={step.id}
                className="relative border-border/80 bg-card/90 backdrop-blur"
              >
                {index < steps.length - 1 ? (
                  <span className="pointer-events-none absolute top-10 left-[calc(100%-1rem)] z-10 hidden h-px w-8 bg-border lg:block" />
                ) : null}

                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md border border-border bg-background px-2 py-1 text-[11px] font-semibold tracking-wide text-muted-foreground">
                      Step {step.id}
                    </span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  <p className="text-xs font-medium text-primary/90">{step.note}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
