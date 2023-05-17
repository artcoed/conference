import { DatePicker, Form, Input, List, Row, Transfer, Upload } from 'antd';
import { TransferDirection } from 'antd/es/transfer';
import React, { FC, useState } from 'react';
import CreateQuestForm from './CreateQuestForm';
import classes from "./CreateMeetingForm.module.css"
import { Button } from 'antd/es/radio';
import { InboxOutlined } from '@ant-design/icons';

interface RecordType {
    key: string;
    title: string;
    description: string;
}

const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
}));

const initialTargetKeys = [] as string[];

const CreateMeetingForm: FC = () => {
    const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    const onChange = (nextTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
        setTargetKeys(nextTargetKeys);
    };

    const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
        setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    };

    const [inputQuestion, setInputQuestion] = useState('');


    const [questions, setQuestions] = useState([] as string[])

    const addQuestionInList = () => {
        setQuestions([...questions, inputQuestion])
        setInputQuestion('')
    }

    const deleteQuestionFromList = (question: string) => {
        const newQuestions = questions.filter(q => question !== q)
        setQuestions(newQuestions)
    } 

    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    
    return (
        <div>
            <Form>
                <Form.Item label="Тема">
                    <Input placeholder="Введите тему" />
                </Form.Item>
                <Form.Item label="Начало">
                    <DatePicker showTime placeholder="Введите дату начала" />
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
                            dataSource={mockData}
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
                        <Input placeholder="Введите логин" />
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder="Введите пароль" />
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder="Введите имя" />
                    </Form.Item>
                    <Form.Item>
                        <Button>Добавить</Button>
                    </Form.Item>
                </Form.Item>
                <Form.Item label="Документы">
                    <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                        <Upload.Dragger name="files">
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Нажмите или перетяните дл загрузки.</p>
                            <p className="ant-upload-hint">Подерживается загрузка несокльких файлов.</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateMeetingForm;