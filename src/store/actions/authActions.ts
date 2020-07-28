import ActionTypes from "./actionTypes";
import Axios from "axios";
import { Action as AuthAction, Action } from "../reducers/authReducer";


export var authActions = {
    checkAuthTimeout: (expirationTime:Date)=>{
        const waitingMs = expirationTime.getTime() - new Date().getTime(); 
        
        return (dispatch:any)=>{
            setTimeout(()=>{
                dispatch(authActions.logout());
            }, waitingMs);
        };
    },
    logout: ()=>{ 
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('expiration');
        return{
            type: ActionTypes.AUTH_LOGOUT
        }
    },
    setRedirectPath: (path:string)=>{
        return {
            type: ActionTypes.SET_REDIRECT_PATH,
            path: path
        } as Action
    },
    authCheckSate: ()=>{
        return (dispatch:any)=>{
            const token = localStorage.getItem('token');
            const expirationTimeStr = localStorage.getItem('expiration');
            const userId = localStorage.getItem('userId');
            if(!token || !expirationTimeStr || !userId){
                dispatch(authActions.logout());
            }
            else{
                const expirationTime = new Date(expirationTimeStr);
                if(expirationTime < new Date()){
                    dispatch(authActions.logout());
                }
                dispatch({
                    type: ActionTypes.AUTH_SUCCESSFUL,
                    token: token,
                    userId: userId
                } as AuthAction);
                dispatch(authActions.checkAuthTimeout(expirationTime));
            }
        };
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
                    localStorage.setItem('token', response.data.idToken);
                    localStorage.setItem('expiration', 
                        new Date(new Date().getTime() + (response.data.expiresIn as number) * 1000).toString());
                    localStorage.setItem('userId', response.data.localId);
                    dispatch(authActions.authCheckSate());
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
