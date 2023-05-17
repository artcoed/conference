import { Button, List } from 'antd';
import moment from 'moment';
import 'moment/locale/ru'
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $api from '../../http';
import { GetReportPath } from '../../routes';
moment.locale('ru')

export interface IAdministratorReportResponse {
    id: number,
    title: string,
    startDateTime: Date,
    endDateTime: Date,
    hasCompleted: boolean
}

export interface IAdministratorReportsResponse {
    data: IAdministratorReportResponse[]
}

const AdministratorMeetings: FC = () => {
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
        <div style={{ minHeight: "calc(100vh - 74px)" }}>
            <h1 style={{ textAlign: "center", fontSize: "28px", marginTop: "10px" }}>Отчеты</h1>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: "1200px" }}>
                    <div
                        id="scrollableDiv1"
                        style={{
                            height: 400,
                            overflow: 'auto',
                            padding: '0 16px',
                            border: '1px solid rgba(140, 140, 140, 0.35)',
                            marginTop: "20px"
                        }}>
                        <List
                            loading={isLoading}
                            dataSource={meetings}
                            renderItem={(meeting) => (
                                <List.Item key={meeting.id}
                                    actions={[<Button disabled={!meeting.hasCompleted} key={"Открыть"} onClick={() => navigate(GetReportPath(meeting.id.toString()))}>Открыть</Button>]}
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
            </div>
        </div>
    );
};

export default AdministratorMeetings;
