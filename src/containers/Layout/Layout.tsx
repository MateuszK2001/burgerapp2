import React, { Fragment, useState } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { MergedState } from '../..';
import { connect } from 'react-redux';

export interface Props {
    children: React.ReactNode;
    isAuthenticated: boolean;
}

const Layout = (props: Props) => {
    const [showSideDrawer, showSideDrawerUpdate] = useState(false);
    const sideDrawerClosedHandler = () => {
        showSideDrawerUpdate(false);
    };
    const sideDrawerToggledHandler = () => {
        showSideDrawerUpdate(!showSideDrawer);
    };
    return (
        <Fragment>
            <Toolbar
                isAuthenticated={props.isAuthenticated}
                menuOpened={sideDrawerToggledHandler} />
            <SideDrawer 
                isAuthenticated={props.isAuthenticated}
                isOpen={showSideDrawer} closed={sideDrawerClosedHandler} />
            <div>Toolbar, SideDrawer, Backdrop</div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Fragment>
    );
    
};


const stateToProps = (state: MergedState) => {
    return {
        isAuthenticated: state.auth.token !== null

    }
};



export default connect(stateToProps)(Layout);