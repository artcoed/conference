import { Button, DatePicker, Form, Input, List, Modal, Row, Upload, UploadFile } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Transfer, { TransferDirection } from 'antd/es/transfer';
import $api from '../../http';
import { InboxOutlined } from '@ant-design/icons';
import classes from "./SecretaryMeetings.module.css";
import Password from 'antd/es/input/Password';
import { ITransferSource } from '../../models/tools/ITransferSource';
import { IDocument } from '../../models/domain/IDocument';
import { IMessagesErrorResponse } from '../../models/response/IMessagesErrorResponse';
import { IGetFewResponse } from '../../models/response/IGetFewResponse';
import { IUser } from '../../models/domain/IUser';
import { IMeeting } from '../../models/domain/IMeeting';
import MeetingsList from '../../components/MeetingsList/MeetingsList';
import { useNavigate } from 'react-router-dom';
import { getMeetingPath } from '../../routes';
import Heading from '../../components/Heading/Heading';

const SecretaryMeetings: FC<{ fail: (message: string) => void, success: (message: string) => void }> = ({ fail, success }) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    
    const [meetings, setMeetings] = useState([] as IMeeting[])
    const [isLoading, setIsLoading] = useState(true)

    const [title, setTitle] = useState('')
    const [startDateTime, setStartDateTime] = useState(dayjs())
    const [questions, setQuestions] = useState([] as string[])
    const [targetKeys, setTargetKeys] = useState<string[]>([]);
    const [fileList, setFileList] = useState<UploadFile<any>[]>([]);

    const [questLogin, setQuestLogin] = useState('')
    const [questPassword, setQuestPassword] = useState('')
    const [questName, setQuestName] = useState('')

    const [users, setUsers] = useState<ITransferSource[]>()
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    const mb = 1049116;

    const onChange = (nextTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
        setTargetKeys(nextTargetKeys);
    };

    const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    const [inputQuestion, setInputQuestion] = useState('');

    const addQuestionInList = () => {
        const trimmed = inputQuestion.trim();

        if (trimmed.length < 2 || trimmed.length > 70) {
            fail("Длина вопроса должна быть от 2 до 70 символов")
            return;
        }

        if (questions.includes(trimmed)) {
            fail("Нельзя создать одинаковые вопросы")
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
            const response = await $api.get('Users/GetCanInviteUsers') as IGetFewResponse<IUser>;

            const recordTypeUsers = [] as ITransferSource[];
            for (let i = 0; i < response.data.length; i++) {
                const user = response.data[i]
                recordTypeUsers.push({ key: (user.id ?? 0).toString(), title: user.login, description: user.displayingName })
            }

            setUsers(recordTypeUsers)

        } catch (e) {
        }
    }

    const createQuest = async () => {
        if (questLogin.length < 3 || questLogin.length > 50) {
            fail("Логин гостя должен быть от 2 до 50 символов");
            return;
        }

        if (questPassword.length < 3 || questPassword.length > 50) {
            fail("Пароль гостя должен быть от 2 до 50 символов");
            return;
        }

        if (questName.length < 3 || questName.length > 50) {
            fail("Имя гостя должно быть от 2 до 50 символов");
            return;
        }

        try {
            await $api.post("Users/CreateQuestUser", {
                login: questLogin,
                password: questPassword,
                displayingName: questName
            });
            success('Гость добавлен успешно');
            setQuestLogin('')
            setQuestPassword('')
            setQuestName('')
            updateUsers()
        } catch (e) {
            const errorResponse = e as IMessagesErrorResponse;
            if (errorResponse.response != null) {
                fail(errorResponse.response.data[0].message)
            }
        }
    }

    useEffect(() => {
        updateUsers()
    }, [])

    const onSubmit = async () => {
        setConfirmLoading(true);
        const documents = [] as IDocument[]

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
            await $api.post("Meetings/CreateMeeting", {
                documents,
                questions,
                startMeetingDateTime: dateTime,
                title,
                usersId: usersId
            });

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
            const err = e as IMessagesErrorResponse
            if (err != null) {
                fail(err.response.data[0].message)
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
            const response = await $api.get("Meetings/GetMeetings") as IGetFewResponse<IMeeting>;
            setMeetings(response.data)
        } catch (e) {
        }
        setIsLoading(false)
    }

    const navigate = useNavigate();

    const goToMeeting = (meeting: IMeeting) => {
        navigate(getMeetingPath((meeting.id ?? 0).toString()));
    }

    return (
        <div>
            <Heading content="Совещания" />
            <Modal title="Добавление совещания"
                width="600px"
                open={open}
                onOk={handleOk}
                okText="Добавить"
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                cancelText="Отменить"
            >
                <div style={{marginTop: "20px", marginBottom: "10px"}}>
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
                                    if ((file.size ?? 0) > mb * 2) {
                                        console.log(file.size)
                                        fail("Размер файла не должен превышать 2МБ")
                                        return true;
                                    }

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
                <Button type="primary" style={{margin: "20px 0"}} onClick={showModal}>
                    Добавить совещание
                </Button>
            </Row>

            <MeetingsList buttons={[{ content: "Перейти", onClick: goToMeeting }]} isLoading={isLoading} meetings={meetings} />
        </div>
    );
};

export default SecretaryMeetings;
