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

export interface IMeetingVoteResponse {
    id: number,
    value: string,
    users: IMeetingUserResponse[]
}

export interface IMeetingUserResponse {
    id: number,
    login: string,
    displayingName: string
}

export interface IMeetingNoteResponse {
    id: number,
    value: string,
    user: IMeetingUserResponse
}

export interface IMeeting {
    id: number,
    meetingTitle: string,
    meetingCompleted: boolean,
    startDateTime: Date,
    endDateTime: Date,
    decisions: string[],
    notes: IMeetingNoteResponse[],
    questions: string[],
    users: IMeetingUserResponse[],
    hasVoting: boolean,
    votingTitle: string
    votes: IMeetingVoteResponse[],
    hasCompleted: boolean
}

export interface IMeetingResponse {
    data: IMeeting
}

export interface IGraphDataElement {
    name: string,
    pv: number
}

const SecretaryMeeting: FC = () => {
    const { id } = useParams<SecretaryMeetingParams>();

    const [report, setReport] = useState({} as IMeeting);
    const [graphData, setGraphData] = useState([] as IGraphDataElement[]);
    const [isLoading, setIsLoading] = useState(true);

    const [inputDecision, setInputDecision] = useState('')
    const [messageApi, contextHolder] = message.useMessage();

    const updateReport = async () => {
        setIsLoading(true)
        try {
            const response = await $api.get(`Meetings/GetByIdMeeting?meetingId=${id}`) as IMeetingResponse;
            console.log(response)
            setReport(response.data)
            if (report.votes) {
                const newGraphData = [] as IGraphDataElement[];
                for (let i = 0; i < report.votes.length; i++) {
                    if (report.votes[i].users) {
                        newGraphData.push({ name: report.votes[i].value, pv: report.votes[i].users.length })
                    }
                }
                setGraphData(newGraphData)
            }
        } catch (e) {
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

    const addDecisionInList = () => {
        setInputDecision(inputDecision.trim())

        if (inputDecision.length < 2 || inputDecision.length > 100) {
            error("Длина вопроса должна быть от 2 до 100 символов")
            return;
        }

        setInputDecision('')
    }

    useEffect(() => {
        updateReport();
    }, [])

    if (isLoading) {
        return (
            <div>
                <Spin tip="Loading" size="large">
                    <div className={classes.Content} />
                </Spin>
            </div>
        )
    }

    return (
        <div style={{ display: "flex", "justifyContent": "center" }} >
            {contextHolder}
            <div style={{ width: "1200px", minHeight: "calc(100vh - 64px)" }}>
                <h1 style={{ fontSize: "28px", textAlign: "center", marginTop: "10px" }}>Отчет</h1>
                <Descriptions title="Основная информация" layout="horizontal" style={{ marginTop: "10px" }}>
                    <Descriptions.Item label="Тема">{report.meetingTitle}</Descriptions.Item>
                    <Descriptions.Item label="Начато">{moment(report.startDateTime).format("lll")}</Descriptions.Item>
                    {
                        report.hasCompleted &&
                        <Descriptions.Item label="Завершено">{moment(report.endDateTime).format("lll")}</Descriptions.Item>
                    }
                    <Descriptions.Item label="Наличие голосования">{report.hasVoting ? "Существует" : "Не сущeствует"}</Descriptions.Item>
                    <Descriptions.Item label="Количество участников">{report.users ? report.users.length : 0}</Descriptions.Item>
                </Descriptions>

                <div className={classes.List}>
                    <List
                        locale={{ emptyText: "Вопросы отсутствуют" }}
                        size="small"
                        header={<div>Вопросы</div>}
                        dataSource={report.questions}
                        renderItem={(item, index) => <List.Item key={index}>{item}</List.Item>}
                    />
                </div>

                <div className={classes.List}>
                    <List
                        locale={{ emptyText: "Решения отсутствуют" }}
                        size="small"
                        header={<div>Решения</div>}
                        dataSource={report.decisions}
                        renderItem={(item, index) => <List.Item key={index}>{item}</List.Item>}
                        footer={
                            <>
                                <Form.Item style={{ display: "inline-block", width: "75%" }}>
                                    <Input value={inputDecision} onChange={e => setInputDecision(e.target.value)} placeholder="Введите вопрос для совещания" />
                                </Form.Item>
                                <Form.Item style={{ display: "inline-block", width: "25%" }}>
                                    <Row justify="end">
                                        <Button onClick={addDecisionInList}>Добавить</Button>
                                    </Row>
                                </Form.Item>
                            </>
                        }
                    />
                </div>

                {report.hasVoting ?
                    <>
                        <p style={{ marginTop: "20px", textAlign: "center" }}>Тема: {report.votingTitle}</p>
                        <div style={{ height: "350px", marginTop: "10px" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={graphData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                    maxBarSize={100}
                                >
                                    <XAxis dataKey="name" scale="point" padding={{ left: 50, right: 50 }} />
                                    <YAxis />
                                    <Tooltip />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Bar dataKey="pv" name="Проголосовало" fill="#8884d8" background={{ fill: '#eee' }} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </>
                    :
                    <div style={{marginTop: "20px"}}>
                        <p style={{ textAlign: "center", fontSize: "16px" }}>Добавления голосования</p>
                        <Row justify="center">
                            <Form style={{ marginTop: "10px", width: "650px" }}>
                                <Form.Item label="Заголовок">
                                    <Input placeholder="Введите заголовок голосования" />
                                </Form.Item>
                                <Form.Item>
                                        <List
                                            locale={{ emptyText: "Варианты голосования отсутствуют" }}
                                            size="small"
                                            header={<div>Варианты голосования</div>}
                                            dataSource={report.decisions}
                                            renderItem={(item, index) => <List.Item key={index}>{item}</List.Item>}
                                            footer={
                                                <>
                                                    <Form.Item style={{ display: "inline-block", width: "75%" }}>
                                                        <Input value={inputDecision} onChange={e => setInputDecision(e.target.value)} placeholder="Введите вариант голосования" />
                                                    </Form.Item>
                                                    <Form.Item style={{ display: "inline-block", width: "25%" }}>
                                                        <Row justify="end">
                                                            <Button onClick={addDecisionInList}>Добавить</Button>
                                                        </Row>
                                                    </Form.Item>
                                                </>
                                            }
                                        />
                                </Form.Item>
                                <Form.Item>
                                    <Row justify="start">
                                        <Button>Добавить голосование</Button>
                                    </Row>
                                </Form.Item>
                            </Form>
                        </Row>
                    </div>
                }

                <Row justify="end" style={{marginTop: "50px"}}>
                    <Button>Завершить совещание</Button>
                </Row>

                <div className={classes.Footer}></div>
            </div>
        </div>
    )
};

export default SecretaryMeeting;
