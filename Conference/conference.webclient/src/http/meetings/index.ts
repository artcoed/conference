import $api from ".."
import { IDocument } from "../../models/domain/IDocument";
import { IMeeting } from "../../models/domain/IMeeting";
import { IGetFewResponse } from "../../models/response/IGetFewResponse";
import { IGetSingleResponse } from "../../models/response/IGetSingleResponse";

export const MEETINGS = 'Meetings/';

export const getByInvitedUserMeetings = async () => {
    return await $api.get(MEETINGS + 'GetByInvitedUserMeetings') as IGetFewResponse<IMeeting>;
}

export const getForQuestById = async (meeting: IMeeting) => {
    return await $api.get(MEETINGS + 'GetForQuestById?meetingId=' + meeting.id) as IGetSingleResponse<IMeeting>;
} 

export const downloadDocument = async (myDocument: IDocument) => {
    return await $api.get(MEETINGS + 'DownloadFileById?DocumentId=' + myDocument.id,
        {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/octet-stream'
            }
        })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', myDocument.name);
            document.body.appendChild(link);
            link.click();
        });
} 

export const getByIdMeeting = async (id: number) => {
    return await $api.get(MEETINGS + 'GetByIdMeeting?meetingId=' + id) as IGetSingleResponse<IMeeting>;
}

export const completeMeeting = async (meetingId: number) => {
    return await $api.post(MEETINGS + 'CompleteMeeting', { meetingId })
}