import { Input, Button, Row, List, notification, message } from 'antd';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $api from '../../http';
import { GetMeetingPath } from '../../routes';

interface IQuestMeeting {
    id: number,
    title: string,
    startDateTime: Date,
    endDateTime: Date,
    hasCompleted: boolean
}

interface IQuestMeetingResponse {
    data: IQuestMeeting[]
}

interface IQuestNotificationMeeting {
    title: string
}

interface IQuestNotification {
    id: number,
    meeting: IQuestNotificationMeeting,
    isChecked: boolean
}

interface IQuestNotificationResponse {
    data: IQuestNotification[]
}

interface ICheckErrorMessage {
    message: string
}

interface ICheckError {
    response: {
        data: ICheckErrorMessage[]
    }
}

const QuestAccount: FC = () => {
    const navigate = useNavigate();
    const [meetings, setMeetings] = useState<IQuestMeeting[]>()
    const [isLoadingMeetings, setIsLoadingMeetings] = useState(true)
    const [notifications, setNotifications] = useState<IQuestNotification[]>()
    const [isLoadingNotifications, setIsLoadingNotifications] = useState(false)
    const [isLoadingCheckNotification, setIsLoadingCheckNotification] = useState(false)

    const [messageApi, contextHolder] = message.useMessage();

    const error = (message: string) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };

    const success = (message: string) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
    };

    const updateMeetings = async () => {
        setIsLoadingMeetings(true)
        try {
            const response = await $api.get("Meetings/GetByInvitedUserMeetings") as IQuestMeetingResponse
            setMeetings(response.data);
        } catch (e) {
        }
        setIsLoadingMeetings(false)
    }

    const updateNotifications = async () => {
        setIsLoadingNotifications(true)
        try {
            const response = await $api.get("Notifications/GetByUserNotifications") as IQuestNotificationResponse
            setNotifications(response.data.filter(x => !x.isChecked));
        } catch (e) {
        }
        setIsLoadingNotifications(false)
    }

    const checkNotification = async (id: number) => {
        setIsLoadingCheckNotification(true)
        try {
            await $api.post("Notifications/CheckNotification", { notificationId: id })
            setNotifications(notifications?.filter(x => x.id !== id))
            success("Оповещение успешно прочитано")
        } catch (e) {
            const err = e as ICheckError
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
        <div style={{ minHeight: "calc(100vh - 64px)" }}>
            {contextHolder}
            <Row justify="center">
                <div style={{ width: "1200px" }}>
                    <h1 style={{ fontSize: "28px", textAlign: "center", marginTop: "10px" }}>Аккаунт</h1>
                    <div
                        style={{
                            height: 200,
                            overflow: 'auto',
                            padding: '0 16px',
                            border: '1px solid rgba(140, 140, 140, 0.35)',
                            marginTop: "20px",
                        }}>
                        <List
                            header={"Уведомления"}
                            loading={isLoadingNotifications}
                            dataSource={notifications}
                            locale={{emptyText: "Уведомлений нет"}}
                            renderItem={(notification) => (
                                <List.Item key={notification.id}
                                    actions={[<Button key={"Read"} loading={isLoadingCheckNotification} onClick={() => checkNotification(notification.id)}>Прочитать</Button>]}
                                >
                                    <List.Item.Meta
                                        title={"Вы были приглашены на совещание по теме: " + notification.meeting.title}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                    <div
                        style={{
                            height: 400,
                            overflow: 'auto',
                            padding: '0 16px',
                            border: '1px solid rgba(140, 140, 140, 0.35)',
                            marginTop: "10px",
                        }}>
                        <List
                            header={"Совещания"}
                            loading={isLoadingMeetings}
                            dataSource={meetings}
                            locale={{emptyText: "Совещаний нет"}}
                            renderItem={(meeting) => (
                                <List.Item key={meeting.id}
                                    actions={[<Button key={"Join"} onClick={() => navigate(GetMeetingPath(meeting.id.toString()))}>Присоединиться</Button>]}
                                >
                                    <List.Item.Meta
                                        title={meeting.title}
                                        description={`Начато: ${moment(meeting.startDateTime).format("lll")}, ${meeting.hasCompleted ? "Завершено: " + moment(meeting.endDateTime).format("lll") : "В процессе"}`}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </Row>
            <div style={{height: "50px"}}></div>
        </div >
    );
};

export default QuestAccount;
