import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CompaniesList from './pages/companies/CompaniesList'
import RegisterCompany from './pages/companies/RegisterCompany'
import EditCompany from './pages/companies/EditCompany'
import ShowCompany from './pages/companies/ShowCompany'
import Results from './pages/find/Results'
import LoginUser from './pages/users/LoginUser'
import RegisterUser from './pages/users/RegisterUser'
import LogoutUser from './pages/users/LogoutUser'
import UserProfile from './pages/users/UserProfile'
import InvitesList from './pages/invites/InvitesList'
import UploadImage from './pages/UploadImage'
import ImageCrop from './pages/dev/ImageCrop.jsx'
import Home from './pages/Home'
import Cookies from 'js-cookie'
import verifyToken from './utils/auth/verifyToken.jsx'
import { useSelector } from 'react-redux'

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
        {/* / route, render homepage*/}
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
      </Routes>
    )
  }

  // If no user is logged in
  return (
    // Routes when no user is logged in
    <Routes>
      {/* / route, render homepage*/}
      <Route element={<Home />} path='/' />
      {/* /login route, render user login page */}
      <Route element={<LoginUser />} path='/login' />
      {/* /register route, render user register page */}
      <Route element={<RegisterUser />} path='/register' />
    </Routes>
  )
}

export default App
