import React from 'react';

export interface Props{
    children?: React.ReactNode;
}

const aux = (props:Props) => <React.Fragment>{props.children}</React.Fragment>;

export default aux; 