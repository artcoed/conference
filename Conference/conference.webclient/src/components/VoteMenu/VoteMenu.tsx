import { Button, Row, Segmented } from 'antd';
import React, { FC } from 'react';
import { createVote } from '../../http/votes';
import { IMeeting } from '../../models/domain/IMeeting';
import { IMessagesErrorResponse } from '../../models/response/IMessagesErrorResponse';

const VoteMenu: FC<{
    meeting: IMeeting,
    setMeeting: (meeting: IMeeting) => void,
    fail: (message: string) => void,
    success: (message: string) => void
}> = ({
    meeting,
    setMeeting,
    fail,
    success
}) => {
    const vote = async () => {
        try {
            await createVote(meeting.id ?? 0, meeting.selectedOption ?? '');
            setMeeting({ ...meeting, hasVoted: true })
            success("Вы успешно проголосовали")
        } catch (e) {
            const error = e as IMessagesErrorResponse
            if (error.response) {
                fail(error.response.data[0].message)
            }
        }
    }

    const changeOption = (value: string | number) => {
        setMeeting({ ...meeting, selectedOption: value as string })
    }

    return (
        <div style={{ marginTop: "20px" }}>
            <p style={{ fontSize: "16px", textAlign: "center" }}>{meeting.meetingTitle}</p>
            <Row justify="center" style={{ marginTop: "10px" }}>
                <Segmented disabled={meeting.hasVoted || meeting.hasCompleted} options={meeting.votingOptions ?? []} defaultValue={meeting.selectedOption} onChange={changeOption} />
            </Row>
            <Row justify="center" style={{ marginTop: "10px" }}>
                <Button onClick={vote} disabled={meeting.hasVoted || meeting.hasCompleted}>Проголосовать</Button>
            </Row>
        </div>
    );
};

export default VoteMenu;