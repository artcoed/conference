import { Button, Input } from 'antd';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetReportPath } from '../../routes';

const AdministratorMeetings: FC = () => {
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
            <h1>AdministratorMeetings</h1>
            <div>
                {meetings.map(meeting =>
                    <div>
                        <p>{meeting.title}</p>
                        <p>{meeting.startDateTime}</p>
                        {meeting.hasCompleted ?
                            <>
                                <p>{meeting.endDateTime}</p>
                                <Button onClick={() => navigate(GetReportPath(meeting.id.toString()))}>Open report</Button>
                            </>
                        :
                            <>
                                <Button disabled>Meeting in process</Button>
                            </>
                        }
                    </div>
                )}
            </div>

        </div>
    );
};

export default AdministratorMeetings;
