import React from 'react';
import classes from './BuildControl.module.css';

export interface Props{
    label:String;
}

const buildControl = (props:Props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less}>Less</button>
        <button className={classes.More}>More</button>
    </div>
);

export default buildControl;