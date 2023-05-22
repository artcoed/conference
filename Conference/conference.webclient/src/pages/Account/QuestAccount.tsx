import { Input, Button, Row, List, notification, message } from 'antd';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../../components/Heading/Heading';
import MeetingsList from '../../components/MeetingsList/MeetingsList';
import NotificationsList from '../../components/NotificationsList/NotificationsList';
import $api from '../../http';
import { getByInvitedUserMeetings } from '../../http/meetings';
import { checkNotification, getByUserNotifications } from '../../http/notifications';
import { IMeeting } from '../../models/domain/IMeeting';
import { INotification } from '../../models/domain/INotification';
import { IMessagesErrorResponse } from '../../models/response/IMessagesErrorResponse';
import { getMeetingPath } from '../../routes';

const QuestAccount: FC = () => {
    const navigate = useNavigate();
    const [meetings, setMeetings] = useState<IMeeting[]>([] as IMeeting[])
    const [isLoadingMeetings, setIsLoadingMeetings] = useState(true)
    const [notifications, setNotifications] = useState<INotification[]>([] as INotification[])
    const [isLoadingNotifications, setIsLoadingNotifications] = useState(false)
    const [isLoadingCheckNotification, setIsLoadingCheckNotification] = useState(false)

    const navigateToMeetingPage = (meeting: IMeeting) => {

    }

    const updateMeetings = async () => {
        setIsLoadingMeetings(true)
        try {
            const response = await getByInvitedUserMeetings();
            setMeetings(response.data);
        } catch (e) {
        }
        setIsLoadingMeetings(false)
    }

    const updateNotifications = async () => {
        setIsLoadingNotifications(true)
        try {
            const response = await getByUserNotifications();
            setNotifications(response.data.filter(x => !x.isChecked));
        } catch (e) {
        }
        setIsLoadingNotifications(false)
    }

    const tryCheckNotification = async (notification: INotification) => {
        setIsLoadingCheckNotification(true)
        try {
            await checkNotification({ id: notification.id });
            setNotifications(notifications?.filter(x => x.id !== notification.id))
            success("Оповещение успешно прочитано")
        } catch (e) {
            const err = e as IMessagesErrorResponse
            if (err.response) {
                error(err.response.data[0].message)
            }
        }
        setIsLoadingCheckNotification(false)
    }

    useEffect(() => {
        updateMeetings()
        updateNotifications()
    }, [])

    return (
        <div>
            <Heading content="Аккаунт" />

            <NotificationsList
                isLoading={isLoadingNotifications}
                notifications={notifications}
                buttons={[
                    { content: "Прочитать", onClick: tryCheckNotification }
                ]}
            />

            <MeetingsList
                isLoading={isLoadingMeetings}
                meetings={meetings}
                buttons={[
                    { content: "Присоединиться", onClick: navigateToMeetingPage }
                ]}
            />
        </div>
    );
};

export default QuestAccount;
