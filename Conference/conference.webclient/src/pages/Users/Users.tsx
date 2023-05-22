import { Button, Row } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import CreateUserModal from '../../components/CreateUserModal/CreateUserModal';
import Heading from '../../components/Heading/Heading';
import UsersList from '../../components/UsersList/UsersList';
import { getUsers } from '../../http/users';
import { IUser } from '../../models/domain/IUser';
import { IMessagesErrorResponse } from '../../models/response/IMessagesErrorResponse';

const Users: FC<{ fail: (message: string) => void }> = () => {
    const [isOpening, setIsOpening] = useState<boolean>(false);
    const [users, setUsers] = useState<IUser[]>([] as IUser[]);
    const [isUsersLoading, setIsUsersLoading] = useState<boolean>(true);
    const [isLoadingDeleting, setIsLoadingDeleting] = useState<boolean>(false);

    const showCreateUserModal = () => {
        setIsOpening(true);
    };

    const updateUsersList = async () => {
        setIsUsersLoading(true);

        try {
            const response = await getUsers();
            setUsers(response.data.data);
        } catch (e) { }

        setIsUsersLoading(false);
    }

    const deleteUser = async (user: IUser) => {
        setIsLoadingDeleting(true);

        try {
            await deleteUser(user);
        } catch (e) {
            const error = e as IMessagesErrorResponse
            fail(error.response.data[0].message);
        }

        setIsLoadingDeleting(false)
        updateUsersList();
    }

    useEffect(() => {
        updateUsersList();
    }, [])

    return (
        <div>
            <Heading content="Пользователи" />

            <Row justify="end">
                <Button type="primary" onClick={showCreateUserModal}>
                    Добавить пользователя
                </Button>
            </Row>

            <CreateUserModal fail={fail} isOpening={isOpening} setIsOpening={setIsOpening} updateUsersList={updateUsersList} />

            <UsersList isLoadingDeleting={isLoadingDeleting} users={users} deleteUser={deleteUser} isLoading={isUsersLoading} />
        </div>
    );
};

export default Users;
