export async function getAccessToken(code: string) {
  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID ?? "",
      client_secret: process.env.GITHUB_CLIENT_SECRET ?? "",
      code,
      redirect_uri: process.env.REDIRECT_URI ?? "",
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to exchange auth code for access token");
  }

  const data = await res.json();
  return data.access_token as string | undefined;
}
