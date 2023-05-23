import { Layout, message } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { IRoute } from '../../models/domain/IRoute';
import { Roles } from '../../models/domain/Roles';
import { getAdministratorRoutes, getPublicRoutes, getQuestAndWorkerRoutes, getSecretaryRoutes } from '../../routes';
import { getCurrentRole } from '../../services/RolesService';
import Navbar from '../Navbar/Navbar';
import PageLoader from '../PageLoader/PageLoader';

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
        setIsLoadingRole(false);
    }, [])

    useEffect(() => {
        switch (role) {
            case Roles.Administrator:
                setCurrentRoutes(getAdministratorRoutes(fail));
                break;
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
    }, [role])

    return (
        <div>
            {contextHolder}
            {isLoadingRole ? <PageLoader /> :
                <>
                    <Navbar setRole={setRole} role={role} />
                    <Layout.Content>
                        <Routes>
                            {currentRoutes.map(route =>
                                <Route path={route.path} element={route.element} key={route.path} />
                            )}
                        </Routes>
                    </Layout.Content>
                </>
            }
        </div>
    );
};

export default AppRouter;
