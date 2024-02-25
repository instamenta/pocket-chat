import { SHORT, SHORT_DYNAMIC } from '@/lib/variables';
import { initRequest } from '@/lib';
import { handleResponse, handleResponseList } from '@/lib/utilities';
import { I_ShortPopulated } from '@/lib/types';

export const createShort = async (videoUrl: string, description: string = '') =>
  fetch(
    SHORT.create_short.url,
    initRequest({
      method: SHORT.create_short.method,
      auth: true,
      body: { videoUrl, description },
    }),
  ).then((r) => handleResponse<{ id: string }>(r));

export const listShorts = async () =>
  fetch(
    SHORT.list_shorts.url,
    initRequest({
      method: SHORT.list_shorts.method,
      auth: true,
    }),
  ).then((r) => handleResponseList<I_ShortPopulated>(r));

export const listShortsByUserId = async (id: string) =>
  fetch(
    SHORT_DYNAMIC.list_shorts_by_user_id.url(id),
    initRequest({
      method: SHORT_DYNAMIC.list_shorts_by_user_id.method,
      auth: true,
    }),
  ).then((r) => handleResponseList<I_ShortPopulated>(r));
