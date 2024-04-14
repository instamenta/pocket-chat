import { PUBLICATIONS, PUBLICATIONS_DYNAMIC } from '@/lib/variables';
import { initRequest } from '@/lib';
import { I_Publication, I_Recommendation } from '@/lib/types';
import { handleResponse, handleResponseBoolean, handleResponseList } from '@/lib/utilities';

export const listPublications = async () =>
  fetch(
    PUBLICATIONS.list_publications.url,
    initRequest({
      method: PUBLICATIONS.list_publications.method,
      auth: true,
    }),
  ).then((r) => handleResponse<I_Publication[]>(r));

export const getRecommendations = async () =>
  fetch(
    PUBLICATIONS.get_recommendations.url,
    initRequest({
      method: PUBLICATIONS.get_recommendations.method,
      auth: true,
    }),
  ).then((r) => handleResponseList<I_Recommendation>(r));

export const createPublication = async (body: {
  description: string;
  images: string[];
  publication_status: string;
}) =>
  fetch(
    PUBLICATIONS.create_publication.url,
    initRequest({
      method: PUBLICATIONS.create_publication.method,
      auth: true,
      body,
    }),
  ).then((r) => handleResponse<{ id: string }>(r));

export const getPublicationById = async (id: string) =>
  fetch(
    PUBLICATIONS_DYNAMIC.get_publication_by_id.url(id),
    initRequest({
      method: PUBLICATIONS_DYNAMIC.get_publication_by_id.method,
      auth: true,
    }),
  ).then((r) => handleResponse<I_Publication>(r));

export const getPublicationsByUserId = async (userId: string) =>
  fetch(
    PUBLICATIONS_DYNAMIC.get_publications_by_user_id.url(userId),
    initRequest({
      method: PUBLICATIONS_DYNAMIC.get_publications_by_user_id.method,
      auth: true,
    }),
  ).then((r) => handleResponse<I_Recommendation[]>(r));

export const getPublicationsCountByUserId = async (userId: string) =>
  fetch(
    PUBLICATIONS_DYNAMIC.get_publications_count_by_user_id.url(userId),
    initRequest({
      method: PUBLICATIONS_DYNAMIC.get_publications_count_by_user_id.method,
      auth: true,
    }),
  ).then((r) => handleResponse<{count: number}>(r));

export const updatePublication = async (
  id: string,
  body: {
    content?: string;
    images?: string[];
    publication_status?: string;
  },
) =>
  fetch(
    PUBLICATIONS_DYNAMIC.update_publication.url(id),
    initRequest({
      method: PUBLICATIONS_DYNAMIC.update_publication.method,
      auth: true,
      body,
    }),
  ).then((r) => handleResponse<{ id: string }>(r));

export const likePublication = async (id: string) =>
  fetch(
    PUBLICATIONS_DYNAMIC.like_publication.url(id),
    initRequest({
      method: PUBLICATIONS_DYNAMIC.like_publication.method,
      auth: true,
    }),
  ).then(handleResponseBoolean);
