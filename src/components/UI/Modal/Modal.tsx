import React, { Fragment } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

interface Props {
    children?: React.ReactNode
    show: boolean;
    modalClosed: ()=>void;
}
function equal(prev:Props, next:Props){
    return prev.show === next.show && prev.children === next.children;
}
const Modal = (props: Props) => (
    <Fragment>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Fragment>
);

export default React.memo(Modal, equal);
