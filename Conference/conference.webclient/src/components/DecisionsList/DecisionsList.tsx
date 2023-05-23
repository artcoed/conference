import { Button, Form, Input, List, Row } from 'antd';
import React, { FC, useState } from 'react';
import { createDecision } from '../../http/decisions';
import { IMeeting } from '../../models/domain/IMeeting';
import { IMessagesErrorResponse } from '../../models/response/IMessagesErrorResponse';
import classes from "./DecisionsList.module.css";

const DecisionsList: FC<{
    meeting: IMeeting,
    fail: (message: string) => void,
    success: (message: string) => void,
    setMeeting: (meeting: IMeeting) => void
}> = ({
    meeting,
    fail,
    success,
    setMeeting
}) => {
    const [inputDecision, setInputDecision] = useState('');

    const addDecisionInList = async () => {
        const trimmedInput = inputDecision.trim()

        if (trimmedInput.length < 2 || trimmedInput.length > 100) {
            fail("Длина решения должна быть от 2 до 100 символов")
            return;
        }

        if (meeting.decisions) {
            if (meeting.decisions.includes(trimmedInput)) {
                fail("Нельзя создать одинаковые решения");
                return;
            }
        }
        
        try {
            await createDecision(meeting.id ?? 0, trimmedInput);
            setMeeting({ ...meeting, decisions: [...(meeting.decisions ?? []), trimmedInput] });
            setInputDecision('');
            success("Решение успешно добавлено");
        } catch (e) {
            const error = e as IMessagesErrorResponse;
            if (error.response) {
                fail(error.response.data[0].message);
            }
        }
    }

    return (
        <div className={classes.ListContainer}>
            <List
                locale={{ emptyText: "Решения отсутствуют" }}
                size="small"
                header={<div>Решения</div>}
                dataSource={meeting.decisions}
                renderItem={(item, index) => <List.Item key={index}>{item}</List.Item>}
                footer={
                    <>
                        {!meeting.hasCompleted &&
                            <>
                                <Form.Item style={{ display: "inline-block", width: "75%" }}>
                                    <Input value={inputDecision} onChange={e => setInputDecision(e.target.value)} placeholder="Введите вопрос для совещания" />
                                </Form.Item>
                                <Form.Item style={{ display: "inline-block", width: "25%" }}>
                                    <Row justify="end">
                                        <Button onClick={addDecisionInList}>Добавить</Button>
                                    </Row>
                                </Form.Item>
                            </>}
                    </>
                }
            />
        </div>
    );
};

export default DecisionsList;