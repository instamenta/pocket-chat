'use server';

import { cookies } from 'next/headers';

export async function extractAuthToken() {
  const cookieStore = cookies();
  return cookieStore.get('X-Authorization-Token') ?? null;
}