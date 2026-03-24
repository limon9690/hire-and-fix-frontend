type ServiceDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ServiceDetailsPage({
  params,
}: ServiceDetailsPageProps) {
  const { id } = await params;

  return (
    <section className="space-y-3">
      <h1 className="text-3xl font-semibold tracking-tight">
        Professional Details
      </h1>
      <p className="text-sm text-muted-foreground sm:text-base">
        Employee profile details page scaffold for: <span className="font-medium">{id}</span>
      </p>
    </section>
  );
}
