import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import store from '../../store/store.jsx'
import { USER_ID } from '../../store/actions.jsx'
import Layout from '../../components/layout/Layout'
import Loader from '../../components/animated/Loader.jsx'

const LogoutUser = () => {
  // Loading state for displaying a spinner while the request is being sent to the backend
  const [loading, setLoading] = useState(false)

  // useNavigate is a hook that allows us to navigate to a different page
  const navigate = useNavigate()

  // handle logout user
  const handleLogoutUser = () => {
    setLoading(true)
    Cookies.remove('jwt')
    store.dispatch({
      type: USER_ID,
      payload: null,
    })
    store.dispatch({
      type: 'USER',
      payload: null,
    })
    store.dispatch({
      type: 'COMPANIES_LIST_SHOW_TYPE',
      payload: 'card',
    })
    setLoading(false)
    navigate('/')
  }

  return (
    <Layout>
      <div className='flex h-screen flex-col justify-center'>
        {loading ? <Loader /> : ''}
        <div className='bg-violet-950/40 mx-auto mt-16 h-[190px] rounded-xl border border-purple-900 p-4 md:w-[600px]'>
          <div className='flex justify-center pt-4'>
            <h3 className='text-2xl'>Are you sure you want to log out?</h3>
          </div>
          <div className='flex justify-center'>
            <button
              className='m-8 w-3/4 rounded-lg bg-gradient-to-r from-red-500 to-red-600 p-2 hover:bg-purple-700 hover:bg-gradient-to-l'
              data-testid='logout-user-button'
              onClick={handleLogoutUser}
            >
              Yes, please!
            </button>
          </div>
        </div>
        <div className='my-32' />
      </div>
    </Layout>
  )
}

export default LogoutUser
