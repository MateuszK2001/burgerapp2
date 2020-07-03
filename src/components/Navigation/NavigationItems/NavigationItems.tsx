import React, {Fragment} from 'react';
import classes from'./NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

interface Props{

}

const NavigationItems = (props:Props)=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Burger Builder</NavigationItem>
        <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
);

export default NavigationItems;