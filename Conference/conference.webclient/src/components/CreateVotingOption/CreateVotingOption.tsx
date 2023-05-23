import { Button, Form, Input, Row } from 'antd';
import React, { FC, useState } from 'react';
import { IMeeting } from '../../models/domain/IMeeting';

const CreateVotingOption: FC<{
    meeting: IMeeting,
    setMeeting: (meeting: IMeeting) => void
    fail: (message: string) => void,
    success: (message: string) => void,
}> = ({
    meeting,
    setMeeting,
    fail,
    success
}) => {
    const [inputOption, setInputOption] = useState('');

    const addOptionInList = () => {
        const trimOption = inputOption.trim()

        if (trimOption.length < 1 || trimOption.length > 50) {
            fail("������� ����������� ������ ��������� �� 1 �� 50 ��������")
            return;
        }

        if (meeting.votingOptions) {
            if (meeting.votingOptions.includes(trimOption)) {
                fail("������ ������� ���������� �������� �����������")
                return;
            }
        }

        setMeeting({ ...meeting, votingOptions: [...(meeting.votingOptions ?? []), trimOption] })
        success('������� ����������� ������� ��������')
        setInputOption('')
    }

    return (
        <div>
            <Form.Item style={{ display: "inline-block", width: "75%" }}>
                <Input value={inputOption} onChange={e => setInputOption(e.target.value)} placeholder="������� ������� �����������" />
            </Form.Item>
            <Form.Item style={{ display: "inline-block", width: "25%" }}>
                <Row justify="end">
                    <Button onClick={addOptionInList}>��������</Button>
                </Row>
            </Form.Item>
        </div>
    );
};

export default CreateVotingOption;