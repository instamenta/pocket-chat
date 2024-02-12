import { STORY, STORY_DYNAMIC } from '@/lib/variables';
import { initRequest } from '@/lib';
import { handleResponse } from '@/lib/utilities';
import { T_FeedStory, T_StoryFull } from '@/lib/types';

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
