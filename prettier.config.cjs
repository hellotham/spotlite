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
  // Markdown paragraphs are written as one long line and soft-wrapped by the editor,
  // rather than hard-wrapped at printWidth. Prose is not code: a hard wrap is invisible
  // in the rendered page but very visible in a diff, where changing one word reflows
  // the whole paragraph and buries the edit in a block of moved text. With `never`,
  // prettier also maintains this, where `preserve` left every file however it was typed.
  proseWrap: 'never',
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
