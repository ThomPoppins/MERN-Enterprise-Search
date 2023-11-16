import React from 'react'
import { render } from '@testing-library/react'
import Loader from './Loader'

describe('Loader component', () => {
  it('renders without crashing', () => {
    render(<Loader />)
  })

  it('renders a spinner element', () => {
    const { getByTestId } = render(<Loader />)
    expect(getByTestId('spinner')).toBeInTheDocument()
  })

  it('has the correct styles', () => {
    const { getByTestId } = render(<Loader />)
    const spinner = getByTestId('spinner')
    expect(spinner).toHaveClass('flex justify-center items-center h-96 mt-48')
  })
})
