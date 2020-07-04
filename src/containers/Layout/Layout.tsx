import React, {Fragment, useState} from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

export interface Props{
    children: React.ReactNode;
}

const Layout = (props:Props)=>{
    const [showSideDrawer, showSideDrawerUpdate] = useState(false);
    const sideDrawerClosedHandler = ()=>{
        showSideDrawerUpdate(false);
    };
    const sideDrawerToggledHandler = ()=>{
        showSideDrawerUpdate(!showSideDrawer);
    };
    return(
        <Fragment>
            <Toolbar menuOpened={sideDrawerToggledHandler}/>
            <SideDrawer isOpen={showSideDrawer} closed={sideDrawerClosedHandler} />
            <div>Toolbar, SideDrawer, Backdrop</div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Fragment>
    );
};




export default Layout;