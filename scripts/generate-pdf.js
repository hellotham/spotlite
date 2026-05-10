import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { mdToPdf } from 'md-to-pdf'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const pagesDir = path.join(rootDir, 'src/content/page')
const outputPath = path.join(rootDir, 'public/cv.pdf')
const stylesheetPath = path.join(rootDir, 'scripts/pdf-theme.css')

async function generatePdf() {
  console.log('Starting PDF generation...')

  // 1. Read all markdown files in src/content/page/
  const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.md'))
  console.log(`Found ${files.length} pages.`)

  // 2. Parse and sort pages by 'order'
  const pages = files.map(file => {
    const filePath = path.join(pagesDir, file)
    const content = fs.readFileSync(filePath, 'utf8')
    const { data, content: body } = matter(content)
    return {
      id: file.replace('.md', ''),
      order: data.order || 999,
      title: data.title,
      body
    }
  }).sort((a, b) => a.order - b.order)

  // 3. Concatenate body content
  // We add title, description and a page break between pages
  const combinedMarkdown = pages.map(page => {
    let header = `# ${page.title}\n\n`
    if (page.description) {
      header += `*${page.description}*\n\n`
    }
    return `<!-- page: ${page.id} -->\n\n${header}${page.body}\n\n<div class="page-break"></div>`
  }).join('\n\n')

  // 4. Generate PDF
  console.log('Converting Markdown to PDF...')
  try {
    await mdToPdf(
      { content: combinedMarkdown },
      {
        dest: outputPath,
        stylesheet: stylesheetPath,
        pdf_options: {
          format: 'A4',
          margin: '20mm',
          printBackground: true
        }
      }
    )
    console.log(`PDF successfully generated at ${outputPath}`)
  } catch (error) {
    console.error('Error generating PDF:', error)
    process.exit(1)
  }
}

generatePdf()
