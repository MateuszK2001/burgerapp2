import React, { useState } from 'react';
import PropWrapper from '../../../../../hoc/PropWrapper/PropWrapper';
import classes from '../Input.module.css';
import validate, { Validation } from '../../Validation/Validation';



interface Props {
    value?: string;
    valueChanged?: (value:string) => void;
    validChanged?: (valid:boolean) => void;
    validation?:Validation;
    elementConfig?: any;
}

const InputText = (props: Props) => {
    const [invalid, invalidUpdate] = useState(true);
    const [touched, touchedUpdate] = useState(false);
    

    const inputClasses =  [classes.InputElement];

    if(invalid && touched){
        inputClasses.push(classes.Invalid);
    }

    const changedHandler = (event: React.FormEvent<HTMLInputElement>)=>{
        const valid = validate(event.currentTarget.value, props.validation);
        if(valid !== !invalid){
            invalidUpdate(!valid);
            if(props.validChanged)
                props.validChanged(valid);
        }
        
        touchedUpdate(true);

        if(props.valueChanged) props.valueChanged(event.currentTarget.value);
    };

    let inputElement = PropWrapper((<input />).type, {
        className: inputClasses.join(' '),
        value: props.value,
        onChange: changedHandler,
        ...props.elementConfig,
    })({});

    return (
        <div className={classes.Input}>
            {inputElement}
        </div>
    );
};

export default InputText;