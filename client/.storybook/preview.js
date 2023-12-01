/** @type { import('@storybook/react').Preview } */

import { themes } from '@storybook/theming'
import '../src/tailwindStorybook.css'

const preview = {
  parameters: {
    docs: {
      toc: true, // 👈 Enables the table of contents
      theme: themes.dark, // 👈 The replacement theme to use
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
