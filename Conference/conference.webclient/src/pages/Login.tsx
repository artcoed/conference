import { Button, Form, Input } from 'antd';
import React, { FC, useState } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { store } from '../store';
import { AuthActionCreators } from '../store/reducers/auth/action-creators';
import classes from "./Login.module.css";

const Login: FC = () => {
    const dispatch = useAppDispatch()

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const { error, isLoading } = useTypedSelector(state => state.auth);

    const submit = () => {
        AuthActionCreators.doLogin(login, password)
        
    }

    return (
        <div className={classes.Login}>
            <div className={classes.Container}>
                <h1 className={classes.Header}>Вход</h1>
                <Form>
                    <Input className={classes.Input} placeholder="Введите логин" value={login} onChange={e => setLogin(e.target.value)} />
                    <Input className={classes.Input} placeholder="Введите пароль" value={password} onChange={e => setPassword(e.target.value)} />
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
