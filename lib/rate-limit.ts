// lib/rate-limit.ts

type RateLimitStore = {
  count: number;
  resetTime: number;
};

// In-memory store for rate limits (resets on server restart)
const rateLimitMap = new Map<string, RateLimitStore>();

// Cleanup old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 10 * 60 * 1000);

interface RateLimitOptions {
  interval: number; // Time window in milliseconds
}

export class RateLimiter {
  private interval: number;

  constructor(options: RateLimitOptions) {
    this.interval = options.interval;
  }

  async check(limit: number, token: string): Promise<{
    success: boolean;
    limit: number;
    remaining: number;
    reset: number;
  }> {
    const now = Date.now();
    const key = `${token}`;
    
    let tokenData = rateLimitMap.get(key);

    // If no data or expired, create new entry
    if (!tokenData || now > tokenData.resetTime) {
      tokenData = {
        count: 0,
        resetTime: now + this.interval,
      };
      rateLimitMap.set(key, tokenData);
    }

    // Increment count
    tokenData.count += 1;

    const success = tokenData.count <= limit;
    const remaining = Math.max(0, limit - tokenData.count);
    const reset = tokenData.resetTime;

    return {
      success,
      limit,
      remaining,
      reset,
    };
  }
}

// Helper function to get client IP
export function getClientIp(request: Request): string {
  // Try various headers (works with most hosting providers)
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare
  
  if (cfConnectingIp) return cfConnectingIp;
  if (realIp) return realIp;
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  
  return '127.0.0.1'; // Fallback for local development
}

// Pre-configured rate limiters
export const imageLimiter = new RateLimiter({
  interval: 60 * 60 * 1000, // 1 hour
});

export const signedUrlLimiter = new RateLimiter({
  interval: 60 * 60 * 1000, // 1 hour
});

export const adminLimiter = new RateLimiter({
  interval: 60 * 60 * 1000, // 1 hour
});