import { Menu, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMenuButton } from "../../models/domain/IMenuButton";
import { Roles } from "../../models/domain/Roles";
import { RouteNames } from "../../models/domain/RouteNames";
import { getCurrentRole } from "../../services/RolesService";

const Navbar: FC = () => {
    const navigate = useNavigate();
    const [currentMenuButtons, setCurrentMenuButtons] = useState<IMenuButton[]>([] as IMenuButton[]);

    const logout = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('token');
    };

    const logoutMenuButton: IMenuButton = { label: "Выйти", onClick: logout };

    const administratorMenuButtons: IMenuButton[] = [
        { label: "Пользователи", onClick: () => navigate(RouteNames.USERS) },
        { label: "Отчеты", onClick: () => navigate(RouteNames.MEETINGS) },
        logoutMenuButton
    ];

    const secretaryMenuButtons: IMenuButton[] = [
        { label: "Совещания", onClick: () => navigate(RouteNames.MEETINGS) },
        logoutMenuButton
    ];

    const questAndWorkerMenuButtons: IMenuButton[] = [
        { label: "Аккаунт", onClick: () => navigate(RouteNames.ACCOUNT) },
        logoutMenuButton
    ];

    const anonymousMenuButtons: IMenuButton[] = [
        { label: "Вход", onClick: () => navigate(RouteNames.LOGIN) },
    ];

    useEffect(() => {
        switch (getCurrentRole()) {
            case Roles.Administrator:
                setCurrentMenuButtons(administratorMenuButtons);
                break;
            case Roles.Secretary:
                setCurrentMenuButtons(secretaryMenuButtons);
                break;
            case Roles.Worker:
                setCurrentMenuButtons(questAndWorkerMenuButtons);
                break;
            case Roles.Quest:
                setCurrentMenuButtons(questAndWorkerMenuButtons);
                break;
            default:
                setCurrentMenuButtons(anonymousMenuButtons);
        }
    }, []);

    return (
        <Header>
            <Row justify="end">
                <Menu
                    selectable={false}
                    theme="dark"
                    mode="horizontal"
                    disabledOverflow
                    items={currentMenuButtons.map((button) =>
                    {
                        return {
                            key: button.label,
                            label: button.label,
                            onClick: button.onClick
                        };
                    })}
                />
            </Row>
        </Header>
    );
};

export default Navbar;