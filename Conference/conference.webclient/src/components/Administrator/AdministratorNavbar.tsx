import { Menu, Row } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { PathNames } from '../../routes';

const AdministratorNavbar: FC = () => {
    const navigate = useNavigate();

    return (
        <Header>
            <Row justify="end">
                <Menu selectable={false} theme="dark" mode="horizontal" disabledOverflow items={[
                    {
                        key: 1,
                        label: 'USERS',
                        onClick: () => navigate(PathNames.USERS)
                    },
                    {
                        key: 2,
                        label: 'MEETINGS',
                        onClick: () => navigate(PathNames.MEETINGS)
                    },
                    {
                        key: 3,
                        label: 'LOGOUT',
                        onClick: () => console.log("LOGOUT")
                    }
                ]} />
            </Row>
        </Header>
    );
};

export default AdministratorNavbar;
