import { Button, Form, Input } from 'antd';
import React, { FC, useState } from 'react';

const Login: FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const submit = () => {
    }

    return (
        <div>
            Login
            <Form>
                <Input placeholder="Login" value={login} onChange={e => setLogin(e.target.value)} />
                <Input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <Button onClick={submit}>Login</Button>
            </Form>
        </div>
    );
};

export default Login;
