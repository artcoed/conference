import { Button } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetMeetingPath } from '../../routes';
import classes from "./MeetingsList.module.css";

const MeetingsList: FC = () => {
    const navigate = useNavigate();

    const meetings = [
        {
            id: 1,
            title: "Title1",
            startDateTime: Date.now(),
            endDateTime: Date.now(),
            hasCompleted: true
        },
        {
            id: 2,
            title: "Title2",
            startDateTime: Date.now(),
            endDateTime: Date.now(),
            hasCompleted: false
        }
    ]

    return (
        <div>
            {meetings.map(meeting =>
                <div className={classes.meeting}>
                    <div>
                        <p>{meeting.title}</p>
                        <p>{moment(meeting.startDateTime).calendar()}</p>
                        {meeting.hasCompleted && <p>{moment(meeting.endDateTime).calendar()}</p>}
                    </div>
                    {meeting.hasCompleted && <Button disabled>Meeting completed</Button>}
                    {!meeting.hasCompleted && <Button onClick={() => navigate(GetMeetingPath(meeting.id.toString()))}>Open meeting</Button>}
                </div>
            )}
        </div>
    );
};

export default MeetingsList;