import ActionTypes from "./actionTypes";
import Axios from "axios";
import { Action as AuthAction } from "../reducers/authReducer";


export var authActions = {
    checkAuthTimeout: (expirationTime:number)=>{
        return (dispatch:any)=>{
            setTimeout(()=>{
                dispatch(authActions.logout());
            }, expirationTime*1000);
        };
    },
    logout: ()=>{
        return{
            type: ActionTypes.AUTH_LOGOUT
        }
    },
    auth: (email: string, password: string, method: 'signup' | 'signin' = 'signup') => {
        const apiKey = 'AIzaSyAYr_I7gFHoibWQnCss5xfY9KLjQIFzA9g';
        const signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
        const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

        return (dispatch: any) => {
            dispatch({ type: ActionTypes.AUTH_START });
            return Axios.post(method === 'signup' ? signUpUrl : signInUrl,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
                .then(response => {
                    console.log(response.data);
                    dispatch({
                        type: ActionTypes.AUTH_SUCCESSFUL,
                        token: response.data.idToken,
                        userId: response.data.localId
                    } as AuthAction);
                    dispatch(authActions.checkAuthTimeout(response.data.expiresIn));
                })
                .catch(error => {
                    let errMsg = "";
                    if (error.response) {
                        errMsg = `ERROR ${error.response.status} - ${error.response.data.error.message}`;
                    } else if (error.request) {
                        errMsg = error.request;
                    } else {
                        errMsg = error.message;
                    }

                    dispatch({
                        type: ActionTypes.AUTH_FAILED,
                        error: errMsg,
                    } as AuthAction);
                })
        }
    }
}
