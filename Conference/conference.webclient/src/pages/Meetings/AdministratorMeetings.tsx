import { Button, List } from 'antd';
import moment from 'moment';
import 'moment/locale/ru'
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $api from '../../http';
import { IReport } from '../../models/domain/IReport';
import { IGetFewResponse } from '../../models/response/IGetFewResponse';
import { getReportPath } from '../../routes';

const AdministratorMeetings: FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)

    const [reports, setReports] = useState([] as IReport[])

    useEffect(() => {
        updateMeetingsList();
    }, [])

    const updateMeetingsList = async () => {
        setIsLoading(true)

        try {
            const response = await $api.get("Meetings/GetMeetings") as IGetFewResponse<IReport>;
            setReports(response.data)
        } catch (e) { }

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
                            locale={{emptyText: "Отчетов нет"} }
                            loading={isLoading}
                            dataSource={reports}
                            renderItem={(meeting) => (
                                <List.Item key={meeting.id}
                                    actions={[<Button disabled={!meeting.meetingCompleted} key={"Открыть"} onClick={() => navigate(getReportPath(meeting.id.toString()))}>Открыть</Button>]}
                                >
                                    <List.Item.Meta
                                        title={meeting.meetingTitle}
                                        description={`Начато: ${moment(meeting.startDateTime).format("lll")}, ${meeting.meetingCompleted ? "Завершено: " + moment(meeting.endDateTime).format("lll") : "В процессе"}`}
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
