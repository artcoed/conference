import { Button, Row } from 'antd';
import React, { FC, useCallback, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreateVoting from '../../components/CreateVoting/CreateVoting';
import DecisionsList from '../../components/DecisionsList/DecisionsList';
import Heading from '../../components/Heading/Heading';
import MeetingDescription from '../../components/MeetingDescription/MeetingDescription';
import PageLoader from '../../components/PageLoader/PageLoader';
import QuestionsList from '../../components/QuestionsList/QuestionsList';
import { completeMeeting, getByIdMeeting } from '../../http/meetings';
import { IMeeting } from '../../models/domain/IMeeting';
import { IMessagesErrorResponse } from '../../models/response/IMessagesErrorResponse';
import { IIdParameter } from '../../models/tools/IIdParameter';

const SecretaryMeeting: FC<{
    fail: (message: string) => void,
    success: (message: string) => void,
}> = ({
    fail,
    success,
}) => {
    const { id } = useParams<IIdParameter>();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [meeting, setMeeting] = useState({} as IMeeting);
    const [isCompleteLoading, setIsCompleteLoading] = useState(false)

    const updateMeeting = useCallback(async () => {
        setIsLoading(true);

        try {
            const response = await getByIdMeeting(+(id ?? ""));
            setMeeting(response.data);
        } catch (e) { }

        setIsLoading(false);
    }, [id]);

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
    }, [updateMeeting])

    return (
        <div>
            {isLoading ? <PageLoader /> :
                <>
                    <Heading content="Совещание" />
                    <MeetingDescription meeting={meeting} />
                    <QuestionsList questions={meeting.questions ?? []} />
                    <div style={{height: "10px"}} />
                    <DecisionsList fail={fail} success={success} meeting={meeting} setMeeting={setMeeting} />

                    {(!meeting.hasCompleted || meeting.hasVoting) &&
                        <CreateVoting meeting={meeting} fail={fail} success={success} setMeeting={setMeeting} />
                    }

                    {!meeting.hasCompleted &&
                        <Row justify="end" style={{ marginTop: "50px" }}>
                            <Button loading={isCompleteLoading} onClick={tryCompleteMeeting}>Завершить совещание</Button>
                        </Row>
                    }
                </>
            }
        </div>
    )
};

export default SecretaryMeeting;
