import React from 'react'
import { Route, Routes } from 'react-router'

import Landing from './pages/Landing'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import NotFound from './pages/NotFound'

import ResponsiveAppBar from './components/ResponsiveAppBar'

const App = () => {
  return (<>
    <ResponsiveAppBar/>
    <Routes>
      <Route path='/' element={<Landing/>}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  </>
  )
}

export default App