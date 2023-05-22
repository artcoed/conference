import { Button, List } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IAdministratorReportResponse} from '../../pages/Administrator/AdministratorMeetings';
import { getMeetingPath } from '../../routes';

const MeetingsList: FC<{ meetings: IAdministratorReportResponse[], isLoading: boolean }> = ({ meetings, isLoading }) => {
    const navigate = useNavigate();

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
                locale={{emptyText: "Совещаний нет"}}
                loading={isLoading}
                dataSource={meetings}
                renderItem={(meeting) => (
                    <List.Item key={meeting.id}
                        actions={[<Button key={"Открыть"} onClick={() => navigate(getMeetingPath(meeting.id.toString()))}>Открыть</Button>]}
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