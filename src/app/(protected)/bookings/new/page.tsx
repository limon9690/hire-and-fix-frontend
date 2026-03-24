type NewBookingPageProps = {
  searchParams: Promise<{
    employeeId?: string;
  }>;
};

export default async function NewBookingPage({ searchParams }: NewBookingPageProps) {
  const params = await searchParams;
  const employeeId = params.employeeId ?? "";

  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-semibold tracking-tight">Request Booking</h1>
      <p className="text-sm text-muted-foreground sm:text-base">
        Booking setup page scaffold. Next step is schedule selection and booking confirmation.
      </p>
      <p className="text-xs text-muted-foreground">
        Selected employee:{" "}
        <span className="font-medium text-foreground">{employeeId || "Not provided"}</span>
      </p>
    </section>
  );
}
