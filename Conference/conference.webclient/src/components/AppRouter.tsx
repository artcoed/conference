import { Layout, Spin } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Roles } from '../models/Roles';
import Login from '../pages/Login';
import { administratorRoutes, PathNames, questRoutes, secretaryRoutes } from '../routes';
import AdministratorNavbar from './Administrator/AdministratorNavbar';
import AnonymousNavbar from './Anonymous/AnonymousNavbar';
import QuestNavbar from './Quest/QuestNavbar';
import SecretaryNavbar from './Secretary/SecretaryNavbar';
import classes from "./AppRouter.module.css";

const AppRouter: FC = () => {
    const [role, setRole] = useState(Roles.None)
    const [isLoadingRole, setIsLoadingRole] = useState(true)

    useEffect(() => {
        const storageRole = localStorage.getItem('role');
        if (storageRole) {
            setRole(storageRole as Roles);
        }
        setTimeout(() => {
            setIsLoadingRole(false)
        }, 1000)
    }, [])

    if (isLoadingRole) {
        return (
            <div>
                <Spin tip="Loading" size="large">
                    <div className={classes.Content} />
                </Spin>
            </div>
        )
    }

    if (role === Roles.Administrator) {
        return (
            <>
                <AdministratorNavbar setRole={setRole} />
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
                <SecretaryNavbar setRole={setRole} />
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
                <QuestNavbar setRole={setRole} />
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
                    <Route path={PathNames.LOGIN} element={<Login setRole={setRole} />} />
                    <Route path={PathNames.ALL} element={<Navigate to={PathNames.LOGIN} />} />
                </Routes>
            </Layout.Content>
        </>
    );
};

export default AppRouter;
