import React from 'react'
import { useSelector } from 'react-redux'
import { Route, useNavigate} from 'react-router'

const CustomRoute = ({component: Component, cprivate, crole, ...rest}) => {
    const Navigate = useNavigate();

    const auth = useSelector((state)=> state.auth)
    const isUserLoggedIn = auth.token && auth.token !=="";
    const userCurrentRole = auth.role;

    let redirectTo = undefined;
    if(isUserLoggedIn && rest.path === '/login') redirectTo='/dashboard'
    else if(!isUserLoggedIn && cprivate) redirectTo='/login'
    else if(isUserLoggedIn && cprivate && crole && crole.filter((item)=> item === userCurrentRole).length === 0)  redirectTo= "/unauthorized-access"
  return (
      <Route {...rest}>
          render = {(props)=>{
              return redirectTo?<Navigate to={redirectTo}/>:<Component {...props}/>
          }}
          </Route>
  )
}

export default CustomRoute