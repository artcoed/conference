import { IMeeting } from "./IMeeting";

export interface INotification {
    id: number;
    meeting?: IMeeting;
    isChecked?: boolean;
};