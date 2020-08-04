import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

interface Props {
    isAuthenticated: boolean;
    clicked?: ()=>void;
}

const NavigationItems = (props: Props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem clicked={props.clicked} link="/">Burger Builder</NavigationItem>
        {props.isAuthenticated
            ? <NavigationItem clicked={props.clicked} link="/orders">My Orders</NavigationItem>
            : null}
        {!props.isAuthenticated
            ? <NavigationItem clicked={props.clicked} link="/auth">Authenticate</NavigationItem>
            : <NavigationItem clicked={props.clicked} link="/logout">Logout</NavigationItem>
        }
    </ul>
);

export default NavigationItems;