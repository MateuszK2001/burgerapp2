import React, {Fragment} from 'react';
import classes from'./DrawerToggle.module.css';

interface Props{
    clicked: ()=>void;
}

const DrawerToggle = (props:Props)=>(
    <div onClick={props.clicked} className={classes.DrawerToggle}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default DrawerToggle;