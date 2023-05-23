import $api from "..";

export const VOTINGS = 'Votings/'

export const createVoting = async (meetingId: number, title: string, options: string[]) => {
    await $api.post(VOTINGS + 'CreateVoting', { meetingId, title, options });
}
