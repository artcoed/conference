import { Button, Form, Input, List, Row } from "antd";
import { FC, useState } from "react";
import { createVoting } from "../../http/votings";
import { IMeeting } from "../../models/domain/IMeeting";
import { IMessagesErrorResponse } from "../../models/response/IMessagesErrorResponse";
import CreateVotingOption from "../CreateVotingOption/CreateVotingOption";
import classes from "./CreateVoting.module.css"

const CreateVoting: FC<{
    meeting: IMeeting,
    setMeeting: (meeting: IMeeting) => void,
    fail: (message: string) => void,
    success: (message: string) => void
}> = ({
    meeting,
    setMeeting,
    fail,
    success
}) => {
    const [inputVotingTitle, setInputVotingTitle] = useState('');

    const tryCreateVoting = async () => {
        const trimTitle = inputVotingTitle.trim()

        if (trimTitle.length < 3 || trimTitle.length > 100) {
            fail("Заголовок голосования должен содержать от 3 до 100 символов")
            return;
        }

        if ((meeting.votingOptions ?? []).length < 2 || (meeting.votingOptions ?? []).length > 8) {
            fail("Голосование должно содержать от 2 до 8 вариантов голосования")
            return;
        }

        try {
            await createVoting(meeting.id ?? 0, trimTitle, meeting.votingOptions ?? []);
            meeting.votingTitle = trimTitle
            meeting.hasVoting = true;
            success("Голосование успешно добавлено")
        } catch (e) {
            const error = e as IMessagesErrorResponse
            if (error.response) {
                fail(error.response.data[0].message)
            }
        }
    }

    return (
        <div style={{ marginTop: "20px" }}>
            {!meeting.hasVoting && !meeting.hasCompleted &&
                <p style={{ textAlign: "center", fontSize: "16px" }}>Добавления голосования</p>
            }

            <Row justify="center">
                <Form style={{ marginTop: "10px", width: "650px" }}>

                    {!meeting.hasVoting && !meeting.hasCompleted &&
                        <Form.Item label="Заголовок">
                            <Input value={inputVotingTitle} onChange={e => setInputVotingTitle(e.target.value)} placeholder="Введите заголовок голосования" />
                        </Form.Item>
                    }

                    {meeting.hasVoting &&
                        <p style={{ fontSize: "16px", textAlign: "center" }}>{meeting.votingTitle}</p>
                    }

                    <div className={classes.ListContainer} style={{ marginBottom: "20px" }}>
                        <List
                            locale={{ emptyText: "Варианты голосования отсутствуют" }}
                            size="small"
                            header={<div>Варианты голосования</div>}
                            dataSource={meeting.votingOptions}
                            renderItem={(item, index) => <List.Item key={index}>{item}</List.Item>}
                            footer={
                                <>
                                    {!meeting.hasVoting && !meeting.hasCompleted &&
                                        <CreateVotingOption fail={fail} success={success} meeting={meeting} setMeeting={setMeeting} />
                                    }
                                </>
                            }
                        />
                    </div>

                    {!meeting.hasVoting && !meeting.hasCompleted &&
                        <Form.Item>
                            <Row justify="start">
                                <Button onClick={tryCreateVoting}>Добавить голосование</Button>
                            </Row>
                        </Form.Item>
                    }
                </Form>
            </Row>
        </div>
    );
}

export default CreateVoting;