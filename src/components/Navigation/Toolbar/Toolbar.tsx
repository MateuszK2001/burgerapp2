import React from 'react';
import classes from'./Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

interface Props{
    menuOpened: ()=>void;
}

const Toolbar = (props:Props)=>(
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.menuOpened}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default Toolbar;