import React, { useEffect } from 'react';
import { authActions } from '../../../store/actions/authActions';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import classes form './Logout.module.css';

interface Props{
    logout: Function
}

const Logout = (props:Props)=>{
    const {logout} = props;
  useEffect(()=>{
        logout();
  }, [logout])
  return(
    <Redirect to='/'/>
  );
}
const dispatchToProps = (dispatch:any)=>{
    return{
        logout: ()=>dispatch(authActions.logout())
    }
}
export default connect(null, dispatchToProps)(Logout);