import { Descriptions, List, Spin } from 'antd';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Heading from '../../components/Heading/Heading';
import $api from '../../http';
import { IReport } from '../../models/domain/IReport';
import { IGetSingleResponse } from '../../models/response/IGetSingleResponse';
import { IGraphElement } from '../../models/tools/IGraphElement';
import { IIdParameter } from '../../models/tools/IIdParameter';
import classes from "./Report.module.css";

const Report: FC = () => {
    const { id } = useParams<IIdParameter>();

    const [report, setReport] = useState({} as IReport); 
    const [graphData, setGraphData] = useState([] as IGraphElement[]);
    const [isLoading, setIsLoading] = useState(true);

    const updateReport = async () => {
        setIsLoading(true)
        try {
            const response = await $api.get(`Reports/GetByMeetingId?meetingId=${id}`) as IGetSingleResponse<IReport>;
            setReport(response.data)

            if (response.data.votes) {
                const newGraphData = [] as IGraphElement[];
                for (let i = 0; i < response.data.votes.length; i++) {
                    if (response.data.votes[i].users) {
                        newGraphData.push({ name: response.data.votes[i].value, pv: response.data.votes[i].users.length })
                    }
                }
                
                setGraphData(newGraphData)
            }
        } catch (e) { }
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
        <div>
            <Heading content="Отчет" />

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
                                <YAxis scale="point" />
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
        </div>
    );
};

export default Report;
