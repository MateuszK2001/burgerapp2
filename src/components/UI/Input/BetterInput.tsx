import React from 'react';
import PropWrapper from '../../../hoc/PropWrapper/PropWrapper';
import classes from './Input.module.css';

interface Props {
    label?: string;
    elementType: 'input' | 'textarea' | 'select';
    value?: string;
    elementConfig: any;
    changed: (event: React.FormEvent<HTMLInputElement>) => void;
    invalid:boolean;
    touched:boolean;
    shouldValidate:boolean;
}

const BetterInput = (props: Props) => {
    const inputClasses =  [classes.InputElement];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }

    let inputElement = PropWrapper((<input />).type, {
        className: inputClasses.join(' '),
        ...props.elementConfig,
        onChange: props.changed,
        value: props.value
    })({});

    switch (props.elementType) {
        case ('input'):
            inputElement = PropWrapper((<input />).type, {
                className:  inputClasses.join(' '),
                ...props.elementConfig,
                onChange: props.changed,
                value: props.value
            })({});
            break;
        case ('textarea'):
            inputElement = PropWrapper((<textarea />).type, {
                className:  inputClasses.join(' '),
                ...props.elementConfig,
                onChange: props.changed,
                value: props.value
            })({});
            break;
        case ('select'):
            inputElement = PropWrapper((<select />).type, {
                className:  inputClasses.join(' '),
                onChange: props.changed,
                value: props.value
            })({
                children: (
                    props.elementConfig.options.map(
                        (opt: { value: string, displayValue: string }, idx: number) => (
                            <option value={opt.value} key={idx}>
                                {opt.displayValue}
                            </option>
                        ))
                )
            });
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default BetterInput;