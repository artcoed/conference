import { Button, Form, Input, List, message, Row, Segmented, Spin } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import $api from '../../http';
import { Roles } from '../../models/Roles';
import classes from "./QuestMeeting.module.css"

type QuestMeetingParams = {
    id: string;
};

interface IDocumentTitle {
    id: number,
    title: string
}

interface IQuestMeeting {
    id: number,
    meetingTitle: string,
    hasCompleted: boolean,
    notes: string[],
    documents: IDocumentTitle[],
    hasVoting: boolean,
    votingTitle: string,
    options: string[],
    hasVoted: boolean,
    selectedOption: string
}

interface IErrorCreateNoteMessage {
    message: string
}

interface IErrorCreateNote {
    response: {
        data: IErrorCreateNoteMessage[]
    }
}

interface IQuestMeetingResponse {
    data: IQuestMeeting
}

interface IErrorVoteMessage {
    message: string 
}

interface IErrorVote {
    response: {
        data: IErrorVoteMessage[]
    }
}

const QuestMeeting: FC = () => {
    const { id } = useParams<QuestMeetingParams>();

    const [meeting, setMeeting] = useState({} as IQuestMeeting)
    const [isLoading, setIsLoading] = useState(false)
    const [inputNote, setInputNote] = useState('')
    const [isLoadingCreateNote, setIsLoadingCreateNote] = useState(false)
    const [role, setRole] = useState(Roles.Quest)

    const [messageApi, contextHolder] = message.useMessage();

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

    const addNoteInList = async () => {
        const trimmedInput = inputNote.trim()

        if (trimmedInput.length < 2 || trimmedInput.length > 100) {
            error("Длина заметки должна быть от 2 до 100 символов")
            return;
        }

        if (meeting.notes.includes(trimmedInput)) {
            error("Нельзя создать одинаковые заметки")
            return;
        }


        setIsLoadingCreateNote(true);

        try {
            await $api.post("Notes/CreateNote", { meetingId: meeting.id, content: trimmedInput });
            setMeeting({ ...meeting, notes: [...meeting.notes, trimmedInput] })
            setInputNote('')
            success("Заметка успешно добавлена")
        } catch (e) {
            const err = e as IErrorCreateNote;
            if (err.response) {
                error(err.response.data[0].message);
            }
        }

        setIsLoadingCreateNote(false);
    }

    const changeOption = (value: string | number) => {
        setMeeting({ ...meeting, selectedOption: value as string })
    }

    const vote = async () => {
        try {
            await $api.post("Votes/CreateVote", { meetingId: meeting.id, optionName: meeting.selectedOption });
            setMeeting({ ...meeting, hasVoted: true })
            success("Вы успешно проголосовали")
        } catch (e) {
            const err = e as IErrorVote
            if (err.response) {
                error(err.response.data[0].message)
            }
        }
    }

    const updateMeeting = async () => {
        setIsLoading(true)
        try {
            const response = await $api.get(`Meetings/GetForQuestById?meetingId=${id}`) as IQuestMeetingResponse;
            if (response.data.options) {
                if (response.data.selectedOption === "")
                    response.data.selectedOption = response.data.options[0];
            }
            setMeeting(response.data)
        } catch (e) {
        }
        setIsLoading(false)
    }

    const downloadDocument = (myDocument: IDocumentTitle) => {
        $api.get("https://localhost:7081/api/Meetings/DownloadFileById?DocumentId=" + myDocument.id,
            {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/octet-stream'
                }
            })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', myDocument.title);
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        updateMeeting()
        if (localStorage.getItem('role') === Roles.Worker) {
            setRole(Roles.Worker)
        }
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
        { 
            !isLoading &&
            <div style={{ minHeight: "calc(100vh - 74px)", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "1200px" }}>
                    <h1 style={{ fontSize: "28px", textAlign: "center", marginTop: "10px" }}>{meeting.meetingTitle}</h1>

                    <Form>
                        <div className={classes.List} style={{ marginTop: "20px" }}>
                            <List
                                locale={{ emptyText: "Заметки отсутствуют" }}
                                size="small"
                                header={<div>Заметки</div>}
                                dataSource={meeting.notes}
                                renderItem={(item, index) => <List.Item key={index}>{item}</List.Item>}
                                footer={
                                    <>
                                        {!meeting.hasCompleted &&
                                            <>
                                                <Form.Item style={{ display: "inline-block", width: "75%" }}>
                                                    <Input value={inputNote} onChange={e => setInputNote(e.target.value)} placeholder="Введите содержимое заметки" />
                                                </Form.Item>
                                                <Form.Item style={{ display: "inline-block", width: "25%" }}>
                                                    <Row justify="end">
                                                        <Button loading={isLoadingCreateNote} onClick={addNoteInList}>Добавить</Button>
                                                    </Row>
                                                </Form.Item>
                                            </>}
                                    </>
                                }
                            />
                        </div>
                    </Form>

                    <div
                        style={{
                            height: 350,
                            overflow: 'auto',
                            padding: '0 16px',
                            border: '1px solid rgba(140, 140, 140, 0.35)',
                            marginTop: "10px",
                        }}>
                        <List
                            header={"Документы"}
                            locale={{ emptyText: "Документов нет" }}
                            loading={isLoading}
                            dataSource={meeting.documents}
                            renderItem={(document) => (
                                <List.Item key={document.id}
                                    actions={[<Button key={"Download"} onClick={() => { downloadDocument(document) }}>Скачать</Button>]}
                                >
                                    <List.Item.Meta
                                        title={document.title}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>

                    {meeting.hasVoting && role === Roles.Worker &&
                        <div style={{ marginTop: "20px" }}>
                            <p style={{ fontSize: "16px", textAlign: "center" }}>{meeting.meetingTitle}</p>
                            <Row justify="center" style={{ marginTop: "10px" }}>
                                <Segmented disabled={meeting.hasVoted || meeting.hasCompleted} options={meeting.options} defaultValue={meeting.selectedOption} onChange={changeOption} />
                            </Row>
                            <Row justify="center" style={{ marginTop: "10px" }}>
                                <Button onClick={vote} disabled={meeting.hasVoted || meeting.hasCompleted}>Проголосовать</Button>
                            </Row>
                        </div>
                    }

                    <div style={{ height: "50px" }}></div>
                </div>
            </div>
        }
        </>
    );
};

export default QuestMeeting;
