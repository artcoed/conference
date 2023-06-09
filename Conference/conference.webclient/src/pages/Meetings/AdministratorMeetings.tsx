import { Button, List } from 'antd';
import moment from 'moment';
import 'moment/locale/ru'
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../../components/Heading/Heading';
import $api from '../../http';
import { IMeeting } from '../../models/domain/IMeeting';
import { IGetFewResponse } from '../../models/response/IGetFewResponse';
import { getReportPath } from '../../routes';

const AdministratorMeetings: FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)

    const [meetings, setMeetings] = useState([] as IMeeting[])

    useEffect(() => {
        updateMeetingsList();
    }, [])

    const updateMeetingsList = async () => {
        setIsLoading(true)

        try {
            const response = await $api.get("Meetings/GetMeetings") as IGetFewResponse<IMeeting>;
            setMeetings(response.data)
        } catch (e) { }

        setIsLoading(false)
    }
    
    return (
        <div>
            <Heading content="Отчеты"/>
            <div style={{ width: "1200px" }}>
                <div
                    style={{
                        height: 400,
                        overflow: 'auto',
                        padding: '0 16px',
                        border: '1px solid rgba(140, 140, 140, 0.35)',
                        marginTop: "20px"
                    }}>
                    <List
                        locale={{emptyText: "Отчетов нет"} }
                        loading={isLoading}
                        dataSource={meetings}
                        renderItem={(meeting) => (
                            <List.Item key={meeting.id}
                                actions={[<Button disabled={!meeting.hasCompleted} key={"Открыть"} onClick={() => navigate(getReportPath((meeting.id??0).toString()))}>Открыть</Button>]}
                            >
                                <List.Item.Meta
                                    title={meeting.meetingTitle}
                                    description={`Начато: ${moment(meeting.startDateTime).format("lll")}, ${meeting.hasCompleted ? "Завершено: " + moment(meeting.endDateTime).format("lll") : "В процессе"}`}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdministratorMeetings;
