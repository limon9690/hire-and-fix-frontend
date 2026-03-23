import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-start justify-center gap-4 px-4">
      <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
        403
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">Unauthorized</h1>
      <p className="text-zinc-600">
        You do not have permission to access this page.
      </p>
      <Link
        href="/login"
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
      >
        Go to login
      </Link>
    </main>
  );
}
