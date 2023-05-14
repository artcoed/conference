import { Layout } from 'antd';
import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { administratorRoutes, PathNames, publicRoutes, questRoutes, secretaryRoutes } from '../routes';
import AdministratorNavbar from './Administrator/AdministratorNavbar';
import AnonymousNavbar from './Anonymous/AnonymousNavbar';
import QuestNavbar from './Quest/QuestNavbar';
import SecretaryNavbar from './Secretary/SecretaryNavbar';

const AppRouter: FC = () => {
    const isAdministrator = false;
    const isSecretary = true;
    const isQuest = false;

    if (isAdministrator) {
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

    if (isSecretary) {
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

    if (isQuest) {
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
