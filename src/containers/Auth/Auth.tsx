import React, { useState, useEffect } from 'react';
import { Validation } from '../../components/UI/Form/Validation/Validation';
import InputText from '../../components/UI/Form/Inputs/InputText/InputText';
import Button from '../../components/UI/Button/Button';
import classes from'./Auth.module.css';
import ActionTypes from '../../store/actions/actionTypes';
import { authActions } from '../../store/actions/authActions';
import { connect } from 'react-redux';

interface Props {
    auth: (email:string, pass:string)=>Promise<void>;
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

    const submitHandler = (event:React.FormEvent)=>{
        event.preventDefault();
        props.auth(formData.login.value, formData.password.value)
            .then(d => console.log("Signed up"))
            .catch(err => console.log(`Error: ${err}`))
    };
    return (
        <div className={classes.Auth}>
            <form onSubmit={submitHandler}>
                {

                    Object.entries(formData).map(([idx, el]: [string, InputElement]) => (
                        <InputText
                            key={idx}
                            elementConfig={el.elementConfig}
                            value={el.value}
                            validation={el.validation}
                            valueChanged={inputChangedHandler.bind(null,idx as keyof FormData)}
                            validChanged={validityChangedHandler.bind(null,idx as keyof FormData)}
                        />
                    ))
                }
                <Button btnType='Success' disabled={!isValid} clicked={() => { }}>SUBMIT</Button>
            </form>
        </div>
    )
};
const dispatchToProps = (dispatch:any)=>{
    return{
        auth: (email:string, pass:string)=>dispatch(authActions.auth(email, pass))
    }
};
export default connect(null, dispatchToProps)(Auth);