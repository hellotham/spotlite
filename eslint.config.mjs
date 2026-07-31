import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import astro from 'eslint-plugin-astro'
import markdown from '@eslint/markdown'
import unocss from '@unocss/eslint-config/flat'
import eslintConfigPrettier from 'eslint-config-prettier'

// parsers
const tsParser = tseslint.parser
const astroParser = astro.parser

// Every file type ESLint parses as JavaScript or TypeScript.
const codeFiles = ['**/*.{js,mjs,cjs,jsx,ts,tsx,mts,cts,astro}']

export default defineConfig([
  // Ignore patterns. A config object containing only `ignores` applies globally.
  //
  // `public/` is copied to the output verbatim and holds no source of ours. Anything
  // dropped in there — a vendored HTML bundle, say — would otherwise be parsed as
  // JavaScript and fail the whole run on its first `<`.
  {
    ignores: [
      'dist/**',
      '.astro/**',
      'coverage/**',
      'node_modules/**',
      'public/**',
      '**/*.d.ts',
      '.github/'
    ]
  },

  // Base configs. These must be scoped to code files: markdown is parsed with a
  // non-JS language below, and core rules such as `no-irregular-whitespace` throw
  // when handed a markdown AST.
  {
    files: codeFiles,
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },

  // astro setup with a11y
  {
    files: ['**/*.astro'],
    extends: [astro.configs.recommended, astro.configs['jsx-a11y-strict']],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
        sourceType: 'module',
        ecmaVersion: 'latest'
      }
    },
    rules: {
      'no-undef': 'off', // Disable "not defined" errors for specific Astro types that are globally available (ImageMetadata)
      '@typescript-eslint/no-explicit-any': 'off' // you may want this as it can get annoying
    }
  },

  // Markdown. These rules lint the prose itself (heading structure, image alt text,
  // link targets) — what matters for a content-driven site. Setting
  // `processor: 'markdown/markdown'` instead would lint fenced code blocks but
  // silently disable every rule below, since the processor only ever hands ESLint
  // the extracted code and never the document.
  markdown.configs.recommended,
  {
    files: ['**/*.md'],
    language: 'markdown/gfm',
    languageOptions: {
      // Content collections put YAML frontmatter in every file. Without this it is
      // parsed as markdown body, which produces false positives.
      frontmatter: 'yaml'
    },
    rules: {
      // A GFM alert opens `> [!NOTE]`, which reads as a reference link to a label
      // nothing defines. Allow the five markers rather than dropping the rule, which
      // still wants to catch genuinely broken `[text][ref]` links.
      'markdown/no-missing-label-refs': [
        'error',
        { allowLabels: ['!NOTE', '!TIP', '!IMPORTANT', '!WARNING', '!CAUTION'] }
      ]
    }
  },

  // UnoCSS class ordering only applies to files that can carry class attributes.
  {
    files: ['**/*.{astro,html,js,jsx,ts,tsx}'],
    ...unocss
  },

  // Must stay last: turns off stylistic rules that conflict with Prettier.
  eslintConfigPrettier
])
