import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

export const GET = async function shows(req) {
  return withApiAuthRequired(async () => {
    try {
      const { accessToken } = await getAccessToken(req, {
        scopes: ['read:shows']
      });

      const apiPort = process.env.API_PORT || 3001;
      const response = await fetch(`http://localhost:${apiPort}/api/shows`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch shows: ${response.statusText}`);
      }

      const shows = await response.json();
      return NextResponse.json(shows);
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: error.status || 500 });
    }
  })();
};
