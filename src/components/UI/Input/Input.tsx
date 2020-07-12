import React, { Fragment, HTMLAttributes, HtmlHTMLAttributes } from 'react';
import PropWrapper from '../../../hoc/PropWrapper/PropWrapper';
import classes from './Input.module.css';

interface Props {
    label?: string;
    inputtype: 'input' | 'textarea';
}

const Input = (props: Props&(React.HTMLProps<HTMLInputElement> | React.HTMLProps<HTMLTextAreaElement>)) => {
    let inputElement = PropWrapper((<input className={classes.InputElement} />).type, {className:classes.InputElement, ...props})({});

    switch (props.inputtype) {
        case ('input'):
            inputElement = PropWrapper((<input className={classes.InputElement} />).type, {className:classes.InputElement, ...props})({});
            break;
        case ('textarea'):
            inputElement = PropWrapper((<textarea className={classes.InputElement} />).type, {className:classes.InputElement, ...props})({});
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;