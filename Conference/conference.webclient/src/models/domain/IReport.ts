import { INote } from "./INote";
import { IUser } from "./IUser";
import { IVote } from "./IVote";

export interface IReport {
    id: number;
    meetingTitle: string;
    meetingCompleted: boolean;
    startDateTime: Date;
    endDateTime: Date;
    decisions?: string[];
    notes?: INote[];
    questions?: string[];
    users?: IUser[];
    hasVoting?: boolean;
    votingTitle?: string;
    votes?: IVote[];
};