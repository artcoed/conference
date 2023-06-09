import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DocumentsList from '../../components/DocumentsList/DocumentsList';
import Heading from '../../components/Heading/Heading';
import NotesList from '../../components/NotesList/NotesList';
import PageLoader from '../../components/PageLoader/PageLoader';
import QuestionsList from '../../components/QuestionsList/QuestionsList';
import VoteMenu from '../../components/VoteMenu/VoteMenu';
import { getForQuestById } from '../../http/meetings';
import { IMeeting } from '../../models/domain/IMeeting';
import { Roles } from '../../models/domain/Roles';
import { IIdParameter } from '../../models/tools/IIdParameter';

const QuestMeeting: FC<{ fail: (message: string) => void, success: (message: string) => void }> = ({ fail, success }) => {
    const { id } = useParams<IIdParameter>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [role, setRole] = useState(Roles.Quest);
    const [meeting, setMeeting] = useState<IMeeting>({} as IMeeting);

    const updateRole = () => {
        if (localStorage.getItem('role') === Roles.Worker)
            setRole(Roles.Worker);
    }

    useEffect(() => {
        const updateMeeting = async () => {
            if (!id)
                return;

            try {
                const response = await getForQuestById({ id: +id });
                const meetingData = response.data;
                if (meetingData.votingOptions) {
                    if (meetingData.selectedOption === "")
                        meetingData.selectedOption = meetingData.votingOptions[0];
                }
                setMeeting(meetingData);
            } catch (e) { }
        }

        const updateQuestMeeting = async () => {
            updateRole();
            await updateMeeting();
            setIsLoading(false);
        }

        updateQuestMeeting();
    }, [id])

    return (
        <div>
            {isLoading ? <PageLoader /> :
                <>
                    <Heading content={meeting.meetingTitle ?? ""} />
                    <div style={{ height: "20px" }} />
                    <QuestionsList questions={meeting.questions ?? []} /> 
                    <div style={{height: "10px"}} />
                    <NotesList meeting={meeting} setMeeting={setMeeting} fail={fail} success={success} />
                    <div style={{height: "10px"}} />
                    <DocumentsList documents={meeting.documents ?? []} />
                    {meeting.hasVoting && role === Roles.Worker &&
                        <VoteMenu fail={fail} meeting={meeting} setMeeting={setMeeting} success={success} />
                    }
                </>
            }
        </div>
    );
};

export default QuestMeeting;
