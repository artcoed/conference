import { IMessageErrorResponse } from "./IMessageErrorResponse";

export interface IMessagesErrorResponse {
    response: {
        data: IMessageErrorResponse[];
    };
};