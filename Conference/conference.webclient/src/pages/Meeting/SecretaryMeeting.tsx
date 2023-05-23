import { Button, Row } from 'antd';
import React, { FC, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateVoting from '../../components/CreateVoting/CreateVoting';
import DecisionsList from '../../components/DecisionsList/DecisionsList';
import Heading from '../../components/Heading/Heading';
import MeetingDescription from '../../components/MeetingDescription/MeetingDescription';
import QuestionsList from '../../components/QuestionsList/QuestionsList';
import { completeMeeting, getByIdMeeting } from '../../http/meetings';
import { IMeeting } from '../../models/domain/IMeeting';
import { IMessagesErrorResponse } from '../../models/response/IMessagesErrorResponse';
import { IIdParameter } from '../../models/tools/IIdParameter';

const SecretaryMeeting: FC<{ fail: (message: string) => void, success: (message: string) => void }> = ({ fail, success }) => {
    const { id } = useParams<IIdParameter>();

    const [meeting, setMeeting] = useState({} as IMeeting);
    const [isCompleteLoading, setIsCompleteLoading] = useState(false)

    const updateMeeting = async () => {
        try {
            const response = await getByIdMeeting(+(id ?? ""));
            setMeeting(response.data);
        } catch (e) { }
    }

    const tryCompleteMeeting = async () => {
        setIsCompleteLoading(true);

        try {
            await completeMeeting(meeting.id ?? 0);
            success("Совещание успешно завершено")
            updateMeeting()
        } catch (e) {
            const error = e as IMessagesErrorResponse
            if (error.response) {
                fail(error.response.data[0].message);
            }
        }

        setIsCompleteLoading(false);
    }

    useEffect(() => {
        updateMeeting();
    }, [])

    return (
        <div>
            <Heading content="Отчет" />
            <MeetingDescription meeting={meeting} />
            <QuestionsList questions={meeting.questions ?? []} />
            <DecisionsList fail={fail} success={success} meeting={meeting} setMeeting={setMeeting} />

            {(!meeting.hasCompleted || meeting.hasVoting) &&
                <CreateVoting meeting={meeting} fail={fail} success={success} setMeeting={setMeeting} />
            }

            {!meeting.hasCompleted &&
                <Row justify="end" style={{ marginTop: "50px" }}>
                    <Button loading={isCompleteLoading} onClick={tryCompleteMeeting}>Завершить совещание</Button>
                </Row>
            }
        </div>
    )
};

export default SecretaryMeeting;
