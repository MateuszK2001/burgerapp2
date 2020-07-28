import React, { useState, useEffect, Fragment, useLayoutEffect } from 'react';
import { Validation } from '../../components/UI/Form/Validation/Validation';
import InputText from '../../components/UI/Form/Inputs/InputText/InputText';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import { authActions } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import { MergedState } from '../..';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect, useHistory } from 'react-router-dom';

interface Props {
    auth: (email: string, pass: string, isSignUp: boolean) => Promise<void>;
    
    errorMessage: string|null,
    token: string|null,
    userId: string|null,
    isAuthenticated: boolean;
    redirectPath:string;
}

interface InputElement {
    elementConfig: any,
    value: string,
    valid: boolean,
    validation?: Validation,
}



interface FormData {
    login: InputElement,
    password: InputElement,
}


const Auth = (props: Props) => {
    const [isValid, isValidUpdate] = useState(false);
    const [isSignUp, isSignUpUpdate] = useState(true);
    const [formData, formDataUpdate] = useState({
        login: {
            elementConfig: {
                type: 'text',
                placeholder: 'Your login'
            },
            value: '',
            valid: false,
            validation: {
                required: true,
                isEmail: true
            },
        },
        password: {
            elementConfig: {
                type: 'password',
                placeholder: 'Your password'
            },
            value: '',
            valid: false,
            validation: {
                required: true,
                minLength: 6
            },
        },
    } as FormData);
    const [loading, loadingUpdate] = useState(false);

    const history = useHistory();

    useEffect(() => {
        const valid = Object.values(formData).reduce((isFormValid: boolean, element: InputElement) => {
            return isFormValid && element.valid;
        }, true);
        isValidUpdate(valid);

    }, [formData]);


    
    const inputChangedHandler = (id: keyof FormData, value: string) => {
        const updatedForm = { ...formData };
        updatedForm[id].value = value;
        formDataUpdate(updatedForm);
    }
    const validityChangedHandler = (id: keyof FormData, valid: boolean) => {
        const updatedForm = { ...formData };
        updatedForm[id].valid = valid;
        formDataUpdate(updatedForm);
    }

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        loadingUpdate(true);
        props.auth(formData.login.value, formData.password.value, isSignUp)
            .then(() => {
                // loadingUpdate(false);
                // history.push(props.redirectPath);
            })
    };
    const switchAuthModeHandler = () => {
        isSignUpUpdate(!isSignUp);
    };
    let form = (
        <form onSubmit={submitHandler}>
            {
                Object.entries(formData).map(([idx, el]: [string, InputElement]) => (
                    <InputText
                        key={idx}
                        elementConfig={el.elementConfig}
                        value={el.value}
                        validation={el.validation}
                        valueChanged={inputChangedHandler.bind(null, idx as keyof FormData)}
                        validChanged={validityChangedHandler.bind(null, idx as keyof FormData)}
                    />
                ))
            }
            <Button btnType='Success' disabled={!isValid}>SUBMIT</Button>
        </form>
    );
    if(loading)
        form = <Spinner />
    
    const redirect = props.isAuthenticated 
            ? <Redirect to={props.redirectPath} />
            :null;

    
    return (
        <Fragment>
            {redirect}
            <div className={classes.Auth}>
                {form}
                <Button btnType='Danger' clicked={switchAuthModeHandler}>Switch to {isSignUp ? "Sign In" : "Sign Up"}</Button>
            </div>
            <p>{props.errorMessage}</p>
            <p>token: {props.token} </p>
            <p>userId: {props.userId} </p>
        </Fragment>
    )
};
const stateToProps = (state:MergedState)=>{
    return{
        errorMessage: state.auth.error,
        token: state.auth.token,
        userId: state.auth.userId,
        isAuthenticated: state.auth.token!==null,
        redirectPath: state.auth.redirectPath
    }
};
const dispatchToProps = (dispatch: any) => {
    return {
        auth: (email: string, pass: string, isSignUp: boolean) => dispatch(authActions.auth(email, pass, isSignUp?'signup':'signin')),
    }
};
export default connect(stateToProps, dispatchToProps)(Auth);