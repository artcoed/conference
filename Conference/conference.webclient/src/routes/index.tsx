import React from "react";
import { IRoute } from "../models/domain/IRoute";
import { RouteNames } from "../models/domain/RouteNames";
import QuestAccount from "../pages/Account/QuestAccount";
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
    { path: RouteNames.REPORT, element: <Report /> }
];

export const secretaryRoutes: IRoute[] = [
    { path: RouteNames.MEETINGS, element: <SecretaryMeetings /> },
    { path: RouteNames.MEETING, element: <SecretaryMeeting /> },
];

export const workerRoutes: IRoute[] = [
    { path: RouteNames.ACCOUNT, element: <QuestAccount /> },
    { path: RouteNames.MEETING, element: <QuestMeeting /> }
];

export const questRoutes: IRoute[] = [
    { path: RouteNames.ACCOUNT, element: <QuestAccount /> },
    { path: RouteNames.MEETING, element: <QuestMeeting /> }
];
