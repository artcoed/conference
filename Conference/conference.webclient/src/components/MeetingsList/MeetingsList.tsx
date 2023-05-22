import { Button, List } from 'antd';
import React, { FC } from 'react';
import { IMeeting } from '../../models/domain/IMeeting';
import { ListButton } from '../../models/domain/ListButton';
import { getStringFromDateTime } from '../../services/DateFormatterService';
import classes from "./MeetingsList.module.css";

const MeetingsList: FC<{ meetings: IMeeting[], isLoading: boolean, buttons: ListButton<IMeeting>[] }> = ({ meetings, isLoading, buttons }) => {
    const getDescription = (meeting: IMeeting) => {
        let result = `Начато: ${getStringFromDateTime(meeting.startDateTime)}, `;

        if (meeting.hasCompleted)
            result += `Завершено: ${getStringFromDateTime(meeting.endDateTime)}`;
        else
            result += 'В процессе';

        return result;
    }

    return (
        <div className={classes.ListContainer}>
            <List
                locale={{emptyText: "Совещаний нет"}}
                loading={isLoading}
                dataSource={meetings}
                renderItem={(meeting) => (
                    <List.Item
                        key={meeting.id}
                        actions={buttons.map(button =>
                            <Button
                                key={button.content}
                                onClick={() => button.onClick(meeting)}
                            >
                                {button.content}
                            </Button>
                        )}
                    >
                        <List.Item.Meta
                            title={meeting.meetingTitle}
                            description={getDescription(meeting)}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default MeetingsList;