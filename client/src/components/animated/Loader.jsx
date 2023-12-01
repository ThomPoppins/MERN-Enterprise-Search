import React from 'react'

const Loader = () => (
  <div
    className='mt-48 flex h-96 items-center justify-center'
    data-testid='spinner'
  >
    <div className='h-32 w-32 animate-spin rounded-full border-t-8 border-solid border-green-500' />
  </div>
)

export default Loader
