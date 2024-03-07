import { LIVE, LIVE_DYNAMIC } from '@/lib/variables';
import { initRequest } from '@/lib';
import {
  handleResponse,
  handleResponseList,
  handleResponseVoid,
} from '@/lib/utilities';
import {
  E_LiveStates,
  T_LiveMessagePopulated,
  T_LivePopulated,
} from '@/lib/types';

export const createLive = async () =>
  fetch(
    LIVE.create_live.url,
    initRequest({
      method: LIVE.create_live.method,
      auth: true,
    }),
  ).then((r) => handleResponse<{ id: string }>(r));

export const listLives = async () =>
  fetch(
    LIVE.list_lives.url,
    initRequest({
      method: LIVE.list_lives.method,
      auth: true,
    }),
  ).then((r) => handleResponseList<T_LivePopulated>(r));

export const updateLiveState = async (state: E_LiveStates = 'ended') =>
  fetch(
    LIVE_DYNAMIC.update_live_state.url(state),
    initRequest({
      method: LIVE_DYNAMIC.update_live_state.method,
      auth: true,
    }),
  ).then(handleResponseVoid);

export const listLiveMessages = async (liveId: string) =>
  fetch(
    LIVE_DYNAMIC.list_live_messages.url(liveId),
    initRequest({
      method: LIVE_DYNAMIC.list_live_messages.method,
      auth: true,
    }),
  ).then((r) => handleResponseList<T_LiveMessagePopulated>(r));
