import { NextRequest, NextResponse } from 'next/server';
import { createSession } from '@/lib/session';

const BACKEND = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8081';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const backendRes = await fetch(`${BACKEND}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await backendRes.json().catch(() => ({}));

    if (!backendRes.ok || !data?.data?.access_token) {
      return NextResponse.json(
        { status: 'error', message: data?.message || 'Invalid credentials' },
        { status: backendRes.status || 401 },
      );
    }

    await createSession(data.data.access_token);

    const response = NextResponse.json({ status: 'success', data: data.data });

    // Forward pleco_refresh_token + pleco_device_id cookies set by the backend
    // so the browser holds the refresh token needed for silent re-auth.
    const setCookieHeaders = backendRes.headers.getSetCookie?.() ?? [];
    for (const cookie of setCookieHeaders) {
      response.headers.append('Set-Cookie', cookie);
    }

    return response;
  } catch {
    return NextResponse.json(
      { status: 'error', message: 'Network error' },
      { status: 500 },
    );
  }
}
