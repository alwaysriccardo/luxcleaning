# Portfolio System Setup Guide

This guide will help you set up the portfolio system using Cloudflare R2 for both file storage and metadata storage.

**Note:** This setup works for both Cloudflare Pages and Vercel deployments. The API routes use Cloudflare R2's S3-compatible API to store both files and metadata.

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
3. Under **Public Access**, click **Enable Public Development URL**
4. Type `allow` to confirm
5. Note the **Public URL** format: `https://pub-<account-id>.r2.dev`
   - The account ID is shown in the public URL (not the bucket name)
   - Example: `https://pub-cea3e0ebe8a146528d60ab4085263b71.r2.dev`
6. This will be used to serve uploaded images/videos

### Configure CORS (Required for Video Uploads)

For large files (like videos) to upload directly from the browser, you need to configure CORS:

1. In your R2 bucket, go to **Settings** tab
2. Scroll to **CORS Policy**
3. Click **Add CORS policy** or **Edit**
4. Add this configuration:

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

5. Click **Save**

**Note:** For production, replace `"*"` in AllowedOrigins with your actual domain (e.g., `"https://luxcleaning.ch"`).

## Step 2: Get Your Credentials

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
6. **Save these credentials immediately** (you won't see the secret again):
   - **Account ID** (from above)
   - **Access Key ID**
   - **Secret Access Key**

## Step 3: Configure Your Deployment Platform

### For Vercel Deployment (Recommended)

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add the following environment variables:

```
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_R2_BUCKET_NAME=luxcleaning-portfolio
CLOUDFLARE_R2_ACCESS_KEY_ID=your-r2-access-key-id
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
CLOUDFLARE_R2_PUBLIC_ID=your-r2-public-id
```

### How to find CLOUDFLARE_R2_PUBLIC_ID:

1. Go to **R2** → Your bucket → **Settings**
2. Look at the **Public Development URL** (e.g., `https://pub-cea3e0ebe8a146528d60ab4085263b71.r2.dev`)
3. The ID is the part after `pub-` and before `.r2.dev`
4. Example: If your URL is `https://pub-cea3e0ebe8a146528d60ab4085263b71.r2.dev`, then:
   - `CLOUDFLARE_R2_PUBLIC_ID=cea3e0ebe8a146528d60ab4085263b71`

**Important:** Make sure your R2 bucket has public access enabled (see Step 1).

5. Make sure to add these for **Production**, **Preview**, and **Development** environments
6. Click **Save**

**Note:** The API routes in `/api` folder will automatically use these environment variables to access Cloudflare R2. Metadata is stored as a `projects.json` file in your R2 bucket.

### For Cloudflare Pages Deployment (Alternative)

1. Go to **Workers & Pages** → Your site
2. Go to **Settings** → **Variables and Secrets**
3. Add the following environment variables:

```
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_R2_BUCKET_NAME=luxcleaning-portfolio
CLOUDFLARE_R2_ACCESS_KEY_ID=your-access-key-id
CLOUDFLARE_R2_SECRET_ACCESS_KEY=your-secret-access-key
```

4. Under **R2 Bucket Bindings**, add:
   - Variable name: `R2_BUCKET`
   - R2 bucket: `luxcleaning-portfolio`

## Step 4: Deploy

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

## Step 5: Test the System

1. Visit `/admin-login.html` on your deployed site
2. Login with:
   - Username: `florinch`
   - Password: `Canyon1234567890!`
3. Create a test project
4. Upload a test image
5. Verify it appears in the portfolio section

## How It Works

- **File Storage**: Images and videos are stored directly in R2
- **Metadata Storage**: Project information (titles, item lists, etc.) is stored as a `projects.json` file in R2
- **Public Access**: Files are served via the public R2 URL: `https://pub-<account-id>.r2.dev/<file-path>`

## Troubleshooting

### Images not displaying
- Check R2 bucket public access is enabled
- Verify R2 public URL format matches: `https://pub-<account-id>.r2.dev` (uses account ID, not bucket name)
- Check browser console for CORS errors

### Upload fails
- Verify R2 credentials are correct in Vercel environment variables
- Check that all 4 environment variables are set:
  - `CLOUDFLARE_ACCOUNT_ID`
  - `CLOUDFLARE_R2_BUCKET_NAME`
  - `CLOUDFLARE_R2_ACCESS_KEY_ID`
  - `CLOUDFLARE_R2_SECRET_ACCESS_KEY`
- Ensure file size limits (R2 has limits, but they're generous)

### Project creation fails
- Check Vercel function logs for detailed error messages
- Verify R2 credentials have "Object Read & Write" permissions
- Make sure the bucket name matches exactly in environment variables

### Authentication not working
- Check the credentials in `api/admin/auth.ts`
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
├── api/
│   ├── admin/
│   │   └── auth.ts
│   └── portfolio/
│       ├── projects.ts
│       ├── projects/
│       │   └── [id].ts
│       ├── upload.ts
│       └── items/
│           └── [id].ts
├── admin-login.html
├── admin-login.tsx
├── admin.html
├── admin-editor.tsx
└── portfolio.tsx
```

## Support

If you encounter issues:
1. Check Vercel function logs in dashboard
2. Check browser console for errors
3. Verify all 4 environment variables are set correctly
4. Ensure R2 bucket has public access enabled

Good luck! 🚀
