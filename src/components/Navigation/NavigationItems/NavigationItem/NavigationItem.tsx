import React from 'react';
import classes from'./NavigationItem.module.css';
import { NavLink } from 'react-router-dom';


interface Props{
    children: React.ReactNode;
    link:string;
    clicked?:()=>void;
}

const NavigationItem = (props:Props)=>(
    <li className={classes.NavigationItem}>
        <NavLink
            exact
            onClick={props.clicked}
            to={props.link}
            activeClassName={classes.active}
            >{props.children}</NavLink>
    </li>
);

export default NavigationItem;