import { Input, Button } from 'antd';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetMeetingPath } from '../../routes';

const QuestAccount: FC = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('0');
    return (
        <div>
            QuestAccount
            <Input value={id} onChange={(e) => setId(e.target.value)} />
            <Button onClick={() => navigate(GetMeetingPath(id))}>Open meeting</Button>
        </div>
    );
};

export default QuestAccount;
