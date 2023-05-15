import { Button, Form, Input } from 'antd';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

type SecretaryMeetingParams = {
    id: string;
};

const SecretaryMeeting: FC = () => {
    const { id } = useParams<SecretaryMeetingParams>();

    const meeting = {
        id: 2,
        title: "Title 2",
        startDateTime: Date.now(),
        endDateTime: Date.now(),
        hasCompleted: false,
        votingTitle: "",
        options: [],
        hasVoting: false,
        decisions: []
    }

    return (
        <div>
            <h1>SecretaryMeeting {id}</h1>
            <p>{meeting.title}</p>
            <p>Start: {meeting.startDateTime}</p>
            {meeting.hasCompleted && <p>End: {meeting.endDateTime}</p>}
            <p>Voting:</p>
            {meeting.hasVoting ? 
                <>
                    <p>{meeting.votingTitle}</p>
                    <p>Options:</p>
                    {meeting.options.map(option => 
                        <p>{option}</p>
                    )}
                </>
                : meeting.hasCompleted
                    ?
                    <p>Havent voting</p>
                    :
                    <>
                        <Input placeholder="Title"/>
                        <Input placeholder="Option" />
                        <Button>Add option</Button>
                        <Button>Add voting</Button>
                    </>
            }
            <p>Decisions:</p>
            {!meeting.hasCompleted &&
                <Form>
                    <Input placeholder="Decision"/>
                    <Button>Add decision</Button>
                </Form>
            }
            {meeting.decisions ?
                <div>
                    {meeting.decisions.map(decision =>
                        <div>
                            <p>{decision}</p>
                        </div>
                    )}
                </div>
                :
                <p>Havent decisions</p>
            }
        </div>
    );
};

export default SecretaryMeeting;
