import { Menu, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMenuButton } from "../../models/domain/IMenuButton";
import { Roles } from "../../models/domain/Roles";
import { RouteNames } from "../../models/domain/RouteNames";

const Navbar: FC<{ role: Roles, setRole: (role: Roles) => void }> = ({ role, setRole }) => {
    const navigate = useNavigate();
    const [currentMenuButtons, setCurrentMenuButtons] = useState<IMenuButton[]>([] as IMenuButton[]);

    useEffect(() => {
        const logout = () => {
            localStorage.removeItem('role');
            localStorage.removeItem('token');
            setRole(Roles.None);
        };

        const logoutMenuButton: IMenuButton = { label: "Выйти", onClick: logout };

        const secretaryMenuButtons: IMenuButton[] = [
            { label: "Совещания", onClick: () => navigate(RouteNames.MEETINGS) },
            { label: "Отчеты", onClick: () => navigate(RouteNames.REPORTS) },
            { label: "Пользователи", onClick: () => navigate(RouteNames.USERS) },
            logoutMenuButton
        ];

        const questAndWorkerMenuButtons: IMenuButton[] = [
            { label: "Аккаунт", onClick: () => navigate(RouteNames.ACCOUNT) },
            logoutMenuButton
        ];

        const anonymousMenuButtons: IMenuButton[] = [
            { label: "Вход", onClick: () => navigate(RouteNames.LOGIN) },
        ];

        switch (role) {
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
    }, [role, navigate, setRole]);

    return (
        <Header>
            <Row justify="space-between">
                <Row justify="start" align="middle" style={{ cursor: "pointer" }} onClick={currentMenuButtons[0]?.onClick}>
                    <svg style={{ fill: "#FFFFFF", height: "45px", width: "45px" }} version="1.1" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path d="M79.2,176.1l-13.1-2l-3.4-36c-1-16-14.7-28.2-30.7-27.2c-16,1-28.2,14.7-27.2,30.9l3.6,37.7c0.7,11.4,8,21.3,18.6,25.3   c2.8,1.4,5.9,2,9.1,1.9l27.5,1.3c2.8,0.1,5.1-2,5.2-4.7c0.1-2.7-2-5.1-4.7-5.2l-27.8-1.3c-0.2,0-0.3,0-0.5,0   c-1.6,0.1-3.1-0.2-4.5-0.9c-0.2-0.1-0.4-0.2-0.6-0.2c-7.1-2.6-12-9.2-12.5-16.9L14.7,141c-0.6-10.5,7.4-19.5,17.9-20.2   c10.6-0.6,19.5,7.4,20.2,18l3.6,37.7c0,0.6,0,1.1,0,1.7c-0.1,2.5,1.7,4.6,4.2,5l17.1,2.7c2.1,0.3,3.6,2.1,3.6,4.2v41.7   c0,2.7,2.2,5,5,5c2.7,0,5-2.2,5-5v-41.7C91.1,183.1,86.1,177.2,79.2,176.1z" />
                            <path d="M35.5,99.5c14.3,0,26-11.7,26-26s-11.7-26-26-26c-14.3,0-26,11.7-26,26S21.2,99.5,35.5,99.5z M35.5,57.4   c8.9,0,16.1,7.2,16.1,16.1s-7.2,16.1-16.1,16.1c-8.9,0-16.1-7.2-16.1-16.1S26.7,57.4,35.5,57.4z" />
                            <path d="M224,110.9c-15.9-1-29.7,11.2-30.7,27l-3.4,36.2l-13.1,2c-6.9,1.1-12,7-12,14v41.7c0,2.7,2.2,5,5,5s5-2.2,5-5v-41.7   c0-2.1,1.5-3.8,3.6-4.2l17.1-2.7c2.5-0.4,4.3-2.5,4.2-5c0-0.6,0-1.1,0-1.5l3.6-38c0.6-10.5,9.6-18.5,20.2-17.9   c10.5,0.6,18.5,9.7,17.9,20l-3.6,38c-0.5,7.5-5.3,14.1-12.4,16.7c-0.2,0.1-0.4,0.2-0.6,0.2c-1.4,0.7-2.9,1-4.5,0.9   c-0.2,0-0.4,0-0.5,0l-27.8,1.3c-2.7,0.1-4.9,2.5-4.7,5.2c0.1,2.7,2.4,4.9,5.2,4.7l27.5-1.3c3.1,0.1,6.3-0.5,9.1-1.9   c10.6-4.1,17.9-14,18.6-25.2l3.6-38C252.2,125.6,240,111.8,224,110.9z" />
                            <path d="M220.5,99.5c14.3,0,26-11.7,26-26s-11.7-26-26-26s-26,11.7-26,26S206.1,99.5,220.5,99.5z M220.5,57.4   c8.9,0,16.1,7.2,16.1,16.1s-7.2,16.1-16.1,16.1c-8.9,0-16.1-7.2-16.1-16.1S211.6,57.4,220.5,57.4z" />
                            <path d="M179.3,87.2V24.5c0-2.9-2.4-5.3-5.3-5.3H82c-2.9,0-5.3,2.4-5.3,5.3v62.7c0,2.9,2.4,5.3,5.3,5.3h25.7l16.8,16.8   c1,1,2.2,1.5,3.5,1.5s2.5-0.5,3.5-1.5l16.8-16.8H174C177,92.5,179.3,90.1,179.3,87.2z M169.4,82.6h-23.2c-1.3,0-2.6,0.5-3.5,1.5   L128,98.8L113.3,84c-0.9-0.9-2.2-1.5-3.5-1.5H86.6V29.2h82.8V82.6z" />
                        </g>
                    </svg>
                    <p style={{color: "#FFFFFF", fontSize: "20px", fontWeight: 600, marginLeft: "10px"}}>
                        CONFERENCE
                    </p>
                </Row>
                <Row justify="end">
                    <Menu
                        selectable={false}
                        theme="dark"
                        mode="horizontal"
                        disabledOverflow
                        items={currentMenuButtons.map((button) => {
                            return {
                                key: button.label,
                                label: button.label,
                                onClick: button.onClick
                            };
                        })}
                    />
                </Row>
            </Row>
        </Header>
    );
};

export default Navbar;