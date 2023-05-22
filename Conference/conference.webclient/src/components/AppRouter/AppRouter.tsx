import { Layout } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { IRoute } from '../../models/domain/IRoute';
import { Roles } from '../../models/domain/Roles';
import { administratorRoutes, publicRoutes, questAndWorkerRoutes, secretaryRoutes } from '../../routes';
import { getCurrentRole } from '../../services/RolesService';
import Navbar from '../Navbar/Navbar';
import PageLoader from '../PageLoader/PageLoader';

const AppRouter: FC = () => {
    const [isLoadingRole, setIsLoadingRole] = useState<boolean>(true);
    const [currentRoutes, setCurrentRoutes] = useState<IRoute[]>([] as IRoute[]);

    useEffect(() => {
        switch (getCurrentRole()) {
            case Roles.Administrator:
                setCurrentRoutes(administratorRoutes);
                break;
            case Roles.Secretary:
                setCurrentRoutes(secretaryRoutes);
                break;
            case Roles.Worker:
                setCurrentRoutes(questAndWorkerRoutes);
                break;
            case Roles.Quest:
                setCurrentRoutes(questAndWorkerRoutes);
                break;
            default:
                setCurrentRoutes(publicRoutes);
        }

        setIsLoadingRole(false)
    }, [])

    return (
        <div>
            {isLoadingRole ? <PageLoader /> :
                <>
                    <Navbar />
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
