import ActionTypes from "./actionTypes";
import Axios from "axios";

export var authActions ={
    auth: (email:string, password:string)=>{
        return (disptach:any)=>{
            const apiKey = 'AIzaSyAYr_I7gFHoibWQnCss5xfY9KLjQIFzA9g';
            return Axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
                .then(response=>{
                    console.log(response);
                    return Promise.resolve();
                })
        }
    }
}
