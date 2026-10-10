export const CK = process.env.TIKTOK_CLIENT_KEY;
export const CS = process.env.TIKTOK_CLIENT_SECRET;
export const BASE = process.env.APP_BASE_URL || "https://tfg-tiktok.vercel.app";
export const REDIRECT = BASE + "/api/tiktok/callback";
export const SCOPES = "user.info.basic,video.upload,video.publish";

export async function tokenFromCode(code) {
  const r = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_key: CK, client_secret: CS, code,
      grant_type: "authorization_code", redirect_uri: REDIRECT })
  });
  return r.json();
}
export async function refresh(refresh_token) {
  const r = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_key: CK, client_secret: CS,
      grant_type: "refresh_token", refresh_token })
  });
  return r.json();
}
