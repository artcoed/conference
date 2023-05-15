import { Button, Form } from 'antd';
import Input from 'antd/es/input/Input';
import React, { FC, useState } from 'react';
import { IUser } from '../../models/IUser';

const CreateUserForm: FC<{ addUser: (user: IUser) => void }> = ({ addUser }) => {
    const [creatingUser, setCreatingUser] = useState({ id: Date.now(), login: "", password: "", name: "", role: "" });

    return (
        <Form>
            <Input placeholder="Login" value={creatingUser.login} onChange={(e) => setCreatingUser({ ...creatingUser, login: e.target.value })} />
            <Input placeholder="Password" value={creatingUser.password} onChange={(e) => setCreatingUser({ ...creatingUser, password: e.target.value })} />
            <Input placeholder="Name" value={creatingUser.name} onChange={(e) => setCreatingUser({ ...creatingUser, name: e.target.value })} />
            <Input placeholder="Role" value={creatingUser.role} onChange={(e) => setCreatingUser({ ...creatingUser, role: e.target.value })} />
            <Button onClick={() => addUser(creatingUser)}>Add user</Button>
        </Form>
    );
};

export default CreateUserForm;
