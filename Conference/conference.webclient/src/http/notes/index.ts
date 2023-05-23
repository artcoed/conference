import $api from ".."

export const NOTES = 'Notes/';

export const createNote = async (meetingId: number, content: string) => {
    return await $api.post(NOTES + 'CreateNote', { meetingId, content });
}
