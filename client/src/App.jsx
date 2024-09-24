import React from 'react'
import UserSignup from './components/user/signup/UserSignup'
import UserLogin from './components/user/login/UserLogin'
import Home from './components/user/home/Home'
import Update from './components/user/update/Update'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={ <UserSignup/>} ></Route>
            <Route path='/login' element={ <UserLogin/>} ></Route>
            <Route path='/home' element={ <Home/>} ></Route>
            <Route path='/update' element={ <Update/>} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
