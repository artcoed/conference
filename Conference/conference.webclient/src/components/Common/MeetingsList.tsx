import { Button, List } from 'antd';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $api from '../../http';
import { IAdministratorReportResponse, IAdministratorReportsResponse } from '../../pages/Administrator/AdministratorMeetings';
import { GetMeetingPath } from '../../routes';
import classes from "./MeetingsList.module.css";

const MeetingsList: FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)

    const [meetings, setMeetings] = useState([] as IAdministratorReportResponse[])

    useEffect(() => {
        updateMeetingsList();
    }, [])

    const updateMeetingsList = async () => {
        setIsLoading(true)
        try {
            const response = await $api.get("Meetings/GetMeetings") as IAdministratorReportsResponse;
            setMeetings(response.data)
        } catch (e) {
        }
        setIsLoading(false)
    }

    return (
        <div
            style={{
                height: 400,
                overflow: 'auto',
                padding: '0 16px',
                border: '1px solid rgba(140, 140, 140, 0.35)',
                marginTop: "20px",
            }}>
            <List
                loading={isLoading}
                dataSource={meetings}
                renderItem={(meeting) => (
                    <List.Item key={meeting.id}
                        actions={[<Button key={"Открыть"} onClick={() => navigate(GetMeetingPath(meeting.id.toString()))}>Открыть</Button>]}
                    >
                        <List.Item.Meta
                            title={meeting.title}
                            description={`Начато: ${moment(meeting.startDateTime).format("lll")}, ${meeting.hasCompleted ? "Завершено: " + moment(meeting.endDateTime).format("lll") : "В процессе"}`}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default MeetingsList;