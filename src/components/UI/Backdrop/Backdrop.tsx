import React from 'react';
import classes from'./Backdrop.module.css';

interface Props{
    show: boolean;
    clicked: ()=>void;
}

const Backdrop = (props:Props)=>(
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);

export default Backdrop;

