import React from 'react'
import UserSignup from './components/user/signup/UserSignup'
import UserLogin from './components/user/login/UserLogin'
import Home from './components/user/home/Home'
import Update from './components/user/update/Update'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProtecHome from './protect/ProtecHome'
import ProtectEdit from './protect/ProtectEdit'
import AdminLogin from './components/admin/login/adminLogin'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/'
             element={ 
              <ProtectEdit>
             <UserSignup/>
             </ProtectEdit>
             } >
             </Route>

            <Route path='/login' 
            element={
              <ProtectEdit>
                 <UserLogin/>
              </ProtectEdit>
               } >
            </Route>

            <Route path='/home' 
            element={ 
              <ProtecHome>
                <Home/>
              </ProtecHome>
              } >

              </Route>

            <Route path='/update' 
            element={ 
              <ProtecHome>
              <Update/>
              </ProtecHome>
              } >
              </Route>

              <Route path='/admin' 
            element={ 

              <AdminLogin/>

              } >
              </Route>


        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
