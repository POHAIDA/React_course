import React, { useContext } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
// import Error from '../pages/Error';
// import {routes} from '../router/routes'
import {publicRoutes, privateRoutes} from '../router/routes'
import Login from '../pages/Login';
import Posts from '../pages/Posts';
import { AuthContext } from '../context';
import Loader from './UI/Loader/Loader';





const AppRouter = () => {
  const {isAuth,isLoading} = useContext(AuthContext)
  console.log(isAuth)

  if(isLoading) {
    return <Loader/>
  }

  return (
    isAuth
          ?
          <Routes>
        {privateRoutes.map(route =>
          <Route
            key={route.path}
            element={route.element}
            path={route.path}
            end={route.end}
          />
          )}
          <Route path = "/posts" element={<Posts/>}/>
          <Route path = "*" element={<Navigate to='/posts' replace/>}/>
       
      </Routes>
          :
          <Routes>
          {publicRoutes.map(route =>
           <Route
             key={route.path}
             element={route.element}
             path={route.path}
             end={route.end}
           />
           )}
            <Route path = "/login" element={<Login/>}/>
            <Route path = "*" element={<Navigate to='/login' replace/>}/>
       </Routes>

       
    
     

  )
}

export default AppRouter