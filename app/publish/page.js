export default function Publish() {
  return (
    <main style={{maxWidth:560,margin:"0 auto",padding:"64px 24px",textAlign:"center"}}>
      <h2>Publier une vidéo sur TikTok</h2>
      <form action="/api/tiktok/publish" method="POST" encType="multipart/form-data" style={{marginTop:24}}>
        <input type="file" name="video" accept="video/mp4" required style={{color:"#fff"}} /><br/><br/>
        <textarea name="caption" placeholder="Légende + #hashtags" rows={3}
          style={{width:"100%",padding:10,borderRadius:8}} defaultValue="POV: tu patines avec du style 🔥 #ootd #streetwear #fyp"></textarea><br/><br/>
        <button type="submit" style={{background:"#FE2C55",color:"#fff",border:0,padding:"14px 24px",borderRadius:10,fontWeight:700}}>
          Publier sur TikTok
        </button>
      </form>
    </main>
  );
}
