import { Button, Form, Input } from 'antd';
import Password from 'antd/es/input/Password';
import React, { FC, useState } from 'react';
import Heading from '../../components/Heading/Heading';
import { loginUser } from '../../http/users';
import { IUser } from '../../models/domain/IUser';
import { Roles } from '../../models/domain/Roles';
import { IMessagesErrorResponse } from '../../models/response/IMessagesErrorResponse';
import { setAuth } from '../../services/RolesService';

const Login: FC<{ fail: (message: string) => void, setRole: (role: Roles) => void }> = ({ fail, setRole }) => {
    const [user, setUser] = useState<IUser>({} as IUser);
    const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);

    const submit = async () => {
        setIsLoginLoading(true);

        try {
            const response = await loginUser(user);
            setAuth(response);
            setRole(response.role as Roles);
        } catch (e) {
            const error = e as IMessagesErrorResponse;
            if (error.response) {
                fail(error.response.data[0].message);
            }
        }

        setIsLoginLoading(false);
    }

    return (
        <div>
            <Heading content="Вход" />

            <Form>
                <Form.Item>
                    <Input placeholder="Введите логин" value={user.login} onChange={e => setUser({ ...user, login: e.target.value })} />
                </Form.Item>
                <Form.Item>
                    <Password placeholder="Введите пароль" value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} />
                </Form.Item>
                <Form.Item>
                    <Button onClick={submit} loading={isLoginLoading}>Войти</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
