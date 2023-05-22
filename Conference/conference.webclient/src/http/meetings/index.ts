import $api from ".."
import { IMeeting } from "../../models/domain/IMeeting";
import { IGetFewResponse } from "../../models/response/IGetFewResponse";

export const getByInvitedUserMeetings = async () => {
    return await $api.get("Meetings/GetByInvitedUserMeetings") as IGetFewResponse<IMeeting>;
}