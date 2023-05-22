import { Button, Form, Input } from 'antd';
import React, { FC, useState } from 'react';
import $api from '../http';
import { AuthResponse } from '../models/response/AuthResponse';
import { Roles } from '../models/Roles';
import classes from "./Login.module.css";

const Login: FC<{setRole: (role: Roles) => void}> = ({setRole}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const [isLoading, setIsLoading] = useState(false)

    const submit = async () => {
        setError('')
        setIsLoading(true)
        try {
            const response = await $api.post<AuthResponse>("Users/LoginUser", { login, password });
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('role', response.data.role)
            setRole(response.data.role as Roles)

        } catch (e) {
            const error: ILoginError = e as ILoginError;
            setError(error.response.data[0].message)
        }
        setIsLoading(false)
    }

    return (
        <div className={classes.Login}>
            <div className={classes.Container}>
                <h1 className={classes.Header}>Вход</h1>
                <Form>
                    <Input className={classes.Input} placeholder="Введите логин" value={login} onChange={e => setLogin(e.target.value)} />
                    <Input.Password className={classes.Input} placeholder="Введите пароль" value={password} onChange={e => setPassword(e.target.value)} />
                    <div className={classes.ButtonContainer}>
                        <Button className={classes.Button} onClick={submit} loading={isLoading}>Войти</Button>
                    </div>
                </Form>
                 <div className={classes.ErrorMessageContainer}>
                    {error && <p className={classes.ErrorMessage}>{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Login;
