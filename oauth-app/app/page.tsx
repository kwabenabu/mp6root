export default function Page() {
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=read:user`;

  return (
    <section className="mx-auto max-w-2xl space-y-6 rounded-2xl bg-white p-10 shadow-sm kwabena-border">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
          Welcome to kwabena's corner
        </p>
        <h1 className="text-3xl font-bold text-blue-700">Sign in to join my world</h1>
        <p className="text-slate-600">
          Hey! This is my custom GitHub login page. Hit the button below to sign in with your GitHub account and see your profile, the kwabena way.<br/>
          No data is stored—just a quick peek, then you're out!
        </p>
      </div>

      <a
        href={authUrl}
        className="inline-flex items-center justify-center rounded-lg bg-blue-700 px-4 py-2 text-white transition hover:bg-blue-800 kwabena-btn"
      >
        Sign in with GitHub
      </a>

      <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-700">
        <p className="font-semibold text-blue-800">Heads up</p>
        <p>
          This is a personal project by kwabena. Your secrets are safe—nothing is saved, and you can refresh to log out instantly.
        </p>
      </div>
    </section>
  );
}
