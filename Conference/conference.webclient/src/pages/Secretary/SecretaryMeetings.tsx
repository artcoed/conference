import { Button, Form } from 'antd';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetMeetingPath } from '../../routes';

const SecretaryMeetings: FC = () => {
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
            <h1>SecretaryMeetings</h1>

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
        </div>
    );
};

export default SecretaryMeetings;
