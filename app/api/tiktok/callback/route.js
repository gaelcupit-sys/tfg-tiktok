import { tokenFromCode } from "../../../../lib/tiktok";
export async function GET(req) {
  const code = new URL(req.url).searchParams.get("code");
  if (!code) return new Response("code manquant", { status: 400 });
  const tok = await tokenFromCode(code);
  if (!tok.access_token) return new Response("Echec OAuth: " + JSON.stringify(tok), { status: 400 });
  // Démo : on affiche le succès + stocke en cookie httpOnly (pour la session de démo)
  const html = `<html><body style="font-family:system-ui;background:#0c0c0e;color:#fff;text-align:center;padding:64px">
    <h2 style="color:#FF5A1F">✅ Compte TikTok connecté</h2>
    <p>Token obtenu (expire dans ${tok.expires_in}s). Refresh token stocké.</p>
    <a href="/publish" style="color:#FE2C55">→ Publier une vidéo</a></body></html>`;
  const res = new Response(html, { headers: { "Content-Type": "text/html" } });
  res.headers.append("Set-Cookie", `tt_at=${tok.access_token}; HttpOnly; Path=/; Max-Age=${tok.expires_in}`);
  res.headers.append("Set-Cookie", `tt_rt=${tok.refresh_token}; HttpOnly; Path=/; Max-Age=31536000`);
  return res;
}
