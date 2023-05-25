import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../../components/Heading/Heading';
import MeetingsList from '../../components/MeetingsList/MeetingsList';
import NotificationsList from '../../components/NotificationsList/NotificationsList';
import { getByInvitedUserMeetings } from '../../http/meetings';
import { checkNotification, getByUserNotifications } from '../../http/notifications';
import { IMeeting } from '../../models/domain/IMeeting';
import { INotification } from '../../models/domain/INotification';
import { IMessagesErrorResponse } from '../../models/response/IMessagesErrorResponse';
import { getMeetingPath } from '../../routes';

const QuestAccount: FC<{ fail: (message: string) => void, success: (message: string) => void }> = ({ fail, success }) => {
    const navigate = useNavigate();

    const [meetings, setMeetings] = useState<IMeeting[]>([] as IMeeting[]);
    const [isLoadingMeetings, setIsLoadingMeetings] = useState<boolean>(true);

    const [notifications, setNotifications] = useState<INotification[]>([] as INotification[]);
    const [isLoadingNotifications, setIsLoadingNotifications] = useState<boolean>(false);

    const updateMeetings = async () => {
        setIsLoadingMeetings(true);

        try {
            const response = await getByInvitedUserMeetings();
            setMeetings(response.data);
        } catch (e) { }

        setIsLoadingMeetings(false);
    }

    const updateNotifications = async () => {
        setIsLoadingNotifications(true);

        try {
            const response = await getByUserNotifications();
            setNotifications(response.data
                .filter(x => !x.isChecked));
        } catch (e) { }

        setIsLoadingNotifications(false);
    }

    const navigateToMeetingPage = (meeting: IMeeting) => {
        if (!meeting.id) {
            fail("Ошибка перехода на совещание");
            return;
        }

        const path = getMeetingPath(meeting.id.toString());
        navigate(path);
    }

    const tryCheckNotification = async (notification: INotification) => {
        try {
            await checkNotification({ id: notification.id });
            setNotifications(notifications
                ?.filter(x => x.id !== notification.id));
            success("Оповещение успешно прочитано");
        } catch (e) {
            const error = e as IMessagesErrorResponse;
            if (error.response) {
                fail(error.response.data[0].message);
            }
        }
    }

    useEffect(() => {
        const updateAccount = () => {
            updateMeetings();
            updateNotifications();
        }

        updateAccount();
    }, [])

    return (
        <div>
            <Heading content="Аккаунт" />
            <div style={{height: "20px"}} />
            <NotificationsList
                isLoading={isLoadingNotifications}
                notifications={notifications}
                buttons={[
                    { content: "Прочитать", onClick: tryCheckNotification }
                ]}
            />
            <div style={{ height: "20px" }} />
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
