import { Form, Input, Button } from 'antd';
import React, { FC } from 'react';

const CreateQuestForm: FC = () => {
    return (
        <Form>
            <Input placeholder="login" />
            <Input placeholder="password" />
            <Input placeholder="name" />
            <Button>Create quest</Button>
        </Form>
    );
};

export default CreateQuestForm;