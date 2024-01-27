'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function extractAuthToken() {
  const cookieStore = cookies();
  return cookieStore.get('X-Authorization-Token') ?? null;
}

export async function remoteAuthToken() {
  cookies().delete('X-Authorization-Token');
  redirect('/');
}

