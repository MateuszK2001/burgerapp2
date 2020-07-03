import React from 'react';
import burgerLogo from '../../assets/images/28.1 burger-logo.png';
import classes from'./Logo.module.css';


interface Props{

}

const Logo = (props:Props)=>(
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurger"/>
    </div>
);

export default Logo;