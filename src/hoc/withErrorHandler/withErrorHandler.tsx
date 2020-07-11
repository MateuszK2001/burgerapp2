import React, { Fragment, useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import { AxiosInstance } from 'axios';



const withErrorHandler = (WrappedComponent: React.ElementType, axios: AxiosInstance) => {
    let errorUpdate: (newVal: string|null) => void = (newVal)=>{if(newVal != null) console.log("withErrorHandler: " + newVal)};
    const reqInterceptor = axios.interceptors.request.use((req) => {
        errorUpdate(null);
        return req;
    });
    const resInterceptor = axios.interceptors.response.use(res => res, error => {
        errorUpdate(error.message as string); ////// zmianiec !!!!!!!!!!!!!
        console.log(error);
    });
    
    return (props: any) => {
        const tmp = useState(null as string|null);
        const error = tmp[0];
        errorUpdate = (newVal: string|null) => { tmp[1](newVal) };


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
                <Modal show={error != null} modalClosed={() => {errorUpdate(null)}}>
                    Something didn't work <br/>
                    {error}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );
    };
};

export default withErrorHandler;