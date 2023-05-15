import { Input, Button } from 'antd';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetMeetingPath } from '../../routes';

const QuestAccount: FC = () => {
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
            <h1>QuestAccount</h1>
            {meetings.map(meeting =>
                <div key={meeting.id}>
                    <p>{meeting.title}</p>
                    <p>{meeting.startDateTime}</p>
                    {meeting.hasCompleted ?
                        <>
                            <p>{meeting.endDateTime}</p>
                            <Button disabled>Meeting ended</Button>
                        </>
                        :
                        <>
                            <Button onClick={() => navigate(GetMeetingPath(meeting.id.toString()))}>Join meeting</Button>
                        </>
                    }
                </div>
            )}
        </div>
    );
};

export default QuestAccount;
