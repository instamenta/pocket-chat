import { COMMENTS_DYNAMIC } from '@/lib/variables';
import { initRequest } from '@/lib';
import { T_Comment, T_PopulatedComment } from '@/lib/types';
import { handleResponse } from '@/lib/utilities';

export const listCommentsByPublication = async (publicationId: string) =>
  fetch(
    COMMENTS_DYNAMIC.list_comments_by_publication.url(publicationId),
    initRequest({
      method: COMMENTS_DYNAMIC.list_comments_by_publication.method,
      auth: true,
    }),
  ).then((r) => handleResponse<T_PopulatedComment[]>(r));

export const createComment = async (
  publicationId: string,
  body: {
    userId: string;
    content: string;
  },
) =>
  fetch(
    COMMENTS_DYNAMIC.create_comment.url(publicationId),
    initRequest({
      method: COMMENTS_DYNAMIC.create_comment.method,
      auth: true,
      body,
    }),
  ).then((r) => handleResponse<T_Comment>(r));

export const deleteComment = async (commentId: string) =>
  fetch(
    COMMENTS_DYNAMIC.delete_comment.url(commentId),
    initRequest({
      method: COMMENTS_DYNAMIC.delete_comment.method,
      auth: true,
    }),
  ).then((r) => handleResponse<void>(r));

export const likeComment = async (commentId: string) =>
  fetch(
    COMMENTS_DYNAMIC.like_comment.url(commentId),
    initRequest({
      method: COMMENTS_DYNAMIC.like_comment.method,
      auth: true,
    }),
  ).then((r) => handleResponse<void>(r));
