import fs from 'node:fs'
import ts from 'typescript'

const readText = (filePath: string) => fs.readFileSync(filePath, 'utf8')

const extractScript = (source: string) => {
  const match = source.match(/<script>([\s\S]*?)<\/script>/)
  if (!match) {
    throw new Error('No inline <script> block found in Astro component')
  }
  return match[1]
}

export const runAstroInlineScript = (filePath: string, win: Window) => {
  const source = readText(filePath)
  const script = extractScript(source)

  const transpiled = ts.transpileModule(script, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ES2022
    }
  }).outputText

  const run = new Function(transpiled)
  run.call(win)
}
