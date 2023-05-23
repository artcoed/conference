import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DocumentsList from '../../components/DocumentsList/DocumentsList';
import Heading from '../../components/Heading/Heading';
import NotesList from '../../components/NotesList/NotesList';
import VoteMenu from '../../components/VoteMenu/VoteMenu';
import { getForQuestById } from '../../http/meetings';
import { IMeeting } from '../../models/domain/IMeeting';
import { Roles } from '../../models/domain/Roles';
import { IIdParameter } from '../../models/tools/IIdParameter';

const QuestMeeting: FC<{ fail: (message: string) => void, success: (message: string) => void }> = ({ fail, success }) => {
    const { id } = useParams<IIdParameter>();
    const [role, setRole] = useState(Roles.Quest);
    const [meeting, setMeeting] = useState<IMeeting>({} as IMeeting);

    const updateRole = () => {
        if (localStorage.getItem('role') === Roles.Worker)
            setRole(Roles.Worker);
    }

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

    const updateQuestMeeting = () => {
        updateRole();
        updateMeeting();
    }

    useEffect(() => {
        updateQuestMeeting();
    }, [])

    return (
        <div>
            <Heading content={meeting.meetingTitle ?? ""} />
            <NotesList meeting={meeting} setMeeting={setMeeting} fail={fail} success={success} />
            <DocumentsList documents={meeting.documents ?? []} />
            {meeting.hasVoting && role === Roles.Worker &&
                <VoteMenu fail={fail} meeting={meeting} setMeeting={setMeeting} success={success} />    
            }
        </div>
    );
};

export default QuestMeeting;
