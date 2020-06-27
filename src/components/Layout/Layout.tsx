import React from 'react';
import Aux from '../../hoc/Auxx';

export interface Props{
    children: React.ReactNode;
}

const layout = (props:Props)=>
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main>
            {props.children}
        </main>
    </Aux>




export default layout;