import React from "react";
import { Navigate } from "react-router-dom";
import { IRoute } from "../models/domain/IRoute";
import { RouteNames } from "../models/domain/RouteNames";
import QuestAccount from "../pages/Account/QuestAccount";
import Login from "../pages/Login/Login";
import QuestMeeting from "../pages/Meeting/QuestMeeting";
import SecretaryMeeting from "../pages/Meeting/SecretaryMeeting";
import AdministratorMeetings from "../pages/Meetings/AdministratorMeetings";
import SecretaryMeetings from "../pages/Meetings/SecretaryMeetings";
import Report from "../pages/Report/Report";
import Users from "../pages/Users/Users";

export const getReportPath = (id: string) => {
    return "/meetings/" + id + "/report";
};

export const getMeetingPath = (id: string) => {
    return "/meetings/" + id;
};

export const administratorRoutes: IRoute[] = [
    { path: RouteNames.USERS, element: <Users /> },
    { path: RouteNames.MEETINGS, element: <AdministratorMeetings /> },
    { path: RouteNames.REPORT, element: <Report /> },
    { path: RouteNames.ALL, element: <Navigate to={RouteNames.MEETINGS} /> }
];

export const secretaryRoutes: IRoute[] = [
    { path: RouteNames.MEETINGS, element: <SecretaryMeetings /> },
    { path: RouteNames.MEETING, element: <SecretaryMeeting /> },
    { path: RouteNames.ALL, element: <Navigate to={RouteNames.MEETINGS} /> }
];

export const workerRoutes: IRoute[] = [
    { path: RouteNames.ACCOUNT, element: <QuestAccount /> },
    { path: RouteNames.MEETING, element: <QuestMeeting /> },
    { path: RouteNames.ALL, element: <Navigate to={RouteNames.ACCOUNT} /> }
];

export const questRoutes: IRoute[] = [
    { path: RouteNames.ACCOUNT, element: <QuestAccount /> },
    { path: RouteNames.MEETING, element: <QuestMeeting /> },
    { path: RouteNames.ALL, element: <Navigate to={RouteNames.ACCOUNT} /> }
];

export const publicRoutes: IRoute[] = [
    { path: RouteNames.LOGIN, element: <Login /> },
    { path: RouteNames.ALL, element: <Navigate to={RouteNames.LOGIN} /> }
];
