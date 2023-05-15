import { AuthAction, AuthActions, AuthState } from "./types";

const initialState: AuthState = {
    role: "",
    isLoading: false,
    error: ""
}

export default function authReducer(state = initialState, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthActions.SET_AUTH:
            return { ...state, role: action.payload }
        case AuthActions.SET_IS_LOADING:
            return { ...state, isLoading: action.payload }
        case AuthActions.SET_ERROR:
            return { ...state, error: action.payload }
        default:
            return state;
    }
}