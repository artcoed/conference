import React, { FC, useState } from 'react';
import classes from "./Users.module.css";

const Users: FC = () => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [creatingUser, setCreatingUser] = useState({ login: "", password: "", name: "", role: "quest" });
    const [creatingError, setCreatingError] = useState('')

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        setConfirmLoading(true);
        setCreatingError('')
        try {
            await $api.post('Users/CreateUser', creatingUser);
            updateUsersList()
            setCreatingUser({ login: "", password: "", name: "", role: "quest" })
            setOpen(false)
        } catch (e) {
            const error = e as IUsersCreateResponseError
            setCreatingError(error.response.data[0].message)
        }

        setConfirmLoading(false);
    };

    const handleCancel = () => {
        setCreatingError('')
        setOpen(false);
    };

    const [users, setUsers] = useState([] as IUserListRequest[])
    const [isUsersLoading, setIsUsersLoading] = useState(true)

    useEffect(() => {
        updateUsersList();
    }, [])

    const updateUsersList = async () => {
        setIsUsersLoading(true)
        try {
            const response = await $api.get("Users/GetUsers") as IUsersListSuccessResponse
            setUsers(response.data);
        } catch (e) {
        }
        setIsUsersLoading(false)
    }

    const [isLoadingDeleting, setIsLoadingDeleting] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();

    const errorDelete = (e: string) => {
        messageApi.open({
            type: 'error',
            content: e,
        });
    };

    const deleteUser = async (user: IUserListRequest) => {
        setIsLoadingDeleting(true)
        try {
            const response = await $api.delete("Users/DeleteUser", { data: { userId: user.id } })
        } catch (e) {
            const error = e as IUsersCreateResponseError
            errorDelete(error.response.data[0].message);
        }
        setIsLoadingDeleting(false)
        updateUsersList();
    }

    return (
        <>
            {contextHolder}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ width: "1200px", minHeight: "calc(100vh - 64px)" }}>
                    <h1 className={classes.Header}>Пользователи</h1>
                    <Row justify="end">
                        <Button type="primary" onClick={showModal} style={{ marginTop: "10px" }}>
                            Добавить пользователя
                        </Button>
                    </Row>
                    <Modal
                        title="Добавление пользователя"
                        open={open}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                        okText="Добавить"
                        cancelText="Отменить"
                    >
                        <CreateUserForm creatingUser={creatingUser} setCreatingUser={setCreatingUser} error={creatingError} />
                    </Modal>
                    <UsersList isLoadingDeleting={isLoadingDeleting} users={users} deleteUser={deleteUser} isLoading={isUsersLoading} />
                </div>
            </div>
        </>
    );
};

export default Users;
