import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-start justify-center gap-4 px-4">
      <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
        404
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-zinc-600">
        The page you requested does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
      >
        Back to home
      </Link>
    </main>
  );
}
