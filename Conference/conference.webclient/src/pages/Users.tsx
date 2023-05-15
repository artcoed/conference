import React, { FC, useState } from 'react';
import CreateUserForm from '../components/Common/CreateUserForm';
import UsersList from '../components/Common/UsersList';
import { IUser } from '../models/IUser';

const Users: FC = () => {
    const [users, setUsers] = useState([
        { id: 1, login: "123", password: "13", name: "123", role: "123" },
        { id: 2, login: "123", password: "13", name: "123", role: "123" },
        { id: 3, login: "123", password: "13", name: "123", role: "123" }
    ])

    const addUser = (user: IUser) => {
        setUsers([...users, user]);
    }

    const deleteUser = (user: IUser) => {
        setUsers(users.filter(u => u !== user));
    }

    return (
        <div>
            <h1>Users</h1>
            <CreateUserForm addUser={addUser} />
            <UsersList users={users} deleteUser={deleteUser} />
        </div>
    );
};

export default Users;
