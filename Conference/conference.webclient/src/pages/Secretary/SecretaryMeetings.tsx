import { Button, DatePicker, Form, Input, List, message, Modal, Row, Upload, UploadFile } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import MeetingsList from '../../components/Common/MeetingsList';
import dayjs from 'dayjs';
import Transfer, { TransferDirection } from 'antd/es/transfer';
import { IUsersCreateResponseError, IUsersListSuccessResponse } from '../Users';
import $api from '../../http';
import { InboxOutlined } from '@ant-design/icons';
import classes from "./SecretaryMeetings.module.css";
import { IAdministratorReportResponse, IAdministratorReportsResponse } from '../Administrator/AdministratorMeetings';
import Password from 'antd/es/input/Password';

interface RecordType {
    key: string;
    title: string;
    description: string;
}

interface IDocumentRequest {
    name: string,
    source: string
}

export interface ICreateMeetingRequest {
    title: string,
    startMeetingDateTime: Date,
    questions: string[],
    documents: IDocumentRequest[],
    usersId: number[]
}

interface ICreateMeetingRequestErrorMessage {
    message: string
}

interface ICreateMeetingRequestError {
    response: {
        data: ICreateMeetingRequestErrorMessage[]
    }
}

const SecretaryMeetings: FC = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [meetings, setMeetings] = useState([] as IAdministratorReportResponse[])
    const [isLoading, setIsLoading] = useState(true)

    const [title, setTitle] = useState('')
    const [startDateTime, setStartDateTime] = useState(dayjs())
    const [questions, setQuestions] = useState([] as string[])
    const [targetKeys, setTargetKeys] = useState<string[]>([]);
    const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

    const [questLogin, setQuestLogin] = useState('')
    const [questPassword, setQuestPassword] = useState('')
    const [questName, setQuestName] = useState('')

    const [messageApi, contextHolder] = message.useMessage();

    const [users, setUsers] = useState<RecordType[]>()
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    const onChange = (nextTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
        setTargetKeys(nextTargetKeys);
    };

    const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    const [inputQuestion, setInputQuestion] = useState('');

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

    const addQuestionInList = () => {
        const trimmed = inputQuestion.trim();

        if (trimmed.length < 2 || trimmed.length > 70) {
            error("Длина вопроса должна быть от 2 до 70 символов")
            return;
        }

        if (questions.includes(trimmed)) {
            error("Нельзя создать одинаковые вопросы")
            return;
        }

        setQuestions([...questions, trimmed])
        setInputQuestion('')
    }

    const deleteQuestionFromList = (question: string) => {
        const newQuestions = questions.filter(q => question !== q)
        setQuestions(newQuestions)
    }

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const updateUsers = async () => {
        try {
            const response = await $api.get('Users/GetCanInviteUsers') as IUsersListSuccessResponse;

            const recordTypeUsers = [] as RecordType[];
            for (let i = 0; i < response.data.length; i++) {
                const user = response.data[i]
                recordTypeUsers.push({ key: user.id.toString(), title: user.login, description: user.name })
            }

            setUsers(recordTypeUsers)

        } catch (e) {
        }
    }

    const createQuest = async () => {
        if (questLogin.length < 3 || questLogin.length > 50) {
            error("Логин гостя должен быть от 2 до 50 символов");
            return;
        }

        if (questPassword.length < 3 || questPassword.length > 50) {
            error("Пароль гостя должен быть от 2 до 50 символов");
            return;
        }

        if (questName.length < 3 || questName.length > 50) {
            error("Имя гостя должно быть от 2 до 50 символов");
            return;
        }

        try {
            const response = await $api.post("Users/CreateQuestUser", {
                login: questLogin,
                password: questPassword,
                name: questName
            });
            success('Гость добавлен успешно');
            setQuestLogin('')
            setQuestPassword('')
            setQuestName('')
            updateUsers()
        } catch (e) {
            const errorResponse = e as IUsersCreateResponseError;
            if (errorResponse.response != null) {
                error(errorResponse.response.data[0].message)
            }
        }
    }

    useEffect(() => {
        updateUsers()
    }, [])

    const onSubmit = async () => {
        setConfirmLoading(true);
        const documents = [] as IDocumentRequest[]

        if (fileList.length) {
            for (const item of fileList) {
                var base64 = await getBase64(item)
                documents.push({ name: item.name, source: base64 })
            }
        }

        const usersId = [] as number[]
        for (let i = 0; i < targetKeys.length; i++) {
            usersId.push(+(targetKeys[i]));
        }

        const dateTime = startDateTime.toDate()

        try {
            const response = await $api.post("Meetings/CreateMeeting", {
                documents,
                questions,
                startMeetingDateTime: dateTime,
                title,
                usersId: usersId
            } as ICreateMeetingRequest);

            setFileList([])
            setQuestions([])
            setStartDateTime(dayjs())
            setTitle('')
            setTargetKeys([])
            setSelectedKeys([])
            setQuestLogin('')
            setQuestName('')
            setQuestPassword('')
            setOpen(false);
            success('Совещание успешно добавлено')
            updateMeetingsList();
        } catch (e) {
            const err = e as ICreateMeetingRequestError
            if (err != null) {
                error(err.response.data[0].message)
            }
        }

        setConfirmLoading(false);
    };

    const getBase64 = (item: UploadFile): Promise<string> => {
        return new Promise((resolve) => {
            const blob = new Blob([item as any]);
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
                const base64data = reader.result;
                resolve(base64data ? base64data.toString() : "")
            }
        })
    }


    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        onSubmit()
    };

    const handleCancel = () => {
        setOpen(false);
    };


    useEffect(() => {
        updateMeetingsList();
    }, [])

    const updateMeetingsList = async () => {
        setIsLoading(true)
        try {
            const response = await $api.get("Meetings/GetMeetings") as IAdministratorReportsResponse;
            setMeetings(response.data)
        } catch (e) {
        }
        setIsLoading(false)
    }

    return (
        <div style={{minHeight: "calc(100vh - 64px)"}}>
            {contextHolder}
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: "1200px" }}>
                    <h1 style={{ fontSize: "28px", marginTop: "10px", textAlign: "center" }}>Совещания</h1>
                    <Modal title="Добавление совещания"
                        width="600px"
                        open={open}
                        onOk={handleOk}
                        okText="Добавить"
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                        cancelText="Отменить"
                    >
                        <div>
                            <Form>
                                <Form.Item label="Тема">
                                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Введите тему" />
                                </Form.Item>
                                <Form.Item label="Начало">
                                    <DatePicker value={startDateTime} clearIcon onChange={(v) => setStartDateTime(v === null ? dayjs() : v)} showTime placeholder="Выберите дату и время начала" />
                                </Form.Item>
                                <Form.Item>
                                    <div className={classes.List}>
                                        <List
                                            locale={{ emptyText: "Вопросы отсутствуют" }}
                                            size="small"
                                            header={<div>Вопросы</div>}
                                            footer={
                                                <>
                                                    <Form.Item style={{ display: "inline-block", width: "75%" }}>
                                                        <Input value={inputQuestion} onChange={e => setInputQuestion(e.target.value)} placeholder="Введите вопрос для совещания" />
                                                    </Form.Item>
                                                    <Form.Item style={{ display: "inline-block", width: "25%" }}>
                                                        <Row justify="end">
                                                            <Button onClick={addQuestionInList}>Добавить</Button>
                                                        </Row>
                                                    </Form.Item>
                                                </>
                                            }
                                            dataSource={questions}
                                            renderItem={(item, index) => <List.Item actions={[
                                                <Button onClick={() => deleteQuestionFromList(item)} key="Delete">Удалить</Button>
                                            ]} key={index}>{item}</List.Item>}
                                        />
                                    </div>
                                </Form.Item>
                                <Form.Item label="Участники">
                                    <Row justify="center">
                                        <Transfer
                                            dataSource={users}
                                            titles={['', 'Выбранные']}
                                            targetKeys={targetKeys}
                                            selectedKeys={selectedKeys}
                                            onChange={onChange}
                                            onSelectChange={onSelectChange}
                                            render={(item) => item.title}
                                            locale={{
                                                selectAll: "Выделить всех",
                                                itemsUnit: "ч.",
                                                itemUnit: "ч.",
                                                selectInvert: "Инвертировать выделение",
                                                notFoundContent: "Никого"
                                            }}
                                        />
                                    </Row>
                                </Form.Item>
                                <Form.Item label="Добавление гостя">
                                    <Form.Item>
                                        <Input value={questLogin} onChange={(e) => setQuestLogin(e.target.value)} placeholder="Введите логин" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Password value={questPassword} onChange={(e) => setQuestPassword(e.target.value)} placeholder="Введите пароль" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Input value={questName} onChange={(e) => setQuestName(e.target.value)} placeholder="Введите имя" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button onClick={createQuest}>Добавить</Button>
                                    </Form.Item>
                                </Form.Item>
                                <Form.Item label="Документы">
                                    <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                                        <Upload.Dragger name="files" beforeUpload={(file: UploadFile) => {
                                            setFileList((prev) => [...prev, file]);
                                            return false;

                                        }} onRemove={(file: UploadFile) => {
                                            setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
                                        }}>
                                            <p className="ant-upload-drag-icon">
                                                <InboxOutlined />
                                            </p>
                                            <p className="ant-upload-text">Нажмите или перетяните для загрузки.</p>
                                            <p className="ant-upload-hint">Подерживается загрузка несокльких документов.</p>
                                        </Upload.Dragger>
                                    </Form.Item>
                                </Form.Item>
                            </Form>
                        </div>
                    </Modal>
                    <Row justify="end">
                        <Button type="primary" style={{marginTop: "10px"}} onClick={showModal}>
                            Добавить совещание
                        </Button>
                    </Row>
                    <MeetingsList isLoading={isLoading} meetings={meetings} />
                </div>
            </div>
        </div>
    );
};

export default SecretaryMeetings;
