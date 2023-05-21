import { Button, Descriptions, Form, Input, List, message, Row, Spin, Tooltip } from 'antd';
import moment from 'moment';
import React, { FC, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import $api from '../../http';
import classes from "./SecretaryMeeting.module.css"

type SecretaryMeetingParams = {
    id: string;
};

export interface IMeeting {
    id: number,
    meetingTitle: string,
    hasCompleted: boolean,
    startDateTime: Date,
    endDateTime: Date,
    questions: string[],
    decisions: string[],
    hasVoting: boolean,
    votingTitle: string
    votingOptions: string[],
}

export interface IMeetingResponse {
    data: IMeeting
}

interface IErrorCreateDecisionMessage {
    message: string
}

interface IErrorCreateDecision {
    response: {
        data: IErrorCreateDecisionMessage[]
    }
}

const SecretaryMeeting: FC = () => {
    const { id } = useParams<SecretaryMeetingParams>();

    const [meeting, setMeeting] = useState({} as IMeeting);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingCreateDecision, setIsLoadingCreateDecision] = useState(false);
    const [inputVotingTitle, setInputVotingTitle] = useState('')
    const [inputOption, setInputOption] = useState('')
    const [isCreatingVotingLoading, setIsCreatingVotingLoading] = useState(false)
    const [isCompleteLoading, setIsCompleteLoading] = useState(false)

    const [inputDecision, setInputDecision] = useState('')
    const [messageApi, contextHolder] = message.useMessage();

    const updateMeeting = async () => {
        setIsLoading(true)
        try {
            const response = await $api.get(`Meetings/GetByIdMeeting?meetingId=${id}`) as IMeetingResponse;
            setMeeting(response.data)
        } catch (e) {
            console.log(e)
        }
        setIsLoading(false)
    }

    const error = (message: string) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    };

    const success = (message: string) => {
        messageApi.open({
            type: 'success',
            content: message,
        });
    };

    const addDecisionInList = async () => {
        const trimmedInput = inputDecision.trim()

        if (trimmedInput.length < 2 || trimmedInput.length > 100) {
            error("Длина решения должна быть от 2 до 100 символов")
            return;
        }

        if (meeting.decisions.includes(trimmedInput)) {
            error("Нельзя создать одинаковые решения")
            return;
        }

        setIsLoadingCreateDecision(true);

        try {
            await $api.post("Decisions/CreateDecision", { meetingId: meeting.id, content: trimmedInput });
            setMeeting({ ...meeting, decisions: [...meeting.decisions, trimmedInput] })
            setInputDecision('')
            success("Решение успешно добавлено")
        } catch (e) {
            const err = e as IErrorCreateDecision;
            if (err.response) {
                error(err.response.data[0].message);
            }
        }

        setIsLoadingCreateDecision(false);
    }

    const addOptionInList = () => {
        const trimOption = inputOption.trim()
        if (trimOption.length < 1 || trimOption.length > 50) {
            error("Вариант голосования должен содержать от 1 до 50 символов")
            return;
        }

        if (meeting.votingOptions.includes(trimOption)) {
            error("Нельзя создать одинаковые варианты голосования")
            return;
        }

        setMeeting({ ...meeting, votingOptions: [...meeting.votingOptions, trimOption] })
        setInputOption('')
    }

    const createVoting = async () => {
        const trimTitle = inputVotingTitle.trim()
        if (trimTitle.length < 3 || trimTitle.length > 100) {
            error("Заголовок голосования должен содержать от 3 до 100 символов")
            return;
        }

        if (meeting.votingOptions.length < 2 || meeting.votingOptions.length > 8) {
            error("Голосование должно содержать от 2 до 8 вариантов голосования")
            return;
        }

        setIsCreatingVotingLoading(true);

        try {
            await $api.post("Votings/CreateVoting", { meetingId: meeting.id, title: trimTitle, options: meeting.votingOptions });
            meeting.votingTitle = trimTitle
            meeting.hasVoting = true;
            success("Голосование успешно добавлено")
        } catch (e) {
            const err = e as IErrorCreateDecision
            if (err.response) {
                error(err.response.data[0].message)
            }
        }

        setIsCreatingVotingLoading(false);
    }

    const completeMeeting = async () => {
        setIsCompleteLoading(true)
        try {
            await $api.post("Meetings/CompleteMeeting", { meetingId: meeting.id })
            success("Совещание успешно завершено")
            updateMeeting()
        } catch (e) {
            console.log(e)
            const err = e as IErrorCreateDecision
            if (err.response) {
                error(err.response.data[0].message);
            }
        }
        setIsCompleteLoading(false)
    }

    useEffect(() => {
        updateMeeting();
    }, [])

    return (
        <>
        {contextHolder}
        {
            isLoading &&
                <div>
                    <Spin tip="Loading" size="large">
                        <div className={classes.Content} />
                    </Spin>
                </div>
        }
        {!isLoading &&
                <div style={{ display: "flex", "justifyContent": "center" }} >
                    <div style={{ width: "1200px", minHeight: "calc(100vh - 64px)" }}>
                        <h1 style={{ fontSize: "28px", textAlign: "center", marginTop: "10px" }}>Отчет</h1>
                        <Descriptions title="Основная информация" layout="horizontal" style={{ marginTop: "10px" }}>
                            <Descriptions.Item label="Тема">{meeting.meetingTitle}</Descriptions.Item>
                            <Descriptions.Item label="Начато">{moment(meeting.startDateTime).format("lll")}</Descriptions.Item>
                            {
                                meeting.hasCompleted &&
                                <Descriptions.Item label="Завершено">{moment(meeting.endDateTime).format("lll")}</Descriptions.Item>
                            }
                            <Descriptions.Item label="Наличие голосования">{meeting.hasVoting ? "Существует" : "Не сущeствует"}</Descriptions.Item>
                        </Descriptions>

                        <div className={classes.List}>
                            <List
                                locale={{ emptyText: "Вопросы отсутствуют" }}
                                size="small"
                                header={<div>Вопросы</div>}
                                dataSource={meeting.questions}
                                renderItem={(item, index) => <List.Item key={index}>{item}</List.Item>}
                            />
                        </div>

                        <div className={classes.List}>
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
                                                        <Button loading={isLoadingCreateDecision} onClick={addDecisionInList}>Добавить</Button>
                                                    </Row>
                                                </Form.Item>
                                            </>}
                                    </>
                                }
                            />
                        </div>

                        {(!meeting.hasCompleted || meeting.hasVoting) &&
                            <div style={{ marginTop: "20px" }}>
                                {!meeting.hasVoting && !meeting.hasCompleted && <p style={{ textAlign: "center", fontSize: "16px" }}>Добавления голосования</p>}
                                <Row justify="center">
                                    <Form style={{ marginTop: "10px", width: "650px" }}>
                                        {!meeting.hasVoting && !meeting.hasCompleted && <Form.Item label="Заголовок">
                                            <Input value={inputVotingTitle} onChange={e => setInputVotingTitle(e.target.value)} placeholder="Введите заголовок голосования" />
                                        </Form.Item>}
                                        {meeting.hasVoting && <p style={{ fontSize: "16px", textAlign: "center" }}>{meeting.votingTitle}</p>}
                                        <div className={classes.List} style={{ marginBottom: "20px" }}>
                                            <List
                                                locale={{ emptyText: "Варианты голосования отсутствуют" }}
                                                size="small"
                                                header={<div>Варианты голосования</div>}
                                                dataSource={meeting.votingOptions}
                                                renderItem={(item, index) => <List.Item key={index}>{item}</List.Item>}
                                                footer={
                                                    <>
                                                        {!meeting.hasVoting && !meeting.hasCompleted &&
                                                            <>
                                                                <Form.Item style={{ display: "inline-block", width: "75%" }}>
                                                                    <Input value={inputOption} onChange={e => setInputOption(e.target.value)} placeholder="Введите вариант голосования" />
                                                                </Form.Item>
                                                                <Form.Item style={{ display: "inline-block", width: "25%" }}>
                                                                    <Row justify="end">
                                                                        <Button onClick={addOptionInList}>Добавить</Button>
                                                                    </Row>
                                                                </Form.Item>
                                                            </>
                                                        }
                                                    </>
                                                }
                                            />
                                        </div>
                                        {!meeting.hasVoting && !meeting.hasCompleted && <Form.Item>
                                            <Row justify="start">
                                                <Button loading={isCreatingVotingLoading} onClick={createVoting}>Добавить голосование</Button>
                                            </Row>
                                        </Form.Item>}
                                    </Form>
                                </Row>
                            </div>}
                        {!meeting.hasCompleted &&
                            <Row justify="end" style={{ marginTop: "50px" }}>
                                <Button loading={isCompleteLoading} onClick={completeMeeting}>Завершить совещание</Button>
                            </Row>
                        }

                        <div className={classes.Footer}></div>
                    </div>
                </div>    
        }
        </>
    )
};

export default SecretaryMeeting;
