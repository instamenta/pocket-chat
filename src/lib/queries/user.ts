import { USERS, USERS_DYNAMIC } from '@/lib/variables';
import { initRequest } from '@/lib';
import { I_UserSchema } from '@/lib/types';
import { handleResponse } from '@/lib/utilities';

export const authenticateUser = async () =>
  fetch(
    USERS.auth_user.url,
    initRequest({
      method: USERS.auth_user.method,
      auth: true,
    }),
  ).then((r) => handleResponse<I_UserSchema>(r));

export const getUserByUsername = async (username: string) =>
  fetch(
    USERS_DYNAMIC.get_user_by_username.url(username),
    initRequest({
      method: USERS_DYNAMIC.get_user_by_username.method,
      auth: true,
    }),
  ).then((r) => handleResponse<I_UserSchema>(r));

export const getUserById = async (id: string) =>
  fetch(
    USERS_DYNAMIC.get_user_by_id.url(id),
    initRequest({
      method: USERS_DYNAMIC.get_user_by_id.method,
      auth: true,
    }),
  ).then((r) => handleResponse<I_UserSchema>(r));

export const updateProfilePublicInformation = async (body: {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}) =>
  fetch(
    USERS.update_profile_public_information.url,
    initRequest({
      method: USERS.update_profile_public_information.method,
      auth: true,
      body,
    }),
  ).then((r) =>
    handleResponse<{ token: string; id: string; userData: I_UserSchema }>(r),
  );

export const updateProfilePicture = async (picture_url: string) =>
  fetch(
    USERS.update_profile_picture.url,
    initRequest({
      method: USERS.update_profile_picture.method,
      auth: true,
      body: { picture_url },
    }),
  ).then((r) =>
    handleResponse<{ token: string; id: string; userData: I_UserSchema }>(r),
  );

export const updateBio = async (bio: string) =>
  fetch(
    USERS.update_bio.url,
    initRequest({
      method: USERS.update_bio.method,
      auth: true,
      body: { bio },
    }),
  ).then((r) =>
    handleResponse<{ token: string; id: string; userData: I_UserSchema }>(r),
  );
