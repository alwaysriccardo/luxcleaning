// Vercel Serverless Function for admin authentication
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  // Simple authentication (not secure, as requested)
  const ADMIN_USERNAME = 'florinch';
  const ADMIN_PASSWORD = 'Canyon1234567890!';

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ success: false, error: 'Invalid credentials' });
}
