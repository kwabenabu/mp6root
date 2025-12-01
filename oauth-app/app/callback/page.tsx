import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAccessToken } from "@/lib/getAccessToken";
import { getUserInfo } from "@/lib/getUserInfo";

export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

type GitHubUser = {
  login: string;
  name?: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  email?: string | null;
  location?: string | null;
};

export default async function CallbackPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const codeParam = params.code;
  const code = Array.isArray(codeParam) ? codeParam[0] : codeParam;

  if (!code) {
    redirect("/");
  }

  let user: GitHubUser | null = null;
  let errorMessage: string | null = null;
  let errorDetail: string | undefined;

  try {
    const token = await getAccessToken(code);

    if (!token) {
      errorMessage = "No access token returned. Please try signing in again.";
    } else {
      user = await getUserInfo(token);
    }
  } catch (error) {
    errorMessage = "OAuth exchange failed. Please try again.";
    errorDetail = (error as Error).message;
  }

  if (!user || errorMessage) {
    return (
      <ErrorBox
        message={errorMessage ?? "Unable to load your GitHub profile."}
        detail={errorDetail}
      />
    );
  }

  return (
    <section className="mx-auto flex max-w-2xl flex-col gap-6 rounded-2xl bg-white p-10 shadow-sm">
      <header className="flex items-center gap-4">
        <Image
          src={user.avatar_url}
          alt={`${user.login} avatar`}
          width={64}
          height={64}
          className="h-16 w-16 rounded-full border border-slate-200 object-cover"
        />
        <div>
          <p className="text-sm uppercase tracking-wide text-slate-500">
            Signed in with GitHub
          </p>
          <h1 className="text-2xl font-bold text-slate-900">
            {user.name ?? user.login}
          </h1>
          <p className="text-slate-600">@{user.login}</p>
        </div>
      </header>

      <div className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
        <InfoRow label="Public repos" value={user.public_repos} />
        <InfoRow label="Followers" value={user.followers} />
        <InfoRow label="Following" value={user.following} />
        <InfoRow label="Email" value={user.email ?? "—"} />
        <InfoRow label="Location" value={user.location ?? "—"} />
        <InfoRow
          label="Profile"
          value={
            <a
              href={user.html_url}
              className="text-slate-900 underline"
              target="_blank"
              rel="noreferrer"
            >
              {user.html_url}
            </a>
          }
        />
      </div>

      <div className="rounded-lg bg-slate-50 p-4 text-xs text-slate-600">
        <p>
          Data is fetched server-side during the callback using the GitHub access token. No session
          is stored; refresh to sign in again.
        </p>
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded-lg border border-slate-100 p-3">
      <span className="text-xs uppercase tracking-wide text-slate-500">{label}</span>
      <span className="text-base font-semibold text-slate-900">{value}</span>
    </div>
  );
}

function ErrorBox({ message, detail }: { message: string; detail?: string }) {
  return (
    <section className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
      <h1 className="text-xl font-bold text-red-700">Something went wrong</h1>
      <p className="mt-2 text-slate-700">{message}</p>
      {detail ? <p className="mt-1 text-xs text-slate-500">{detail}</p> : null}
      <Link
        href="/"
        className="mt-4 inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
      >
        Back to sign in
      </Link>
    </section>
  );
}
