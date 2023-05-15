export interface AuthState {
    role: string,
    isLoading: boolean,
    error: string
}

export enum AuthActions {
    SET_AUTH = "SET_AUTH",
    SET_IS_LOADING = "SET_IS_LOADING",
    SET_ERROR = "SET_ERROR"
}

export interface SetAuthAction {
    type: AuthActions.SET_AUTH;
    payload: string;
}

export interface SetIsLoadingAction {
    type: AuthActions.SET_IS_LOADING;
    payload: boolean;
}


export interface SetErrorAction {
    type: AuthActions.SET_ERROR;
    payload: string;
}


export type AuthAction = SetAuthAction | SetIsLoadingAction | SetErrorAction