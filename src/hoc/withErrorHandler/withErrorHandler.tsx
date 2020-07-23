import React, { Fragment, useState, useLayoutEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import { AxiosInstance } from 'axios';



const withErrorHandler = (WrappedComponent: React.ElementType, axios: AxiosInstance) => {
    return (props: any) => {
        const [error, setError] = useState(null as string|null);
        
        useLayoutEffect(()=>{
            const reqInterceptor = axios.interceptors.request.use((req) => {
                setError(null);
                return req;
            });
            const resInterceptor = axios.interceptors.response.use(res => res, err => {
                setError(err.message as string); ////// zmianiec !!!!!!!!!!!!!
            });
            return ()=>{
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
        },[]);
        
        
        return (
            <Fragment>
                <Modal show={error !== null} modalClosed={() => {setError(null)}}>
                    Something didn't work <br/>
                    {error}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );
    };
};

export default withErrorHandler;