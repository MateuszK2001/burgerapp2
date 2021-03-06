import React from 'react';
import classes from './BuildControl.module.css';

export interface Props{
    label:String;
    moreClicked?: ()=>void;
    lessClicked?: ()=>void;
    canRemoveIngredient: boolean;
}

const buildControl = (props:Props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} disabled={!props.canRemoveIngredient} onClick={props.lessClicked}>Less</button>
        <button className={classes.More} onClick={props.moreClicked}>More</button>
    </div>
);

export default buildControl;