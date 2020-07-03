import React, {Fragment} from 'react';
import classes from'./NavigationItem.module.css';


interface Props{
    children: React.ReactNode;
    link:string;
    active?: boolean;
}

const NavigationItem = (props:Props)=>(
    <li className={classes.NavigationItem}>
        <a 
            className={props.active ? classes.active : ""}
            href={props.link}>{props.children}</a>
    </li>
);

export default NavigationItem;