import { Button, Input } from 'antd';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetReportPath } from '../../routes';

const AdministratorMeetings: FC = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('0');

    return (
        <div>
            AdministratorMeetings
            <Input value={id} onChange={(e) => setId(e.target.value)} />
            <Button onClick={() => navigate(GetReportPath(id))}>Open report</Button>
        </div>
    );
};

export default AdministratorMeetings;
