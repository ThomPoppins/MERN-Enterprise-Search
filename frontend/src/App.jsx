import Cookies from 'js-cookie'
import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import CompaniesList from './pages/companies/CompaniesList'
import EditCompany from './pages/companies/EditCompany'
import RegisterCompany from './pages/companies/RegisterCompany'
import ShowCompany from './pages/companies/ShowCompany'
import ImageCrop from './pages/dev/ImageCrop'
import ReactLive from './pages/dev/ReactLive'
import Results from './pages/find/Results'
import Home from './pages/Home'
import InvitesList from './pages/invites/InvitesList'
import UploadImage from './pages/UploadImage'
import LoginUser from './pages/users/LoginUser'
import LogoutUser from './pages/users/LogoutUser'
import RegisterUser from './pages/users/RegisterUser'
import UserProfile from './pages/users/UserProfile'
import verifyToken from './utils/auth/verifyToken'
import LiveProviderDemo from './components/code/live/LiveProviderDemo'

const App = () => {
  // Get the JWT token from the cookies
  const token = Cookies.get('jwt')
  // Verify the JWT token
  verifyToken(token)

  //
  const userId = useSelector((state) => state.userId)

  // TODO: [MERNSTACK-163] Redirect user from routes other then /, /login and /register if user is not logged in
  if (userId) {
    // Get the pending invites for the user
    return (
      // Routes when the user is logged in
      <Routes>
        {/* / route, render homepage */}
        <Route element={<Home />} path='/' />
        {/* TEST ROUTE: test image uploading */}
        <Route element={<UploadImage />} path='/upload-image' />
        {/* User profile page route, render user profile page */}
        <Route element={<UserProfile />} path='/profile' />
        {/* /logout route, render user logout page */}
        <Route element={<LogoutUser />} path='/logout' />
        {/* /find route, render find page */}
        <Route element={<Results />} path='/find' />
        {/* /companies/* routes */}
        <Route element={<CompaniesList />} path='/companies' />
        <Route element={<RegisterCompany />} path='/companies/register' />
        <Route element={<EditCompany />} path='/companies/edit/:id' />
        <Route element={<ShowCompany />} path='/companies/details/:id' />
        {/* /invites/* routes */}
        <Route element={<InvitesList />} path='/invites' />
        {/* /dev route, render dev pages */}
        <Route element={<ImageCrop />} path='/dev/image-crop' />
        <Route element={<LiveProviderDemo />} path='/dev/react-live' />
      </Routes>
    )
  }

  // If no user is logged in
  return (
    // Routes when no user is logged in
    <Routes>
      {/* / route, render homepage */}
      <Route element={<Home />} path='/' />
      {/* /login route, render user login page */}
      <Route element={<LoginUser />} path='/login' />
      {/* /register route, render user register page */}
      <Route element={<RegisterUser />} path='/register' />
    </Routes>
  )
}

export default App
