/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import("prettier").Config} */
module.exports = {
  // i am just using the standard config, change if you need something else
  ...require('prettier-config-standard'),
  useTabs: false,
  singleQuote: true,
  trailingComma: 'none',
  semi: false,
  printWidth: 100,
  // pluginSearchDirs: [__dirname],
  plugins: [require.resolve('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    },
    {
      // Double quotes in CSS, which is the prevailing convention and what the Google
      // CSS style guide specifies. This override originally existed for a harder
      // reason — Paged.js could not parse single-quoted strings inside @page margin
      // boxes, so prettier rewriting them silently broke the CV footer. Paged.js is
      // gone (Chrome paginates and Puppeteer draws the footer), so this is now only
      // a convention, but it stays because the alternative is churn for nothing.
      files: '*.css',
      options: {
        singleQuote: false
      }
    }
  ]
}
