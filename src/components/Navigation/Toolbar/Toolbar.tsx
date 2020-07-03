import React from 'react';
import classes from'./Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

interface Props{

}

const Toolbar = (props:Props)=>(
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems>

            </NavigationItems>
        </nav>
    </header>
);

export default Toolbar;