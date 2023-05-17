import { Button, Form, Input, Modal, Row } from 'antd';
import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateMeetingForm from '../../components/Common/CreateMeetingForm';
import CreateQuestForm from '../../components/Common/CreateQuestForm';
import MeetingsList from '../../components/Common/MeetingsList';
import { GetMeetingPath } from '../../routes';

const SecretaryMeetings: FC = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };


    return (
        <div style={{minHeight: "calc(100vh - 64px)"}}>
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
                        <CreateMeetingForm />
                    </Modal>
                    <Row justify="end">
                        <Button type="primary" style={{marginTop: "10px"}} onClick={showModal}>
                            Добавить совещание
                        </Button>
                    </Row>
                    <MeetingsList />
                </div>
            </div>
        </div>
    );
};

export default SecretaryMeetings;
