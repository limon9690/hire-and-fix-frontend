import Link from "next/link";

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-gradient-to-b from-background to-muted/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <p className="text-lg font-semibold tracking-tight">Hire & Fix</p>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              Built for homeowners and service businesses to connect, book, and
              manage trusted home service work.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Quick Links
            </p>
            <nav className="grid gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <Link href="/employees" className="hover:text-foreground">
                Browse Services
              </Link>
              <Link href="/vendors" className="hover:text-foreground">
                Company Profiles
              </Link>
              <Link href="/login" className="hover:text-foreground">
                Login
              </Link>
              <Link href="/register/user" className="hover:text-foreground">
                Register
              </Link>
            </nav>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Support
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>help@hireandfix.com</p>
              <p>Mon - Sat, 9:00 AM to 6:00 PM</p>
              <p>Response time: within 24 hours</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Hire & Fix. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
