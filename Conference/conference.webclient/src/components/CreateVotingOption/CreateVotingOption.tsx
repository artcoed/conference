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
            fail("Вариант голосования должен содержать от 1 до 50 символов")
            return;
        }

        if (meeting.votingOptions) {
            if (meeting.votingOptions.includes(trimOption)) {
                fail("Нельзя создать одинаковые варианты голосования")
                return;
            }

            if (meeting.votingOptions.length >= 8) {
                fail("Нельзя создать больше 8 вариантов голосования")
                return;
            }
        }

        setMeeting({ ...meeting, votingOptions: [...(meeting.votingOptions ?? []), trimOption] })
        success('Вариант голосования успешно добавлен')
        setInputOption('')
    }

    return (
        <div>
            <Form.Item style={{ display: "inline-block", width: "75%" }}>
                <Input value={inputOption} onChange={e => setInputOption(e.target.value)} placeholder="Введите вариант голосования" />
            </Form.Item>
            <Form.Item style={{ display: "inline-block", width: "25%" }}>
                <Row justify="end">
                    <Button onClick={addOptionInList}>Добавить</Button>
                </Row>
            </Form.Item>
        </div>
    );
};

export default CreateVotingOption;