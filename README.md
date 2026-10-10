# TFG TikTok Integration (Next.js) — débloque le full-auto + l'audit TikTok

Mini-app web qui fait le parcours exigé par TikTok : "Se connecter avec TikTok" (Login Kit) → callback OAuth → publication (Content Posting API). C'est CE site qu'on filme pour la vidéo démo d'audit, et c'est lui qui héberge le token (auto-refresh).

## Déploiement Vercel (5 min)
1. `npm i -g vercel` puis `vercel` dans ce dossier (ou importer le repo sur vercel.com).
2. Variables d'env (Settings → Environment Variables) :
   - `TIKTOK_CLIENT_KEY`, `TIKTOK_CLIENT_SECRET` (voir ../04_TIKTOK/VIDEOS_AUTO/TIKTOK_CREDENTIALS.txt)
   - `APP_BASE_URL` = l'URL du déploiement, ex `https://tfg-tiktok.vercel.app`
3. Dans TikTok Developer → l'app → Login Kit → **Redirect URI** = `https://<ton-url>.vercel.app/api/tiktok/callback`
4. URL properties → vérifier `https://<ton-url>.vercel.app` (méthode URL prefix / signature file : Vercel sert le fichier depuis /public — dépose-le là).
5. Remplir les champs d'audit + **filmer la démo** : ouvrir le site → "Se connecter avec TikTok" → autoriser → /publish → publier → soumettre pour review.

## Après approbation = full-auto
Le token (+ refresh) vit côté serveur → le runner `../04_TIKTOK/VIDEOS_AUTO/run_daily.py` (ou un cron Vercel) publie 1 vidéo/jour sans intervention.
