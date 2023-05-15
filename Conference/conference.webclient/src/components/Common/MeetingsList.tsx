import { Button } from 'antd';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetMeetingPath } from '../../routes';

const MeetingsList: FC = () => {
    const navigate = useNavigate();

    const meetings = [
        {
            id: 1,
            title: "Заголовок",
            startDateTime: Date.now(),
            endDateTime: Date.now(),
            hasCompleted: true
        },
        {
            id: 2,
            title: "Заголовок2",
            startDateTime: Date.now(),
            endDateTime: Date.now(),
            hasCompleted: false
        }
    ]

    return (
        <div>
            {meetings.map(meeting =>
                <div>
                    <p>{meeting.title}</p>
                    <p>{meeting.startDateTime}</p>
                    {meeting.hasCompleted ?
                        <>
                            <Button disabled>Meeting completed</Button>
                        </>
                        :
                        <>
                            <p>{meeting.endDateTime}</p>
                            <Button onClick={() => navigate(GetMeetingPath(meeting.id.toString()))}>Open meeting</Button>
                        </>
                    }
                </div>
            )}
        </div>
    );
};

export default MeetingsList;