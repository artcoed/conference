import { Layout } from 'antd';
import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Roles } from '../models/Roles';
import { administratorRoutes, PathNames, publicRoutes, questRoutes, secretaryRoutes } from '../routes';
import AdministratorNavbar from './Administrator/AdministratorNavbar';
import AnonymousNavbar from './Anonymous/AnonymousNavbar';
import QuestNavbar from './Quest/QuestNavbar';
import SecretaryNavbar from './Secretary/SecretaryNavbar';



const AppRouter: FC = () => {
    const { role } = useTypedSelector(state => state.auth);

    if (role === Roles.Administrator) {
        return (
            <>
                <AdministratorNavbar />
                <Layout.Content>
                    <Routes>
                        {administratorRoutes.map(route =>
                            <Route path={route.path} element={route.component} key={route.path} />
                        )}
                        <Route path={PathNames.ALL} element={<Navigate to={PathNames.MEETINGS} />} />
                    </Routes>
                </Layout.Content>
            </>
        );
    }

    if (role === Roles.Secretary) {
        return (
            <>
                <SecretaryNavbar />
                <Layout.Content>
                    <Routes>
                        {secretaryRoutes.map(route =>
                            <Route path={route.path} element={route.component} key={route.path} />
                        )}
                        <Route path={PathNames.ALL} element={<Navigate to={PathNames.MEETINGS} />} />
                    </Routes>
                </Layout.Content>
            </>
        );
    }

    if (role === Roles.Quest) {
        return (
            <>
                <QuestNavbar />
                <Layout.Content>
                    <Routes>
                        {questRoutes.map(route =>
                            <Route path={route.path} element={route.component} key={route.path} />
                        )}
                        <Route path={PathNames.ALL} element={<Navigate to={PathNames.ACCOUNT} />} />
                    </Routes>
                </Layout.Content>
            </>
        );
    }

    return (
        <>
            <AnonymousNavbar />
            <Layout.Content>
                <Routes>
                    {publicRoutes.map(route =>
                        <Route path={route.path} element={route.component} key={route.path} />
                    )}
                    <Route path={PathNames.ALL} element={<Navigate to={PathNames.LOGIN} />} />
                </Routes>
            </Layout.Content>
        </>
    );
};

export default AppRouter;
