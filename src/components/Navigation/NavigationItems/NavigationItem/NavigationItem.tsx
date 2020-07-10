import React, {Fragment} from 'react';
import classes from'./NavigationItem.module.css';
import { Link, NavLink } from 'react-router-dom';


interface Props{
    children: React.ReactNode;
    link:string;
}

const NavigationItem = (props:Props)=>(
    <li className={classes.NavigationItem}>
        <NavLink
            exact
            to={props.link}
            activeClassName={classes.active}
            >{props.children}</NavLink>
    </li>
);

export default NavigationItem;