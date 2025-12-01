export default function Page() {
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=read:user`;

  return (
    <section className="mx-auto max-w-2xl space-y-6 rounded-2xl bg-white p-10 shadow-sm">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          OAuth Demo
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Sign in with GitHub</h1>
        <p className="text-slate-600">
          This page uses the App Router&apos;s file-system routing to kick off the GitHub OAuth
          flow. The route handler at <code className="font-semibold">/callback</code> finishes the
          exchange server-side to keep secrets out of the client.
        </p>
      </div>

      <a
        href={authUrl}
        className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
      >
        Sign in with GitHub
      </a>

      <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
        <p className="font-semibold text-slate-800">OAuth details</p>
        <p>
          Client ID and secret come from <code>.env.local</code> and never ship to the browser.
          Redirect URI is set to {process.env.REDIRECT_URI}.
        </p>
      </div>
    </section>
  );
}
