import { Form, List, Input, Row, Button } from 'antd';
import React, { FC, useState } from 'react';
import { createNote } from '../../http/notes';
import { IMeeting } from '../../models/domain/IMeeting';
import { IMessagesErrorResponse } from '../../models/response/IMessagesErrorResponse';
import classes from './NotesList.module.css';

const NotesList: FC<{ meeting: IMeeting, setMeeting: (meeting: IMeeting) => void, fail: (message: string) => void, success: (message: string) => void }> = ({ meeting, setMeeting, fail, success }) => {
    const [inputNote, setInputNote] = useState<string>('');

    const addNoteInList = async () => {
        const trimmedNote = inputNote.trim()

        if (trimmedNote.length < 2 || trimmedNote.length > 100) {
            fail("Длина заметки должна быть от 2 до 100 символов");
            return;
        }

        if (meeting.notes) {
            for (let i = 0; i < meeting.notes.length; i++) {
                if (meeting.notes[i] === trimmedNote) {
                    fail("Нельзя создать одинаковые заметки")
                    return;
                }
            }
        }

        try {
            await createNote(meeting.id ?? 0, trimmedNote);
            setMeeting({ ...meeting, notes: [...meeting.notes ?? [], trimmedNote] })
            setInputNote('')
            success("Заметка успешно добавлена")
        } catch (e) {
            const error = e as IMessagesErrorResponse;
            if (error.response) {
                fail(error.response.data[0].message);
            }
        }
    }

    return (
        <Form>
            <div className={classes.ListContainer}>
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
                                        <Button onClick={addNoteInList}>Добавить</Button>
                                    </Row>
                                </Form.Item>
                                </>
                            }
                        </>
                    }
                />
            </div>
        </Form>
    );
};

export default NotesList;