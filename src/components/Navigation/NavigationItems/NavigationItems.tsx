import React, {Fragment} from 'react';
import classes from'./NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

interface Props{

}

const NavigationItems = (props:Props)=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        <NavigationItem link="/orders">My Orders</NavigationItem>
    </ul>
);

export default NavigationItems;