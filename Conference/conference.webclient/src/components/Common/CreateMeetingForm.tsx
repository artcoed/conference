import { DatePicker, Form, Input } from 'antd';
import React, { FC } from 'react';
import CreateQuestForm from './CreateQuestForm';

const CreateMeetingForm: FC = () => {
    const meeting = {
        title: "",
        startMeetingDateTime: Date.now(),
        Questions: [""],
        Documents: [""],
        UsersId: [0]
    };
    
    return (
        <div>
            <Form>
                <Input placeholder="Title" />
                <DatePicker placeholder="StartMeetingDateTime" />
                <Input placeholder="Question" />
                <Input placeholder="Document" />
                <Input placeholder="UserId" />
            </Form>
            <CreateQuestForm />
        </div>
    );
};

export default CreateMeetingForm;