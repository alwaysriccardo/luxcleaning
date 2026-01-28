# Portfolio System Setup Guide

This guide will help you set up the portfolio system with Cloudflare R2 and KV storage.

## Prerequisites

- Cloudflare account
- Access to Cloudflare dashboard
- Your website deployed on Cloudflare Pages (or ready to deploy)

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

## Step 4: Configure Cloudflare Pages

### Option A: Using Cloudflare Pages Dashboard

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

### Option B: Using wrangler.toml (Recommended)

Create a `wrangler.toml` file in your project root:

```toml
name = "luxcleaning"
compatibility_date = "2024-01-01"

[env.production]
vars = { ENVIRONMENT = "production" }

[[env.production.kv_namespaces]]
binding = "PORTFOLIO_KV"
id = "your-kv-namespace-id"

[[env.production.r2_buckets]]
binding = "R2_BUCKET"
bucket_name = "luxcleaning-portfolio"
```

## Step 5: Update Upload Endpoint

The upload endpoint needs to know your R2 public URL. Update `functions/api/portfolio/upload.ts`:

Find this line:
```typescript
const r2Url = `https://pub-${context.env.R2_BUCKET.name}.r2.dev/${fileName}`;
```

Replace with your actual R2 public URL format:
```typescript
const r2Url = `https://pub-<your-bucket-name>.r2.dev/${fileName}`;
```

Or use an environment variable:
```typescript
const R2_PUBLIC_URL = context.env.R2_PUBLIC_URL || `https://pub-${context.env.R2_BUCKET.name}.r2.dev`;
const r2Url = `${R2_PUBLIC_URL}/${fileName}`;
```

## Step 6: Deploy

1. Install Wrangler CLI (if not already installed):
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Deploy your site:
```bash
npm run build
wrangler pages deploy dist
```

Or if using Cloudflare Pages from Git:
- Push your code to GitHub/GitLab
- Connect repository in Cloudflare Pages
- Configure build settings:
  - Build command: `npm run build`
  - Build output directory: `dist`

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
