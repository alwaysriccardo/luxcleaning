// Vercel Serverless Function for admin authentication
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Parse request body
  let body = req.body;
  if (typeof req.body === 'string') {
    try {
      body = JSON.parse(req.body);
    } catch (e) {
      return res.status(400).json({ success: false, error: 'Invalid request body' });
    }
  }

  const { username, password } = body;

  // Simple authentication (not secure, as requested)
  const ADMIN_USERNAME = 'florinch';
  const ADMIN_PASSWORD = 'Canyon1234567890!';

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ success: false, error: 'Invalid credentials' });
}
