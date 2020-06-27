import React, {Fragment} from 'react';
import classes from './Layout.module.css';

export interface Props{
    children: React.ReactNode;
}

const layout = (props:Props)=>
    <Fragment>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Fragment>




export default layout;