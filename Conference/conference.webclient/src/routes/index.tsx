import React from "react";
import { Navigate } from "react-router-dom";
import { Roles } from "../models/domain/Roles";
import { RouteNames } from "../models/domain/RouteNames";
import QuestAccount from "../pages/Account/QuestAccount";
import Login from "../pages/Login/Login";
import QuestMeeting from "../pages/Meeting/QuestMeeting";
import SecretaryMeeting from "../pages/Meeting/SecretaryMeeting";
import Reports from "../pages/Meetings/AdministratorMeetings";
import SecretaryMeetings from "../pages/Meetings/SecretaryMeetings";
import Report from "../pages/Report/Report";
import Users from "../pages/Users/Users";

export const getReportPath = (id: string) => {
    return "/reports/" + id;
};

export const getMeetingPath = (id: string) => {
    return "/meetings/" + id;
};

export const getSecretaryRoutes = (fail: (message: string) => void, success: (message: string) => void) => {
    return [
        { path: RouteNames.USERS, element: <Users success={success} fail={fail} /> },
        { path: RouteNames.REPORTS, element: <Reports /> },
        { path: RouteNames.REPORT, element: <Report /> },
        { path: RouteNames.MEETINGS, element: <SecretaryMeetings fail={fail} success={success} /> },
        { path: RouteNames.MEETING, element: <SecretaryMeeting fail={fail} success={success} /> },
        { path: RouteNames.ALL, element: <Navigate to={RouteNames.MEETINGS} /> }
    ];
} 

export const getQuestAndWorkerRoutes = (fail: (message: string) => void, success: (message: string) => void) => {
    return [
        { path: RouteNames.ACCOUNT, element: <QuestAccount fail={fail} success={success} /> },
        { path: RouteNames.MEETING, element: <QuestMeeting fail={fail} success={success} /> },
        { path: RouteNames.ALL, element: <Navigate to={RouteNames.ACCOUNT} /> }
    ];
}

export const getPublicRoutes = (fail: (message: string) => void, setRole: (role: Roles) => void) => {
    return [
        { path: RouteNames.LOGIN, element: <Login fail={fail} setRole={setRole} /> },
        { path: RouteNames.ALL, element: <Navigate to={RouteNames.LOGIN} /> }
    ];
}