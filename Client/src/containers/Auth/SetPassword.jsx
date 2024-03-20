import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { LockIcon, MailIcon } from '../../icons';
import { fetchProfile } from '../../redux/slices/userSlice';

const SetPassword = () => {
  const [credentials, setCredentials] = useState({});
  const [error, setError] = useState();

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.userReducer?.currentUser);

  const onChangeHandler = (event) => {
    setCredentials({...credentials, [event.target.name]: event.target.value});
  }

  const isFormValid = () => {
    if(credentials?.password === credentials?.confirmPassword) return true;
  }

  const onConfirm = async () => {
    await axios.put(`/api/user/${userData?._id}`, { ...userData, password: credentials.password })
      .then((response) => navigate('/login'))
      .catch(error => setError(error));
  }

  useEffect(() => {
    if(params.token && !userData) {
      dispatch(fetchProfile(params.token));
    }
  }, [params, userData])

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
            <input type='text' name='username' onChange={onChangeHandler} value={userData?.email} disabled/>
            <MailIcon className='mail-icon' />
          </div>
          <div className='form-field'>
            <label>Set Password</label>
            <input type='password' name='password' onChange={onChangeHandler} value={credentials.password} />
            <LockIcon className='lock-icon' />
          </div>
          <div className='form-field'>
            <label>Confirm Password</label>
            <input type='password' name='confirmPassword' onChange={onChangeHandler} value={credentials.confirmPassword} />
            <LockIcon className='lock-icon' />
            {credentials.password !== credentials.confirmPassword && <p className='error'>Passwords are not matching!!!</p>}
          </div>
          <p className='error'>{error && error[0]}</p>
          <Button variant='primary' label='Login' onClick={onConfirm} disabled={!isFormValid()} />
        </div>
      </div>
    </div>
  )
}

export default SetPassword