import { Descriptions, Form, Input, List, Spin } from 'antd';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import $api from '../http';
import classes from "./Report.module.css";

type ReportParams = {
    id: string;
};

interface IReportVoteResponse {
    id: number,
    value: string,
    users: IReportUserResponse[]
}

interface IReportUserResponse {
    id: number,
    login: string,
    displayingName: string
}

interface IReportNoteResponse {
    id: number,
    value: string,
    user: IReportUserResponse 
}

interface IReport {
    id: number,
    meetingTitle: string,
    meetingCompleted: boolean,
    startDateTime: Date,
    endDateTime: Date,
    decisions: string[],
    notes: IReportNoteResponse[],
    questions: string[],
    users: IReportUserResponse[],
    hasVoting: boolean,
    votingTitle: string
    votes: IReportVoteResponse[]
}

interface IReportResponse {
    data: IReport
}

interface IGraphDataElement {
    name: string,
    pv: number
}

const Report: FC = () => {
    const { id } = useParams<ReportParams>();

    const [report, setReport] = useState({} as IReport); 
    const [graphData, setGraphData] = useState([] as IGraphDataElement[]);
    const [isLoading, setIsLoading] = useState(true);

    const updateReport = async () => {
        setIsLoading(true)
        try {
            const response = await $api.get(`Reports/GetByMeetingId?meetingId=${id}`) as IReportResponse;
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
            <div style={{ width: "1200px", minHeight: "calc(100vh - 64px)" }}>
                <h1 style={{ fontSize: "28px", textAlign: "center", marginTop: "10px" }}>Отчет</h1>
                <Descriptions title="Основная информация" layout="horizontal" style={{marginTop: "10px"} }>
                    <Descriptions.Item label="Тема">{report.meetingTitle}</Descriptions.Item>
                    <Descriptions.Item label="Начато">{moment(report.startDateTime).format("lll")}</Descriptions.Item>
                    <Descriptions.Item label="Завершено">{moment(report.endDateTime).format("lll")}</Descriptions.Item>
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
                        locale={{emptyText: "Решения отсутствуют"}}
                        size="small"
                        header={<div>Решения</div>}
                        dataSource={report.decisions}
                        renderItem={(item, index) => <List.Item key={index}>{item}</List.Item>}
                    />
                </div>

                <div className={classes.List}>
                    <List
                        locale={{ emptyText: "Пользователи отсутствуют" }}
                        size="small"
                        header={<div>Пользователи</div>}
                        dataSource={report.users}
                        renderItem={(item, index) => <List.Item key={index}>{item.login} ({item.displayingName})</List.Item>}
                    />
                </div>

                <div className={classes.List}>
                    <List
                        locale={{ emptyText: "Заметки отсутствуют" }}
                        size="small"
                        header={<div>Заметки</div>}
                        dataSource={report.notes}
                        renderItem={(item, index) => <List.Item key={index}>{item.user.login}: {item.value}</List.Item>}
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
                    <p style={{ marginTop: "20px", textAlign: "center" }}>Голосование не проводилось</p>
                }
                

                <div className={classes.Footer}></div>
            </div>
        </div>
    );
};

export default Report;
