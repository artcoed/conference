import $api from "..";
import { INotification } from "../../models/domain/INotification";
import { IGetFewResponse } from "../../models/response/IGetFewResponse";

export const NOTIFICATIONS = 'Notifications/';

export const getByUserNotifications = async () => {
    return await $api.get(NOTIFICATIONS + 'GetByUserNotifications') as IGetFewResponse<INotification>;
}

export const checkNotification = async (notification: INotification) => {
    return await $api.post(NOTIFICATIONS + 'CheckNotification',
        {
            notificationId: notification.id
        });
}