import { Button, Form, Input } from 'antd';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetMeetingPath } from '../../routes';

const SecretaryMeetings: FC = () => {
    const navigate = useNavigate();

    const meetings = [
        {
            id: 1,
            title: "���������",
            startDateTime: Date.now(),
            endDateTime: Date.now(),
            hasCompleted: true
        },
        {
            id: 2,
            title: "���������2",
            startDateTime: Date.now(),
            endDateTime: Date.now(),
            hasCompleted: false
        }
    ]

    return (
        <div>
            <h1>SecretaryMeetings</h1>

            <Form>
                <Input placeholder="login"/>
                <Input placeholder="password" />
                <Input placeholder="name" />
                <Button>Create quest</Button>
            </Form>

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
