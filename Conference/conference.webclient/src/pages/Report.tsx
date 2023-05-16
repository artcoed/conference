import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

type ReportParams = {
    id: string;
};

interface IReportVoteResponse {
    id: number,
    value: string,
    users: IReportUserResponse[]
}

interface IReportUserResponse {
    id: number,
    login: string,
    name: string
}

interface IReportNoteResponse {
    id: number,
    value: string,
    user: IReportUserResponse 
}

interface IFullReportResponse {
    id: number,
    meetingTitle: string,
    meetingCompleted: boolean,
    startDateTime: Date,
    endDateTime: Date,
    decisions: string[],
    notes: IReportNoteResponse[],
    questions: string[],
    users: IReportUserResponse[],
    hasVoting: boolean,
    votingTitle: string
    votes: IReportVoteResponse[]
}

const Report: FC = () => {
    const { id } = useParams<ReportParams>();

    const report = {
        votingTitle: "",
        votingOptions: [
            { value: "" }
        ],
        votes: [
            {
                option: { value: "" },
                user: { login: "", displayingName: "" }
            }
        ]
    }

    return (
        <div>
            <h1>Report {id}</h1>
            <p>Title: {report.meetingTitle}</p>
            <p>Start: {report.startDateTime}</p>
            <p>End: {report.endDateTime}</p>
            <div>
                <p>Questions:</p>
                {report.questions.map((question, index) => 
                    <div key={index}>
                        <p>{question.value}</p>
                    </div>
                )}                
            </div>
            <div>
                <p>Decisions:</p>
                {report.decisions.map((decision, index) =>
                    <div key={index}>
                        <p>{decision.value}</p>
                    </div>
                )}
            </div>
            <div>
                <p>Users:</p>
                {report.users.map((user, index) =>
                    <div key={index}>
                        <p>{user.displayingName}({user.login})</p>
                    </div>
                )}
            </div>
            <div>
                <p>Notes</p>
                {report.notes.map((note, index) =>
                    <div key={index}>
                        <p>{note.user.displayingName}({note.user.login})</p>
                        <p>{note.value}</p>
                    </div>
                )}
            </div>
            <div>
                <p>VotingTitle</p>
                <p>{report.votingTitle}</p>
            </div>
            <div>
                <p>Voting options</p>
                {report.votingOptions.map(option =>
                    <p key={option.value}>{option.value}</p>
                )}
            </div>
            <div>
                <p>Votes</p>
                {report.votes.map(vote =>
                    <div>
                        <p>{vote.option.value}</p>
                        <p>{vote.user.displayingName}({vote.user.login})</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Report;
