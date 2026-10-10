import { CK, REDIRECT, SCOPES } from "../lib/tiktok";
export default function Home() {
  const url = "https://www.tiktok.com/v2/auth/authorize/?" + new URLSearchParams({
    client_key: CK || "", response_type: "code", scope: SCOPES,
    redirect_uri: REDIRECT, state: "tfg"
  }).toString();
  return (
    <main style={{maxWidth:560,margin:"0 auto",padding:"64px 24px",textAlign:"center"}}>
      <div style={{fontSize:40,fontWeight:800,letterSpacing:1}}>THE FIRE GIRL</div>
      <p style={{color:"#FF5A1F",marginTop:4}}>Publication TikTok — @iceskatingfactory</p>
      <p style={{color:"#bbb",marginTop:32,lineHeight:1.5}}>
        Connecte le compte TikTok de la marque pour publier les vidéos produits automatiquement.
      </p>
      <a href={url} style={{display:"inline-block",marginTop:24,background:"#FE2C55",color:"#fff",
        padding:"16px 28px",borderRadius:10,fontWeight:700,textDecoration:"none",fontSize:18}}>
        Se connecter avec TikTok
      </a>
    </main>
  );
}
