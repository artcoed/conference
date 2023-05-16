import React from "react";
import AdministratorMeetings from "../pages/Administrator/AdministratorMeetings";
import Login from "../pages/Login";
import QuestAccount from "../pages/Quest/QuestAccount";
import QuestMeeting from "../pages/Quest/QuestMeeting";
import Report from "../pages/Report";
import SecretaryMeeting from "../pages/Secretary/SecretaryMeeting";
import SecretaryMeetings from "../pages/Secretary/SecretaryMeetings";
import Users from "../pages/Users";

export interface IRoute {
    path: string;
    component: React.ReactElement;
    exact?: boolean;
}

export enum PathNames {
    ALL = '*',
    LOGIN = 'login',
    ACCOUNT = 'account',
    USERS = 'users',
    MEETINGS = 'meetings',
    MEETING = 'meetings/:id',
    REPORT = 'meetings/:id/report',
}

export const GetReportPath = (id: string) => {
    return "/meetings/" + id + "/report";
}

export const GetMeetingPath = (id: string) => {
    return "/meetings/" + id;
}

export const administratorRoutes: IRoute[] = [
    { path: PathNames.USERS, component: <Users/> },
    { path: PathNames.MEETINGS, component: <AdministratorMeetings /> },
    { path: PathNames.REPORT, component: <Report /> }
]

export const secretaryRoutes: IRoute[] = [
    { path: PathNames.MEETINGS, component: <SecretaryMeetings /> },
    { path: PathNames.MEETING, component: <SecretaryMeeting /> },
]

export const questRoutes: IRoute[] = [
    { path: PathNames.ACCOUNT, component: <QuestAccount /> },
    { path: PathNames.MEETING, component: <QuestMeeting/> }
]
