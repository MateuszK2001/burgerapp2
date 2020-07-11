import React from 'react';
import classes from'./Button.module.css';

interface Props{
    children: React.ReactNode;
    clicked: (event:React.MouseEvent<HTMLElement>)=>void;
    btnType: 'Danger' | "Success"
}

const Button = (props:Props)=>(
    <button 
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

export default Button;