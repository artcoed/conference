import { Descriptions } from "antd";
import React, { FC } from "react";
import { IMeeting } from "../../models/domain/IMeeting";
import { getStringFromDateTime } from "../../services/DateFormatterService";

const MeetingDescription: FC<{ meeting: IMeeting }> = ({ meeting }) => {
    return (

        <Descriptions title="Основная информация" layout="horizontal" style={{ marginTop: "10px" }}>
            <Descriptions.Item label="Тема">{meeting.meetingTitle}</Descriptions.Item>
            <Descriptions.Item label="Начато">{getStringFromDateTime(meeting.startDateTime)}</Descriptions.Item>
            {
                meeting.hasCompleted &&
                <Descriptions.Item label="Завершено">{getStringFromDateTime(meeting.endDateTime)}</Descriptions.Item>
            }
            <Descriptions.Item label="Наличие голосования">{meeting.hasVoting ? "Существует" : "Не сущeствует"}</Descriptions.Item>
        </Descriptions>
    );
};

export default MeetingDescription;