import React, { Fragment, useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import { AxiosInstance } from 'axios';



const withErrorHandler = (WrappedComponent: React.ElementType, axios: AxiosInstance) => {
    let isErrorUpdate: (newVal: boolean) => void;
    const reqInterceptor = axios.interceptors.request.use((req) => {
        isErrorUpdate(false);
        return req;
    });
    const resInterceptor = axios.interceptors.response.use(res => res, error => {
        isErrorUpdate(true);
    });
    
    return (props: any) => {
        const tmp = useState(false);
        const isError = tmp[0];
        isErrorUpdate = (newVal: boolean) => { tmp[1](newVal) };


        useEffect(() => {
            return () => {
                if (reqInterceptor)
                    axios.interceptors.request.eject(reqInterceptor);
                if (resInterceptor)
                    axios.interceptors.request.eject(resInterceptor);
            }
        }, []);


        return (
            <Fragment>
                <Modal show={isError} modalClosed={() => {isErrorUpdate(false)}}>
                    Something didn't work
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );
    };
};

export default withErrorHandler;