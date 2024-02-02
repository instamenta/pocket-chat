'use server';

import { sign_in_schema, sign_up_schema } from '@/lib/validation/schemas';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { initRequest } from '@/lib';
import { USERS, USERS_DYNAMIC } from '@/lib/variables';
import { revalidatePath } from 'next/cache';
import useUser from '@/lib/store';
import { I_UserSchema } from '@/lib/types';

export async function action_handleSignIn(
  state: { message: string },
  formData: FormData,
) {
  let data;
  try {
    data = sign_in_schema.parse({
      username: formData.get('username') ?? '',
      password: formData.get('password') ?? '',
    });
  } catch (error) {
    console.log('Invalid form:', formData);

    return { message: 'Invalid Data' };
  }

  const response = await fetch(
    USERS.sign_in.url as URL,
    initRequest({
      method: USERS.sign_in.method,
      body: {
        username: data.username,
        password: data.password,
      },
    }),
  );

  if (!response || !response.ok) {
    console.error(`HTTP error! Status: ${response.status}`);

    return { message: 'Invalid Credentials' };
  }

  const { token, id }: { token: string; id: string } = await response.json();

  if (token)
    cookies().set({
      name: 'X-Authorization-Token',
      value: token,
    });

  const user: I_UserSchema = await fetch(
    USERS_DYNAMIC.get_user_by_id.url(id),
  ).then((data) => data.json());
  useUser.getState().setUser(user);
  revalidatePath('/');
  redirect('/');
}

export async function action_handleSignUp(
  state: { message: string },
  formData: FormData,
) {
  let data;
  try {
    data = sign_up_schema.parse({
      firstName: formData.get('firstName') ?? '',
      lastName: formData.get('lastName') ?? '',
      username: formData.get('username') ?? '',
      email: formData.get('email') ?? '',
      password: formData.get('password') ?? '',
      confirmPassword: formData.get('confirmPassword') ?? '',
    });
  } catch (error) {
    console.log('Invalid form:', formData);

    return { message: 'Invalid Data' };
  }

  if (data.password != data.confirmPassword) {
    console.log('Passwords don\'t match');

    return { message: 'Passwords must match' };
  }

  const response = await fetch(
    USERS.sign_up.url as URL,
    initRequest({
      method: USERS.sign_up.method,
      body: {
        firstName: data.firstName,
        username: data.username,
        password: data.password,
        lastName: data.lastName,
        email: data.email,
      },
    }),
  );

  if (!response || !response.ok) {
    console.error(`HTTP error! Status: ${response.status}`);

    return { message: 'Invalid Credentials' };
  }

  const { token, id }: { token: string; id: string } = await response.json();

  if (token)
    cookies().set({
      name: 'X-Authorization-Token',
      value: token,
    });

  const user: I_UserSchema = await fetch(USERS_DYNAMIC.get_user_by_id.url(id))
    .then((data) => data.json())
    .catch(console.error);
  if (!user) return { message: 'Failed to set user data' };



  useUser.getState().setUser(user);
  redirect('/');
}
