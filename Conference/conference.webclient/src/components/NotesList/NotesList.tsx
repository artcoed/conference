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
            fail("����� ������� ������ ���� �� 2 �� 100 ��������");
            return;
        }

        if (meeting.notes) {
            for (let i = 0; i < meeting.notes.length; i++) {
                if (meeting.notes[i] === trimmedNote) {
                    fail("������ ������� ���������� �������")
                    return;
                }
            }
        }

        try {
            await createNote(meeting.id ?? 0, trimmedNote);
            setMeeting({ ...meeting, notes: [...meeting.notes ?? [], trimmedNote] })
            setInputNote('')
            success("������� ������� ���������")
        } catch (e) {
            const error = e as IMessagesErrorResponse;
            if (error.response) {
                fail(error.response.data[0].message);
            }
        }
    }S

    return (
        <Form>
            <div className={classes.ListContainer}>
                <List
                    locale={{ emptyText: "������� �����������" }}
                    size="small"
                    header={<div>�������</div>}
                    dataSource={meeting.notes}
                    renderItem={(item, index) => <List.Item key={index}>{item}</List.Item>}
                    footer={
                        <>
                            {!meeting.hasCompleted &&
                                <>
                                <Form.Item style={{ display: "inline-block", width: "75%" }}>
                                    <Input value={inputNote} onChange={e => setInputNote(e.target.value)} placeholder="������� ���������� �������" />
                                </Form.Item>
                                <Form.Item style={{ display: "inline-block", width: "25%" }}>
                                    <Row justify="end">
                                        <Button onClick={addNoteInList}>��������</Button>
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