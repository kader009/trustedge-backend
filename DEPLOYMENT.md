# 🚀 Vercel Deployment Guide

## Prerequisites

- Vercel account
- GitHub repository connected to Vercel
- MongoDB Atlas database (not localhost)

## Step 1: Update Environment Variables

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Add these variables:

```env
NODE_ENV=production
PORT=5000
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/trustedge
JWT_ACCESS_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
JWT_ACCESS_EXPIRES_IN=7d
JWT_REFRESH_EXPIRES_IN=365d
COOKIE_SECRET=your-cookie-secret
CLIENT_URL=https://your-frontend-domain.vercel.app
```

## Step 2: Project Structure

Make sure these files exist:

```
trustedge-backend/
├── api/
│   └── index.ts              # Vercel entry point
├── src/
│   ├── app.ts               # Express app (must export default)
│   └── server.ts            # Server setup
├── vercel.json              # Vercel configuration
└── .vercelignore            # Files to ignore
```

## Step 3: Deploy

### Option A: Auto Deploy (Recommended)

```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

Vercel will automatically deploy when you push to GitHub.

### Option B: Manual Deploy

```bash
npm install -g vercel
vercel login
vercel --prod
```

## Step 4: Test Deployment

Visit: `https://your-project.vercel.app`

Test API: `https://your-project.vercel.app/api/v1/auth/register`

## Common Issues & Solutions

### Issue 1: 404 NOT_FOUND

**Solution:** Check `vercel.json` configuration and ensure `api/index.ts` exists

### Issue 2: Module not found

**Solution:** Make sure all dependencies are in `dependencies` (not `devDependencies`)

### Issue 3: Database connection failed

**Solution:** Use MongoDB Atlas URL, not localhost. Whitelist all IPs (0.0.0.0/0)

### Issue 4: Environment variables not working

**Solution:** Add them in Vercel Dashboard, then redeploy

### Issue 5: CORS errors

**Solution:** Add your Vercel frontend URL to CORS origins in `app.ts`

## Vercel Limitations

- ⏱️ Serverless function timeout: 10 seconds (Hobby plan)
- 💾 Serverless function size: 50MB
- 🔄 Cold starts may occur (first request slower)
- 📦 No persistent file storage (use cloud storage for uploads)

## Production Checklist

- [ ] MongoDB Atlas URL configured
- [ ] All environment variables added in Vercel
- [ ] CORS origins updated with production URLs
- [ ] JWT secrets changed from default
- [ ] Frontend deployed and connected
- [ ] API endpoints tested
- [ ] Error handling verified

## Monitoring

Check logs in Vercel Dashboard:

- Runtime logs
- Build logs
- Function logs

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Node.js on Vercel](https://vercel.com/docs/concepts/functions/serverless-functions)
