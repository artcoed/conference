import { Form, Select } from 'antd';
import Input from 'antd/es/input/Input';
import React, { FC } from 'react';
import { IUser } from '../../models/domain/IUser';

const CreateUserForm: FC<{ user: IUser, setUser: (user: IUser) => void }> = ({ user, setUser }) => {
    const changeRole = (value: { value: string; label: React.ReactNode }) => {
        setUser({ ...user, role: value.value })
    };

    return (
        <Form style={{ paddingTop: "20px", paddingBottom: "10px" }}>
            <Form.Item label="Логин">
                <Input placeholder="Введите логин" value={user.login} onChange={(e) => setUser({ ...user, login: e.target.value })} />
            </Form.Item>
            <Form.Item label="Пароль">
                <Input placeholder="Введите пароль" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
            </Form.Item>
            <Form.Item label="Имя">
                <Input placeholder="Введите имя" value={user.displayingName} onChange={(e) => setUser({ ...user, displayingName: e.target.value })} />
            </Form.Item>
            <Form.Item label="Роль">
                <Select
                    labelInValue
                    defaultValue={{
                        value: 'quest',
                        label: 'Гость',
                    }}
                    onChange={changeRole}
                >
                    <Select.Option value="quest">Гость</Select.Option>
                    <Select.Option value="worker">Работник</Select.Option>
                    <Select.Option value="secretary">Секретарь</Select.Option>
                    <Select.Option value="administrator">Администратор</Select.Option>
                </Select>
            </Form.Item>
        </Form>
    );
};

export default CreateUserForm;
