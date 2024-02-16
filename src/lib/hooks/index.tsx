import React from 'react';
import { I_UserSchema } from '@/lib/types';
import { getUserById, getUserByUsername } from '@/lib/queries/user';

export async function useRecipient(
  filter: string,
  type: 'username' | 'id',
  callback?: (value: React.SetStateAction<I_UserSchema | null>) => void,
) {
  let d: void | I_UserSchema;
  if (type === 'username') {
    d = await getUserByUsername(filter);
  } else {
    d = await getUserById(filter);
  }
  if (!d) {
    console.error(`Failed to get recipient by ${type}: ${filter}`);
    return null;
  }
  if (callback) callback(d);
  return d;
}
