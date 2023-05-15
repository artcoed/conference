import { AppDispatch, store } from "../..";
import AuthService from "../../../services/AuthService";
import { AuthAction, AuthActions, SetAuthAction, SetErrorAction, SetIsLoadingAction } from "./types";

export const AuthActionCreators = {
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({ type: AuthActions.SET_IS_LOADING, payload }),
    setAuth: (payload: string): SetAuthAction => ({ type: AuthActions.SET_AUTH, payload }), 
    setError: (payload: string): SetErrorAction => ({ type: AuthActions.SET_ERROR, payload }),
    doLogin: (login: string, password: string) => async () => {
        console.log(1)
        try {
            store.dispatch(AuthActionCreators.setIsLoading(true))
            const axiosResponse = await AuthService.doLogin(login, password)
            localStorage.setItem('token', axiosResponse.data.token)
            localStorage.setItem('role', axiosResponse.data.role)
            store.dispatch(AuthActionCreators.setAuth(axiosResponse.data.role))
        } catch (e) {
            store.dispatch(AuthActionCreators.setError("Произошла ошибка: " + e))
        }
        store.dispatch(AuthActionCreators.setIsLoading(false))
    }
}