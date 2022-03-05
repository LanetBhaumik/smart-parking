import React from 'react'
import { Route, Routes } from 'react-router'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

const App = () => {
  return (<>
    <ResponsiveAppBar/>
    <Routes>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
    </Routes>
  </>
  )
}

export default App