import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

type SecretaryMeetingParams = {
    id: string;
};

const SecretaryMeeting: FC = () => {
    const { id } = useParams<SecretaryMeetingParams>();

    return (
        <div>
            SecretaryMeeting {id}
        </div>
    );
};

export default SecretaryMeeting;
