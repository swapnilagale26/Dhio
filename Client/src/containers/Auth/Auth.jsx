import axios from 'axios';
import React, { useState } from 'react';

import Button from '../../components/Button/Button';
import { LockIcon, MailIcon } from '../../icons';

import './auth.css';

const Auth = () => {
  const [credentials, setCredentials] = useState({username: 'admin@ventura.com', password: 'VenturaAdmin'});
  const [error, setError] = useState();

  const onChangeHandler = (event) => {
    setCredentials({...credentials, [event.target.name]: event.target.value});
  }

  const isFormValid = () => {
    if(credentials.username && credentials.password) return true;
  }

  const onConfirm = async () => {
    await axios.post("/api/auth", credentials, { withCredentials: true })
      .then((response) => {
        const { data } = response;
        const currWindow = window.location;
        localStorage.setItem('token', `Bearer ${data.token}`);
        let locationToRedirect = `${currWindow.protocol}//${currWindow.host}/dashboard`;
        if(data.user.role !== 'SuperAdmin') {
          locationToRedirect = `${currWindow.protocol}//${currWindow.host}/${data.user._id}/Bearer ${data.token}`;
          // if(currWindow.hostname.toLocaleLowerCase().includes(data.redirectUrl.toLocaleLowerCase())) {
          //   window.location.replace(`${currWindow.protocol}//${currWindow.host}/${data.user._id}/token=${data.token}`);
          // } else {
          //   window.location.replace(`${currWindow.protocol}//${data.redirectUrl}.${currWindow.host}/${data.user._id}/token=${data.token}`);
          // }
        }
        window.location.replace(locationToRedirect);
      })
      .catch(error => {
        setError(error?.response?.data?.message || 'Something went wrong!!!')
      });
  }

  return (
    <div className='auth-container'>
      <div className='auth-left-section' >
        <img alt='bg' src='/login_bg1.png'/>
        <div className='content'>
          <img src='/leamo.png' alt='leamo' className='logo'/>
          <img src='/login_bg2.png' alt='bg2' className='bg2'/>
          <div className='slogan'>
            <h2>Slogan</h2>
            <p>We Deliver Excellent Learning Experiences For The Leaders Of Tomorrow.</p>
          </div>
        </div>
      </div>
    
      <div className='auth-right-section'>
        <h2>Login</h2>
        <p>Lorem ipsum dolor sit amet consectetur. Porttitor urna nec id a est. Hac volutpat phasellus massa pellentesque euismod.</p>
        <hr />
        <div className='login-form'>
          <div className='form-field'>
            <label>Email</label>
            <input type='text' name='username' onChange={onChangeHandler} value={credentials.username} placeholder='Enter mail id'/>
            <MailIcon className='mail-icon' />
          </div>
          <div className='form-field'>
            <label>Password</label>
            <input type='password' name='password' onChange={onChangeHandler} value={credentials.password} />
            <LockIcon className='lock-icon' />
          </div>
          <p className='error'>{error}</p>
          <Button variant='primary' label='Login' onClick={onConfirm} disabled={!isFormValid()} />
        </div>
      </div>
    </div>
  )
}

export default Auth