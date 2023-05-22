import { IDocument } from "./IDocument";

export interface IMeeting {
    id?: number;
    meetingTitle?: string;
    hasCompleted?: boolean;
    startDateTime?: Date;
    endDateTime?: Date;
    questions?: string[];
    notes?: string[];
    decisions?: string[];
    hasVoting?: boolean;
    votingTitle?: string;
    votingOptions?: string[];
    documents?: IDocument[];
    hasVoted?: boolean;
    selectedOption?: string;
    usersId?: number[];
};