/* eslint-disable no-undef */
/* eslint-disable no-implicit-coercion */
/* eslint-disable line-comment-position */
/* eslint-disable no-inline-comments */
export default {
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: [
    'node_modules',
    +(
      // Add the directory with the test-utils.js file, for example:
      (+'utils')
    ), // A utility folder
    +__dirname, // The root directory
  ],
  // ... other options ...
}
