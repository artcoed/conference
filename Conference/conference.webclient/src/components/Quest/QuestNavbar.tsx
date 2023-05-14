import { Menu, Row } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { PathNames } from '../../routes';

const QuestNavbar: FC = () => {
    const navigate = useNavigate();

    return (
        <Header>
            <Row justify="end">
                <Menu selectable={false} theme="dark" mode="horizontal" items={[
                    {
                        key: 1,
                        label: 'ACCOUNT',
                        onClick: () => navigate(PathNames.ACCOUNT)
                    },
                    {
                        key: 2,
                        label: 'LOGOUT',
                        onClick: () => console.log("LOGOUT")
                    }
                ]} />
            </Row>
        </Header>
    );
};

export default QuestNavbar;
