// Vercel Edge Function to proxy API requests
// This handles all /api/* requests and proxies them to the backend

export default async function handler(req) {
  const { path } = req.query;
  const fullPath = Array.isArray(path) ? path.join('/') : path;
  
  // Construct the target URL
  const targetUrl = `http://194.195.92.92/alumni-backend/api/${fullPath}`;
  
  try {
    // Forward the request to the backend
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        'Content-Type': req.headers.get('content-type') || 'application/json',
        'Accept': 'application/json',
        ...(req.headers.get('authorization') && { 'Authorization': req.headers.get('authorization') })
      },
      body: req.method === 'POST' || req.method === 'PUT' ? await req.text() : undefined
    });

    // Get the response data
    const data = await response.text();
    
    // Return the response
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    });
    
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(JSON.stringify({ error: 'Proxy failed', message: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export const config = {
  runtime: 'edge'
}