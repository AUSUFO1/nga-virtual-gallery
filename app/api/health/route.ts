
/*
 * GET /api/health
 * 
 * Simple health check endpoint
 * Returns 200 OK if the app is running
 */
export async function GET() {
  return Response.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'National Gallery of Art API is running'
  });
}
