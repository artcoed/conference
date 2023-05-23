import $api from "..";

export const DECISIONS = '/Decisions';

export const createDecision = async (meetingId: number, content: string) => {
    await $api.post("Decisions/CreateDecision", { meetingId, content });
}