import eslintPluginAstro from 'eslint-plugin-astro'
import markdown from "eslint-plugin-markdown"
import unocss from '@unocss/eslint-config/flat'

export default [
  ...eslintPluginAstro.configs['flat/recommended'],
  // ...eslintPluginAstro.configs['flat/jsx-a11y-recommended'],
  ...markdown.configs.recommended,
  unocss,
]
