import React, {Fragment} from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from'./SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';


interface Props{
    closed: ()=>void;
    isOpen: boolean;
    isAuthenticated: boolean;
}

const SideDrawer = (props:Props)=>{
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.isOpen){
        attachedClasses = [classes.SideDrawer, classes.Open]
    }
    return (
        <Fragment>
            <Backdrop show={props.isOpen} clicked={props.closed} />
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems 
                        isAuthenticated={props.isAuthenticated}
                        clicked={props.closed} />
                </nav>
            </div>
        </Fragment>
    );
};

export default SideDrawer;