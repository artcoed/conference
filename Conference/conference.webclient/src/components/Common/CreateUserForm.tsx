import { Button, Form, Select } from 'antd';
import Input from 'antd/es/input/Input';
import React, { FC, useEffect, useState } from 'react';
import { IUser } from '../../models/IUser';
import { ICreatingUser } from '../../pages/Users';
import classes from "./CreateUserForm.module.css";

const CreateUserForm: FC<{ error: string, creatingUser: ICreatingUser, setCreatingUser: (user: ICreatingUser) => void }> = ({ error, creatingUser, setCreatingUser }) => {
    const handleChange = (value: { value: string; label: React.ReactNode }) => {
        setCreatingUser({ ...creatingUser, role: value.value })
    };

    return (
        <Form>
            <Form.Item label="Логин">
                <Input placeholder="Введите логин" value={creatingUser.login} onChange={(e) => setCreatingUser({ ...creatingUser, login: e.target.value })} />
            </Form.Item>
            <Form.Item label="Пароль">
                <Input placeholder="Введите пароль" value={creatingUser.password} onChange={(e) => setCreatingUser({ ...creatingUser, password: e.target.value })} />
            </Form.Item>
            <Form.Item label="Имя">
                <Input placeholder="Введите имя" value={creatingUser.name} onChange={(e) => setCreatingUser({ ...creatingUser, name: e.target.value })} />
            </Form.Item>
            <Form.Item label="Роль">
                <Select
                    labelInValue
                    defaultValue={{
                        value: 'quest',
                        label: 'Гость',
                    }}
                    onChange={handleChange}
                    options={[
                        {
                            value: 'quest',
                            label: 'Гость',
                        },
                        {
                            value: 'worker',
                            label: 'Работник',
                        },
                        {
                            value: 'secretary',
                            label: 'Секретарь',
                        },
                        {
                            value: 'administrator',
                            label: 'Администратор',
                        },
                    ]}>
                    <Select.Option value="quest">Гость</Select.Option>
                    <Select.Option value="worker">Работник</Select.Option>
                    <Select.Option value="secretary">Секретарь</Select.Option>
                    <Select.Option value="administrator">Администратор</Select.Option>
                </Select>
            </Form.Item>
            <div className={classes.ErrorMessageContainer}>
                {error && <p className={classes.ErrorMessage}>{error}</p>}
            </div>
        </Form>
    );
};

export default CreateUserForm;
