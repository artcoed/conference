import { Modal } from 'antd';
import React, { FC, useState } from 'react';
import { createUser } from '../../http/users';
import { IUser } from '../../models/domain/IUser';
import { Roles } from '../../models/domain/Roles';
import { IMessagesErrorResponse } from '../../models/response/IMessagesErrorResponse';
import CreateUserForm from '../CreateUserForm/CreateUserForm';

const CreateUserModal: FC<{
    isOpening: boolean,
    setIsOpening: (state: boolean) => void,
    fail: (message: string) => void,
    success: (message: string) => void,
    updateUsersList: () => void
}> = ({
    isOpening,
    setIsOpening,
    fail,
    success,
    updateUsersList
}) => {
    const [user, setUser] = useState<IUser>({} as IUser);
    const [isConfirmLoading, setIsConfirmLoading] = useState<boolean>();

    const tryCreateUser = async () => {
        setIsConfirmLoading(true);
        try {
            const creatingUser = {...user}
            if (!creatingUser.role) {
                creatingUser.role = Roles.Quest;
            }

            await createUser(creatingUser);

            updateUsersList()
            setUser({} as IUser);
            success("Пользователь создан");
            close();
        } catch (e) {
            const error = e as IMessagesErrorResponse;
            fail(error.response.data[0].message);
        }

        setIsConfirmLoading(false);
    }

    const close = () => {
        setIsOpening(false);
    }

    return (
        <Modal
            title="Добавление пользователя"
            open={isOpening}
            onOk={tryCreateUser}
            confirmLoading={isConfirmLoading}
            onCancel={close}
            okText="Добавить"
            cancelText="Отменить"
        >
            <CreateUserForm user={user} setUser={setUser} />
        </Modal>
    );
};

export default CreateUserModal;