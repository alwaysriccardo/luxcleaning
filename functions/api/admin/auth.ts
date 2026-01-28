// Admin authentication endpoint
export const onRequestPost: PagesFunction<{
  R2_BUCKET: R2Bucket;
  PORTFOLIO_KV: KVNamespace;
}> = async (context) => {
  const { username, password } = await context.request.json();

  // Simple authentication (not secure, as requested)
  const ADMIN_USERNAME = 'florinch';
  const ADMIN_PASSWORD = 'Canyon1234567890!';

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ success: false, error: 'Invalid credentials' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' }
  });
};
