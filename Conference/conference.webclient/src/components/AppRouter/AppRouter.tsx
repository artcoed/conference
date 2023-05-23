import { Layout, message, Spin } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { IRoute } from '../../models/domain/IRoute';
import { Roles } from '../../models/domain/Roles';
import { getPublicRoutes, getQuestAndWorkerRoutes, getSecretaryRoutes } from '../../routes';
import { getCurrentRole } from '../../services/RolesService';
import Navbar from '../Navbar/Navbar';
import PageLoader from '../PageLoader/PageLoader';
import classes from "./AppRouter.module.css";

const AppRouter: FC = () => {
    const [isLoadingRole, setIsLoadingRole] = useState<boolean>(true);
    const [currentRoutes, setCurrentRoutes] = useState<IRoute[]>([] as IRoute[]);
    const [role, setRole] = useState(Roles.None);

    const [messageApi, contextHolder] = message.useMessage();

    const fail = (message: string) => {
        messageApi.open({
            type: 'error',
            content: message,
        });
    }

    const success = (message: string) => {
        messageApi.open({
            type: 'success',
            content: message,
        }); 
    }

    useEffect(() => {
        setRole(getCurrentRole());
    }, [])

    useEffect(() => {
        setIsLoadingRole(true);

        switch (role) {
            case Roles.Secretary:
                setCurrentRoutes(getSecretaryRoutes(fail, success));
                break;
            case Roles.Worker:
                setCurrentRoutes(getQuestAndWorkerRoutes(fail, success));
                break;
            case Roles.Quest:
                setCurrentRoutes(getQuestAndWorkerRoutes(fail, success));
                break;
            default:
                setCurrentRoutes(getPublicRoutes(fail, setRole));
        }

        setTimeout(() => {
            setIsLoadingRole(false);
        }, 250)
    }, [role])

    return (
        <div>
            {contextHolder}
            {isLoadingRole ? <PageLoader /> :
                <>
                    <Navbar setRole={setRole} role={role} />
                    <Layout.Content>
                        <div className={classes.Wrapper}>
                            <div className={classes.Container}>
                                <Routes>
                                    {currentRoutes.map(route =>
                                        <Route path={route.path} element={route.element} key={route.path} />
                                    )}
                                </Routes>
                            </div>
                        </div>
                    </Layout.Content>
                    <Layout.Footer>
                        <div style={{height: "50px"}} />
                    </Layout.Footer>
                </>
            }
        </div>
    );
};

export default AppRouter;
