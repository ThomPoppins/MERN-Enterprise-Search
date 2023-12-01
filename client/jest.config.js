/* eslint-disable no-undef */
/* eslint-disable no-implicit-coercion */
/* eslint-disable line-comment-position */
/* eslint-disable no-inline-comments */
export default {
  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: [
    'node_modules',
    +(
      // add the directory with the test-utils.js file, for example:
      (+'utils')
    ), // a utility folder
    +__dirname, // the root directory
  ],
  // ... other options ...
}
