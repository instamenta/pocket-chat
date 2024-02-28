import { GROUP } from '@/lib/variables';
import { initRequest } from '@/lib';
import { handleResponse, handleResponseList } from '@/lib/utilities';
import { I_Group } from '@/lib/types';

export const createGroup = async (
  name: string,
  description: string,
  imageUrl: string,
) =>
  fetch(
    GROUP.create_group.url,
    initRequest({
      method: GROUP.create_group.method,
      auth: true,
      body: { name, description, imageUrl },
    }),
  ).then((r) => handleResponse<{ id: string }>(r));

export const listGroups = async () =>
  fetch(
    GROUP.list_groups.url,
    initRequest({
      method: GROUP.list_groups.method,
      auth: true,
    }),
  ).then((r) => handleResponseList<I_Group>(r));

// export const listShortsByUserId = async (id: string) =>
//   fetch(
//     GROUP_DYNAMIC.list_shorts_by_user_id.url(id),
//     initRequest({
//       method: GROUP_DYNAMIC.list_shorts_by_user_id.method,
//       auth: true,
//     }),
//   ).then((r) => handleResponseList<I_ShortPopulated>(r));
