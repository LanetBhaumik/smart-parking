import React from 'react'
import { Route, Routes } from 'react-router'

import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import NotFound from './pages/NotFound'
import UserDashboard from './pages/UserDashboard'
import Parkings from './pages/Parkings'


// import Unauthorized from './pages/Unauthorized'

// import Alert from './components/Alert'
import Header from './components/Navbar/Navbar'
import UserBookings from './pages/UserBookings'
import ParkingBookings from './pages/ParkingBookings'

const App = () => {
  // const [alert, setAlert] = useState(null)

  // const showAlert = (message, type) => {
  //   setAlert({
  //     msg: message,
  //     type: type
  //   })
  //   setTimeout(() => {
  //     setAlert(null);
  //   }, 1500)
  // }
  return (<>

    <Header/>
    {/* <Alert alert={alert}/> */}
    <Routes>
      <Route path='/' element={<SignIn/>}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path='/parkings' element={<Parkings/>}></Route>
      <Route path='/userDashboard' element={<UserDashboard/>}></Route>
      <Route path='/userBookings' element={<UserBookings/>}></Route>
      <Route path='/parkingBookings' element={<ParkingBookings/>}></Route>
       <Route path="*" element={<NotFound />}></Route>
    </Routes>
  </>
  )
}

export default App