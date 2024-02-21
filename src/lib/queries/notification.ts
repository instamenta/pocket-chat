import { MESSAGES_DYNAMIC, NOTIFICATION, NOTIFICATION_DYNAMIC } from '@/lib/variables';
import { initRequest } from '@/lib';
import { handleResponse } from '@/lib/utilities';
import { I_Message } from '@/lib/types';

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
  ).then((r) => handleResponse(r));


export const markNotificationAsSeen = async (id: string) =>
  fetch(
    NOTIFICATION_DYNAMIC.mark_notification_as_seen.url(id),
    initRequest({
      method: NOTIFICATION_DYNAMIC.mark_notification_as_seen.method,
      auth: true,
    }),
  ).then(async (res): Promise<I_Message[]> => {
    if (!res || !res.ok) {
      console.log('HTTP Error', res?.statusText);
      return [];
    }
    return res.json();
  });
