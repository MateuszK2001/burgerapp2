import React, { useState } from 'react';
import PropWrapper from '../../../../../hoc/PropWrapper/PropWrapper';
import classes from '../Input.module.css';
import validate, { Validation } from '../../Validation/Validation';



export interface Option{
    value:string;
    displayValue:string;
}
interface Props {
    value?: string;
    valueChanged?: (value:string) => void;
    validChanged?: (valid:boolean) => void;
    validation?:Validation;
    elementConfig?: any;
    options: Option[];
}

const InputSelect = (props: Props) => {
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

    let inputElement = PropWrapper((<select />).type, {
        className: inputClasses.join(' '),
        value: props.value,
        onChange: changedHandler,
        ...props.elementConfig,
        children: (
            props.options.map(
                (opt: { value: string, displayValue: string }, idx: number) => (
                    <option value={opt.value} key={idx}>
                        {opt.displayValue}
                    </option>
                ))
        )
    })({});

    return (
        <div className={classes.Input}>
            {inputElement}
        </div>
    );
};

export default InputSelect;