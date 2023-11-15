import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ImageCrop from './ImageCrop'

describe('ImageCrop', () => {
  it('renders the dropzone and crop area', () => {
    render(<ImageCrop />)
    expect(
      screen.getByText(/drag &apos;n&apos; drop some files here/i),
    ).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
  })

  it('allows the user to upload an image', async () => {
    render(<ImageCrop />)
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })
    const input = screen.getByLabelText(
      /drag &apos;n&apos; drop some files here/i,
    )
    fireEvent.change(input, { target: { files: [file] } })
    expect(await screen.findByRole('img')).toHaveAttribute(
      'src',
      expect.stringContaining('data:image/png;base64'),
    )
  })

  it('allows the user to crop the image', async () => {
    render(<ImageCrop />)
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })
    const input = screen.getByLabelText(
      /drag &apos;n&apos; drop some files here/i,
    )
    fireEvent.change(input, { target: { files: [file] } })
    const cropArea = screen.getByRole('img')
    userEvent.click(cropArea)
    userEvent.keyboard('{arrowright}{arrowdown}')
    const downloadButton = screen.getByRole('button', {
      name: /download cropped image/i,
    })
    expect(downloadButton).toBeEnabled()
    userEvent.click(downloadButton)
    expect(
      await screen.findByRole('link', { name: /download/i }),
    ).toHaveAttribute('download', expect.stringContaining('.png'))
  })
})
