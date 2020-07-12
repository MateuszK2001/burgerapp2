import React from 'react';

const PropWrapper = (WrappedComponent:React.ElementType, givenProps:{[x: string]: any}) => {
    const hocComponent = ({ ...props }) => <WrappedComponent  {...props} {...givenProps} />
    return hocComponent
}

export default PropWrapper;