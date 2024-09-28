import React from 'react'
import UserSignup from './components/user/signup/UserSignup'
import UserLogin from './components/user/login/UserLogin'
import Home from './components/user/home/Home'
import Update from './components/user/update/Update'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProtecHome from './protect/ProtecHome'
import ProtectEdit from './protect/ProtectEdit'
import AdminLogin from './components/admin/login/adminLogin'
import AdminHome from './components/admin/home/AdminHome'
import AdminDash from './components/admin/dashboard/adminDash'
import AdminEdit from './components/admin/edit/AdminEdit'
import AddUser from './components/admin/adduser/AddUser'
import AdiminAuth from './protect/AdiminAuth'
import AdminiLoginAuth from './protect/AdminiLoginAuth'
import PageNot from './protect/notfound/PageNot'

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
              <AdiminAuth>
                  <AdminLogin/>
              </AdiminAuth>
              } >
              </Route>

              <Route path='/adminhome' 
            element={ 
              <AdminiLoginAuth>
              <AdminHome/>
              </AdminiLoginAuth>
              } >
              </Route>

              <Route path='/dashboard' 
            element={ 
              <AdminiLoginAuth>
              <AdminDash/>
              </AdminiLoginAuth>
              } >
              </Route>

              <Route path='/adminedit/:id' 
            element={ 
              <AdminiLoginAuth>
              <AdminEdit/>
              </AdminiLoginAuth>
              } >
              </Route>


              <Route path='/adminadd' 
            element={ 
              <AdminiLoginAuth>
              <AddUser/>
              </AdminiLoginAuth>
              } >
              </Route>


              <Route path='*' 
            element={ 
             
              <PageNot/>
       
              } >
              </Route>
              

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
