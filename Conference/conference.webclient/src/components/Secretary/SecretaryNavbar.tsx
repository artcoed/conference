import { Menu, Row } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Roles } from '../../models/Roles';
import { PathNames } from '../../routes';

const SecretaryNavbar: FC<{ setRole: (role: Roles) => void }> = ({ setRole }) => {
    const navigate = useNavigate();

    return (
        <Header>
            <Row justify="end">
                <Menu selectable={false} theme="dark" mode="horizontal" disabledOverflow items={[
                    {
                        key: 1,
                        label: 'Совещания',
                        onClick: () => navigate(PathNames.MEETINGS)
                    },
                    {
                        key: 2,
                        label: 'Выйти',
                        onClick: () => {
                            localStorage.removeItem('role')
                            localStorage.removeItem('token')
                            setRole(Roles.None)
                        }
                    }
                ]} />
            </Row>
        </Header>
    );
};

export default SecretaryNavbar;
