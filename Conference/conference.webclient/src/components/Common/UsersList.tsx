import { Button } from 'antd';
import React, { FC } from 'react';
import { IUser } from '../../models/IUser';

const UsersList: FC<{ users: IUser[], deleteUser: (user: IUser) => void }> = ({ users, deleteUser }) => {
    return (
        <div>
            {users.map(user =>
                <div key={user.id}>
                    <p>{user.login}</p>
                    <p>{user.password}</p>
                    <p>{user.name}</p>
                    <p>{user.role}</p>
                    <Button onClick={() => deleteUser(user)}>Delete user</Button>
                </div>
            )}
        </div>
    );
};

export default UsersList;