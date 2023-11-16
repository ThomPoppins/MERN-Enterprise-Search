import React from 'react'
import { render } from '@testing-library/react'
import Spinner from './spinner'

describe('Spinner component', () => {
  it('renders without crashing', () => {
    render(<Spinner />)
  })
})
