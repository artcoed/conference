import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

type QuestMeetingParams = {
    id: string;
};

const QuestMeeting: FC = () => {
    const { id } = useParams<QuestMeetingParams>();

    return (
        <div>
            QuestMeeting {id}
        </div>
    );
};

export default QuestMeeting;
