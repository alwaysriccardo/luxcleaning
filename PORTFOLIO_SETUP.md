# Portfolio System Setup Guide

This guide will help you set up the portfolio system with Cloudflare R2 and KV storage.

**Note:** This setup works for both Cloudflare Pages and Vercel deployments. The API routes automatically use Cloudflare's REST APIs to access R2 and KV.

## Prerequisites

- Cloudflare account
- Access to Cloudflare dashboard
- Your website deployed on Vercel or Cloudflare Pages

## Step 1: Create R2 Bucket

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **R2** in the sidebar
3. Click **Create bucket**
4. Name it: `luxcleaning-portfolio` (or your preferred name)
5. Click **Create bucket**

### Configure R2 Public Access

1. Click on your bucket
2. Go to **Settings** tab
3. Under **Public Access**, click **Allow Access**
4. Note the **Public URL** format: `https://pub-<bucket-name>.r2.dev`
5. This will be used in the upload endpoint

## Step 2: Create KV Namespace

1. In Cloudflare Dashboard, navigate to **Workers & Pages**
2. Click **KV** in the sidebar
3. Click **Create a namespace**
4. Name it: `PORTFOLIO_METADATA`
5. Click **Add**

## Step 3: Get Your Credentials

### Cloudflare Account ID

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Select your account (if you have multiple)
3. Copy your **Account ID** from the right sidebar

### R2 Credentials

1. Go to **R2** → Your bucket
2. Click **Manage R2 API Tokens**
3. Click **Create API token**
4. Select **Object Read & Write** permissions
5. Click **Create API Token**
6. **Save these credentials:**
   - Account ID
   - Access Key ID
   - Secret Access Key

### KV Namespace ID

1. Go to **Workers & Pages** → **KV**
2. Click on your `PORTFOLIO_METADATA` namespace
3. Copy the **Namespace ID**

### Cloudflare API Token

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)
2. Click **Create Token**
3. Use **Edit Cloudflare Workers** template or create custom token with:
   - **Account** → **Cloudflare Workers** → **Edit**
   - **Account** → **Account Settings** → **Read**
4. Click **Continue to summary** → **Create Token**
5. **Copy and save the token** (you won't see it again!)

## Step 4: Configure Your Deployment Platform

### For Vercel Deployment (Recommended)

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add the following environment variables:

```
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_API_TOKEN=your-api-token
CLOUDFLARE_KV_NAMESPACE_ID=your-kv-namespace-id
CLOUDFLARE_R2_BUCKET_NAME=luxcleaning-portfolio
CLOUDFLARE_R2_ACCESS_KEY_ID=your-r2-access-key-id
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
```

**Important:** Make sure your R2 bucket has public access enabled:
1. Go to R2 → Your bucket → Settings
2. Enable "Public Access"
3. The public URL will be: `https://pub-<bucket-name>.r2.dev`

5. Make sure to add these for **Production**, **Preview**, and **Development** environments
6. Click **Save**

**Important:** The API routes in `/api` folder will automatically use these environment variables to access Cloudflare R2 and KV.

### For Cloudflare Pages Deployment (Alternative)

1. Go to **Workers & Pages** → Your site
2. Go to **Settings** → **Variables and Secrets**
3. Add the following environment variables:

```
R2_BUCKET_NAME=luxcleaning-portfolio
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key-id
R2_SECRET_ACCESS_KEY=your-secret-access-key
PORTFOLIO_KV_NAMESPACE_ID=your-kv-namespace-id
```

4. Under **KV Namespace Bindings**, add:
   - Variable name: `PORTFOLIO_KV`
   - KV namespace: `PORTFOLIO_METADATA`

5. Under **R2 Bucket Bindings**, add:
   - Variable name: `R2_BUCKET`
   - R2 bucket: `luxcleaning-portfolio`

## Step 5: Deploy

### For Vercel:

1. Push your code to GitHub/GitLab
2. Connect repository in Vercel (if not already connected)
3. Vercel will automatically:
   - Detect Vite
   - Run `npm run build`
   - Deploy to production

Or deploy via CLI:
```bash
npm install -g vercel
vercel
```

### For Cloudflare Pages:

1. Install Wrangler CLI:
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Deploy:
```bash
npm run build
wrangler pages deploy dist
```

Or connect via Git in Cloudflare Pages dashboard.

## Step 7: Test the System

1. Visit `/admin-login.html` on your deployed site
2. Login with:
   - Username: `florinch`
   - Password: `Canyon1234567890!`
3. Create a test project
4. Upload a test image
5. Verify it appears in the portfolio

## Step 8: Add Portfolio to Your Main Site

To display the portfolio on your main site, you can:

1. Add a link in your navigation
2. Create a dedicated portfolio page
3. Or embed it in an existing section

Example: Add to your main `index.tsx`:
```tsx
import Portfolio from './portfolio';

// In your component:
<Portfolio />
```

## Troubleshooting

### Images not displaying
- Check R2 bucket public access is enabled
- Verify R2 public URL format in upload endpoint
- Check browser console for CORS errors

### Upload fails
- Verify R2 credentials are correct
- Check R2 bucket binding in Pages settings
- Ensure file size limits (R2 has limits)

### KV not saving
- Verify KV namespace binding
- Check KV namespace ID is correct
- Ensure you're using the correct binding name

### Authentication not working
- Check the credentials in `functions/api/admin/auth.ts`
- Verify sessionStorage is working (check browser console)

## Security Notes

⚠️ **Important**: The current authentication is NOT secure. It's a simple username/password check. For production, consider:
- Using Cloudflare Access
- Implementing proper session tokens
- Adding rate limiting
- Using environment variables for credentials

## File Structure

```
/
├── functions/
│   └── api/
│       ├── admin/
│       │   └── auth.ts
│       └── portfolio/
│           ├── projects.ts
│           ├── projects/
│           │   └── [id].ts
│           ├── upload.ts
│           └── items/
│               └── [id].ts
├── admin-login.html
├── admin-login.tsx
├── admin.html
├── admin-editor.tsx
├── portfolio.tsx
└── wrangler.toml (optional)
```

## Support

If you encounter issues:
1. Check Cloudflare Workers logs in dashboard
2. Check browser console for errors
3. Verify all environment variables are set
4. Ensure R2 and KV bindings are configured

Good luck! 🚀
