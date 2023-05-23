import { Descriptions } from "antd";
import React, { FC } from "react";
import { IMeeting } from "../../models/domain/IMeeting";
import { getStringFromDateTime } from "../../services/DateFormatterService";

const MeetingDescription: FC<{ meeting: IMeeting }> = ({ meeting }) => {
    return (

        <Descriptions title="�������� ����������" layout="horizontal" style={{ marginTop: "10px" }}>
            <Descriptions.Item label="����">{meeting.meetingTitle}</Descriptions.Item>
            <Descriptions.Item label="������">{getStringFromDateTime(meeting.startDateTime)}</Descriptions.Item>
            {
                meeting.hasCompleted &&
                <Descriptions.Item label="���������">{getStringFromDateTime(meeting.endDateTime)}</Descriptions.Item>
            }
            <Descriptions.Item label="������� �����������">{meeting.hasVoting ? "����������" : "�� ���e������"}</Descriptions.Item>
        </Descriptions>
    );
};

export default MeetingDescription;