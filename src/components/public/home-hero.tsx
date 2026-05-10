import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const trustPoints = ["Verified vendors", "Secure payments", "Real reviews"];

export function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-background via-background to-muted/40 px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="pointer-events-none absolute -right-12 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            Trusted home services platform
          </div>

          <div className="space-y-3">
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Book trusted home service professionals in minutes.
            </h1>
            <p className="max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
              Discover skilled providers, compare real reviews, and confirm
              bookings with transparent pricing and secure checkout.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/services"
              className="inline-flex h-9 items-center justify-center rounded-lg border border-transparent bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80"
            >
              Browse Services
            </Link>
            <Link
              href="/vendors"
              className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-background px-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted"
            >
              Company Profiles
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {trustPoints.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <Card className="border-border/80 bg-card/80 backdrop-blur">
          <CardHeader className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Upcoming booking
            </p>
            <CardTitle className="text-xl">AC Repair at Home</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="divide-y divide-border">
              <div className="flex items-center justify-between py-2.5">
                <span className="text-xs text-muted-foreground">Provider</span>
                <span className="font-medium">CoolAir Solutions</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-xs text-muted-foreground">Date</span>
                <span className="font-medium">Mar 28, 10:00 AM</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-xs text-muted-foreground">Duration</span>
                <span className="font-medium">2 hours</span>
              </div>
              <div className="flex items-center justify-between py-2.5">
                <span className="text-xs text-muted-foreground">Total</span>
                <span className="font-medium text-primary">$85.00</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Real-time availability, instant confirmation, and secure payment
              from one dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
