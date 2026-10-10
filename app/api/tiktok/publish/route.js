export async function POST(req) {
  const at = (req.headers.get("cookie")||"").match(/tt_at=([^;]+)/)?.[1];
  if (!at) return new Response("Non connecté à TikTok. Reviens à l'accueil.", { status: 401 });
  const form = await req.formData();
  const file = form.get("video"); const caption = form.get("caption") || "";
  const buf = Buffer.from(await file.arrayBuffer()); const size = buf.length;
  // 1) init direct post FILE_UPLOAD (1 chunk)
  const init = await fetch("https://open.tiktokapis.com/v2/post/publish/video/init/", {
    method: "POST",
    headers: { "Authorization": "Bearer " + at, "Content-Type": "application/json" },
    body: JSON.stringify({
      post_info: { title: caption, privacy_level: "SELF_ONLY" },
      source_info: { source: "FILE_UPLOAD", video_size: size, chunk_size: size, total_chunk_count: 1 }
    })
  }).then(r=>r.json());
  const up = init?.data?.upload_url;
  if (!up) return new Response("init KO: " + JSON.stringify(init), { status: 400 });
  // 2) upload bytes
  await fetch(up, { method: "PUT", headers: { "Content-Type":"video/mp4",
    "Content-Range": `bytes 0-${size-1}/${size}` }, body: buf });
  return new Response("✅ Envoyé à TikTok (publish_id " + init.data.publish_id + "). Statut dans l'app.", { status: 200 });
}
