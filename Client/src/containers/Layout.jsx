import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Header from '../components/Header/Header';
import NavSidebar from '../components/NavSidebar/NavSidebar';

import { fetchProfile } from '../redux/slices/userSlice';
import './layout.css';

const Layout = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.userReducer.currentUser);
  const isLoading = useSelector(state => state.userReducer.isLoading);

  useEffect(() => {
    const token = (params?.token || localStorage.getItem('token'))?.split(' ')[1];
    if(token && !isLoading) {
      localStorage.setItem('token', `Bearer ${token}`);
      dispatch(fetchProfile(token));
      if(params?.token) {
        navigate('/dashboard');
      }
    } else {
      if(window.location.pathname !== 'login' && !isLoading) {
        navigate('/login');
      }
    }
  }, [])

  return (
    <div className='layout'>
      <Header />
      <section>
        <NavSidebar role={currentUser?.role}/>
        <div className='main-container'>
          {props.children}
        </div>
      </section>
    </div>
  )
}

export default Layout