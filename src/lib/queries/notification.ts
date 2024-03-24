import { NOTIFICATION, NOTIFICATION_DYNAMIC } from '@/lib/variables';
import { initRequest } from '@/lib';
import { handleResponse, handleResponseBoolean, handleResponseList } from '@/lib/utilities';
import { I_PopulatedNotification } from '@/lib/types';

export const createNotification = async (body: {
  recipient: string;
  type: string;
  seen: boolean;
  content: string;
}) =>
  fetch(
    NOTIFICATION.create_notification.url,
    initRequest({
      method: NOTIFICATION.create_notification.method,
      auth: true,
      body,
    }),
  ).then((r) => handleResponse<{ id: string }>(r));

export const martAllNotificationsAsSeen = async () =>
  fetch(
    NOTIFICATION.mark_all_notifications_as_seen.url,
    initRequest({
      method: NOTIFICATION.mark_all_notifications_as_seen.method,
      auth: true,
    }),
  ).then(handleResponseBoolean);

export const markNotificationAsSeen = async (id: string) =>
  fetch(
    NOTIFICATION_DYNAMIC.mark_notification_as_seen.url(id),
    initRequest({
      method: NOTIFICATION_DYNAMIC.mark_notification_as_seen.method,
      auth: true,
    }),
  ).then(handleResponseBoolean);

export const listNotifications = async (
  filter: 'all' | 'seen' | 'unseen' = 'all',
) =>
  fetch(
    NOTIFICATION_DYNAMIC.list_notifications.url(filter),
    initRequest({
      method: NOTIFICATION_DYNAMIC.list_notifications.method,
      auth: true,
    }),
  ).then(r => handleResponseList<I_PopulatedNotification>(r));
