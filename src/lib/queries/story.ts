import { STORY, STORY_DYNAMIC } from '@/lib/variables';
import { initRequest } from '@/lib';
import { handleResponse, handleResponseBoolean } from '@/lib/utilities';
import {
  T_Comment,
  T_FeedStory,
  T_PopulatedComment,
  T_StoryFull,
} from '@/lib/types';

export const createStory = async (imageUrl: string) =>
  fetch(
    STORY.create_story.url,
    initRequest({
      method: STORY.create_story.method,
      auth: true,
      body: { imageUrl },
    }),
  ).then((r) => handleResponse<{ id: string }>(r));

export const listStories = async () =>
  fetch(
    STORY.list_stories.url,
    initRequest({
      method: STORY.list_stories.method,
      auth: true,
    }),
  ).then((r) => handleResponse<T_FeedStory[]>(r));

export const listFeedStories = async () =>
  fetch(
    STORY.list_feed_stories.url,
    initRequest({
      method: STORY.list_feed_stories.method,
      auth: true,
    }),
  ).then((r) => handleResponse<T_FeedStory[]>(r));

export const listFriendStories = async (username: string) =>
  fetch(
    STORY_DYNAMIC.list_friend_stories_by_id.url(username),
    initRequest({
      method: STORY_DYNAMIC.list_friend_stories_by_id.method,
      auth: true,
    }),
  ).then((r) => handleResponse<T_StoryFull[]>(r));

export const likeStory = async (id: string) =>
  fetch(
    STORY_DYNAMIC.like_story.url(id),
    initRequest({
      method: STORY_DYNAMIC.like_story.method,
      auth: true,
    }),
  ).then(handleResponseBoolean);

export const listCommentsByStory = async (storyId: string) =>
  fetch(
    STORY_DYNAMIC.list_comments_by_story.url(storyId),
    initRequest({
      method: STORY_DYNAMIC.list_comments_by_story.method,
      auth: true,
    }),
  ).then((r) => handleResponse<T_PopulatedComment[]>(r));

export const createStoryComment = async (
  storyId: string,
  body: {
    userId: string;
    content: string;
  },
) =>
  fetch(
    STORY_DYNAMIC.create_comment.url(storyId),
    initRequest({
      method: STORY_DYNAMIC.create_comment.method,
      auth: true,
      body,
    }),
  ).then((r) => handleResponse<T_Comment>(r));

export const deleteStoryComment = async (commentId: string) =>
  fetch(
    STORY_DYNAMIC.delete_comment.url(commentId),
    initRequest({
      method: STORY_DYNAMIC.delete_comment.method,
      auth: true,
    }),
  ).then(handleResponseBoolean);

export const likeStoryComment = async (commentId: string) =>
  fetch(
    STORY_DYNAMIC.like_comment.url(commentId),
    initRequest({
      method: STORY_DYNAMIC.like_comment.method,
      auth: true,
    }),
  ).then(handleResponseBoolean);
