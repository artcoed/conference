import $api from "..";

export const VOTES = 'VOTES/'

export const createVote = async (meetingId: number, optionName: string) => {
    return await $api.post(VOTES + 'CreateVote', { meetingId, optionName });
}