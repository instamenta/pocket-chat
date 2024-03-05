import { GROUP, GROUP_DYNAMIC } from '@/lib/variables';
import { initRequest } from '@/lib';
import { handleResponse, handleResponseList, handleResponseVoid } from '@/lib/utilities';
import { I_Group, I_Recommendation } from '@/lib/types';

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

export const listGroupsByUser = async (id: string) =>
  fetch(
    GROUP_DYNAMIC.list_groups_by_user.url(id),
    initRequest({
      method: GROUP_DYNAMIC.list_groups_by_user.method,
      auth: true,
    }),
  ).then((r) => handleResponseList<I_Group>(r));

export const getGroupById = async (id: string) =>
  fetch(
    GROUP_DYNAMIC.get_group_by_id.url(id),
    initRequest({
      method: GROUP_DYNAMIC.get_group_by_id.method,
      auth: true,
    }),
  ).then((r) => handleResponse<I_Group>(r));

export const joinGroup = async (groupId: string) =>
  fetch(
    GROUP_DYNAMIC.join_group.url(groupId),
    initRequest({
      method: GROUP_DYNAMIC.join_group.method,
      auth: true,
    }),
  ).then(handleResponseVoid);

export const listGroupPublication = async (id: string) =>
  fetch(
    GROUP_DYNAMIC.list_publications.url(id),
    initRequest({
      method: GROUP_DYNAMIC.list_publications.method,
      auth: true,
    }),
  ).then((r) => handleResponseList<I_Recommendation>(r));

