import { Menu, Row } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { PathNames } from '../../routes';

const AnonymousNavbar: FC = () => {
    const navigate = useNavigate();

    return (
        <Header>
            <Row justify="end">
                <Menu selectable={false}  theme="dark" mode="horizontal" items={[
                    {
                        key: 1,
                        label: 'LOGIN',
                        onClick: () => navigate(PathNames.LOGIN)
                    }
                ]} />
            </Row>
        </Header>
    );
};

export default AnonymousNavbar;
