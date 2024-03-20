import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { adminRoutes, routes,UserRoutes } from '../utils/routes';
import Auth from './Auth/Auth';
import SetPassword from './Auth/SetPassword';
import Layout from './Layout';

const RouteConfig = () => {
  const currentUser = useSelector(state => state.userReducer?.currentUser)
  const routesData = useMemo(() => currentUser?.role === 'Admin' ?  adminRoutes : currentUser?.role === 'SuperAdmin'?routes:UserRoutes, [currentUser]);

  return (
    <Routes>
      <Route exact path="/" element={<Navigate to="/login" replace={true}/>} />
      <Route key='/login' path='/login' element={<Auth />}></Route>
      <Route key='/register' path='/register/:token' element={<SetPassword />}></Route>
      <Route key='/token' path='/:userid/:token' element={<Layout />}></Route>
      {
        routesData.map((route) =>
          <Route key={route.pathname} path={route.pathname} element={<Layout>{route.component}</Layout>} />
        )
      }
      <Route key='/*' path='/*' element={<Layout />}></Route>
    </Routes>
  )
}

export default RouteConfig