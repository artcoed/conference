import { Button, Form, Input } from 'antd';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateMeetingForm from '../../components/Common/CreateMeetingForm';
import CreateQuestForm from '../../components/Common/CreateQuestForm';
import MeetingsList from '../../components/Common/MeetingsList';
import { GetMeetingPath } from '../../routes';

const SecretaryMeetings: FC = () => {
    return (
        <div>
            <h1>SecretaryMeetings</h1>
            <CreateMeetingForm/>
            <MeetingsList />
        </div>
    );
};

export default SecretaryMeetings;
