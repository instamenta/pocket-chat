import { SHORT, SHORT_DYNAMIC } from '@/lib/variables';
import { initRequest } from '@/lib';
import { handleResponse, handleResponseList } from '@/lib/utilities';
import { I_ShortPopulated, T_Comment, T_PopulatedComment } from '@/lib/types';

export const createShort = async (videoUrl: string, description: string = '') =>
  fetch(
    SHORT.create_short.url,
    initRequest({
      method: SHORT.create_short.method,
      auth: true,
      body: { videoUrl, description }
    })
  ).then((r) => handleResponse<{ id: string }>(r));

export const listShorts = async () =>
  fetch(
    SHORT.list_shorts.url,
    initRequest({
      method: SHORT.list_shorts.method,
      auth: true
    })
  ).then((r) => handleResponseList<I_ShortPopulated>(r));

export const listShortsByUserId = async (id: string) =>
  fetch(
    SHORT_DYNAMIC.list_shorts_by_user_id.url(id),
    initRequest({
      method: SHORT_DYNAMIC.list_shorts_by_user_id.method,
      auth: true
    })
  ).then((r) => handleResponseList<I_ShortPopulated>(r));

export const likeShort = async (id: string) =>
  fetch(
    SHORT_DYNAMIC.like_short.url(id),
    initRequest({
      method: SHORT_DYNAMIC.like_short.method,
      auth: true
    })
  ).then((res) => {
    if (!res || !res.ok) {
      console.error(
        `Failed to send request Status: ${res?.statusText}`,
        res.headers
      );
      return false;
    }
    return true;
  });

export const listCommentsByShort = async (shortId: string) =>
  fetch(
    SHORT_DYNAMIC.list_comments_by_story.url(shortId),
    initRequest({
      method: SHORT_DYNAMIC.list_comments_by_story.method,
      auth: true
    })
  ).then((r) => handleResponseList<T_PopulatedComment>(r));

export const createShortComment = async (
  shortId: string,
  body: {
    userId: string;
    content: string;
  }
) =>
  fetch(
    SHORT_DYNAMIC.create_comment.url(shortId),
    initRequest({
      method: SHORT_DYNAMIC.create_comment.method,
      auth: true,
      body
    })
  ).then((r) => handleResponse<T_Comment>(r));

export const deleteShortComment = async (commentId: string) =>
  fetch(
    SHORT_DYNAMIC.delete_comment.url(commentId),
    initRequest({
      method: SHORT_DYNAMIC.delete_comment.method,
      auth: true
    })
  ).then((res) => {
    if (!res || !res.ok) {
      console.error(
        `Failed to send request Status: ${res?.statusText}`,
        res.headers
      );
      return false;
    }
    return true;
  });

export const likeShortComment = async (commentId: string) =>
  fetch(
    SHORT_DYNAMIC.like_comment.url(commentId),
    initRequest({
      method: SHORT_DYNAMIC.like_comment.method,
      auth: true
    })
  ).then((res) => {
    if (!res || !res.ok) {
      console.error(
        `Failed to send request Status: ${res?.statusText}`,
        res.headers
      );
      return false;
    }
    return true;
  });
