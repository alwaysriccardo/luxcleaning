// API route to generate presigned PUT URLs for direct R2 uploads
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
    const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'luxcleaning-portfolio';

    if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
      return res.status(500).json({ 
        success: false, 
        error: 'R2 credentials not configured' 
      });
    }

    const { fileName, contentType } = req.body;

    if (!fileName || !contentType) {
      return res.status(400).json({ 
        success: false, 
        error: 'fileName and contentType are required' 
      });
    }

    const s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    // Generate presigned POST URL (valid for 1 hour)
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      ContentType: contentType,
    });

    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    // Get the public URL for the file
    const r2PublicId = process.env.CLOUDFLARE_R2_PUBLIC_ID || accountId;
    const publicUrl = `https://pub-${r2PublicId}.r2.dev/${fileName}`;

    return res.status(200).json({ 
      success: true, 
      presignedUrl,
      publicUrl,
      fileName 
    });
  } catch (error: any) {
    console.error('Presigned URL generation error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to generate presigned URL: ' + error.message 
    });
  }
}
