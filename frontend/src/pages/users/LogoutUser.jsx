import React, { useState } from 'react';
import Spinner from '../../components/Spinner';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import store from '../../store/store.jsx';
import { USER_ID } from '../../store/actions.jsx';
import Layout from '../../components/layout/Layout';

const LogoutUser = () => {
  // Loading state for displaying a spinner while the request is being sent to the backend
  const [loading, setLoading] = useState(false);

  // useNavigate is a hook that allows us to navigate to a different page
  const navigate = useNavigate();

  // handle logout user
  const handleLogoutUser = () => {
    setLoading(true);
    Cookies.remove('jwt');
    store.dispatch({
      type: USER_ID,
      payload: null,
    });
    store.dispatch({
      type: 'USER',
      payload: null,
    });
    store.dispatch({
      type: 'COMPANIES_LIST_SHOW_TYPE',
      payload: 'card',
    });
    setLoading(false);
    navigate('/');
  };

  return (
    <Layout>
      <div className='flex flex-col justify-center h-screen'>
        {loading ? <Spinner /> : ''}
        <div className='md:w-[600px] mx-auto h-[190px] border border-purple-900 bg-violet-950/40 rounded-xl p-4 mt-16'>
          <div className='flex justify-center pt-4'>
            <h3 className='text-2xl'>Are you sure you want to log out?</h3>
          </div>
          <div className='flex justify-center'>
            <button
              className='w-3/4 bg-gradient-to-r from-red-500 to-red-600 hover:bg-purple-700 hover:bg-gradient-to-l rounded-lg p-2 m-8'
              data-test-id='logout-user-button'
              onClick={handleLogoutUser}
            >
              Yes, please!
            </button>
          </div>
        </div>
        <div className='my-32' />
      </div>
    </Layout>
  );
};

export default LogoutUser;
