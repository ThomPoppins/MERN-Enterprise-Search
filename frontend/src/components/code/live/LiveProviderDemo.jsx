import React from 'react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'

const LiveProviderDemo = () => (
  <div className='w-[500px]'>
    <LiveProvider code='<strong>Hello World!</strong>'>
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  </div>
)

export default LiveProviderDemo
