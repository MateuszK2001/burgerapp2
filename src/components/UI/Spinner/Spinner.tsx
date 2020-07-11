import React from 'react';
import classes from'./Spinner.module.css';

interface Props{

}

const Spinner = (props:Props)=>(
    <div className={classes.Spinner}>
        Loading...
    </div>
);

export default Spinner;