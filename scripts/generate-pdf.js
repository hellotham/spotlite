import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import { mdToPdf } from 'md-to-pdf'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const pagesDir = path.join(rootDir, 'src/content/page')
const workDir = path.join(rootDir, 'src/content/work')
const educationDir = path.join(rootDir, 'src/content/education')
const indexFile = path.join(rootDir, 'src/pages/index.md')
const configFile = path.join(rootDir, 'src/config.json')
const outputPath = path.join(rootDir, 'public/cv.pdf')
const stylesheetPath = path.join(rootDir, 'scripts/pdf-theme.css')

async function generatePdf() {
  console.log('Starting PDF generation...')

  // 1. Read config
  const config = JSON.parse(fs.readFileSync(configFile, 'utf8'))
  const authorName = config.name || 'Chris Tham'

  // 2. Read index.md (home page)
  const indexContent = fs.readFileSync(indexFile, 'utf8')
  const { data: indexData, content: indexBody } = matter(indexContent)
  const homePage = {
    id: 'home',
    order: 0,
    title: indexData.title || authorName,
    description: indexData.description,
    body: indexBody
  }

  // 3. Read all markdown files in src/content/page/
  const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.md'))
  console.log(`Found ${files.length} pages in collection.`)

  // 4. Parse collections helper
  const getCollectionData = (dir) => {
    if (!fs.existsSync(dir)) return []
    return fs.readdirSync(dir)
      .filter(f => f.endsWith('.md'))
      .map(file => {
        const content = fs.readFileSync(path.join(dir, file), 'utf8')
        return matter(content)
      })
  }

  const workItems = getCollectionData(workDir).sort((a, b) => {
    const endA = a.data.endyear ?? 9999
    const endB = b.data.endyear ?? 9999
    if (endB !== endA) return endB - endA
    return b.data.startyear - a.data.startyear
  })

  const educationItems = getCollectionData(educationDir).sort((a, b) => {
    const endA = a.data.endyear ?? 9999
    const endB = b.data.endyear ?? 9999
    if (endB !== endA) return endB - endA
    return b.data.startyear - a.data.startyear
  })

  // 5. Parse and sort pages by 'order'
  const pages = files.map(file => {
    const filePath = path.join(pagesDir, file)
    const content = fs.readFileSync(filePath, 'utf8')
    let { data, content: body } = matter(content)
    
    const pageId = file.replace('.md', '')
    
    // Inject collection data if it's the work or education page
    if (pageId === 'work' && workItems.length > 0) {
      const workMd = workItems.map(item => {
        const dateStr = `${item.data.startyear} — ${item.data.endyear || 'Present'}`
        const typeStr = item.data.type === 'consulting' ? ' (Consulting)' : ''
        return `### ${item.data.role}${typeStr}\n**${item.data.company}** | *${dateStr}*\n\n${item.content}`
      }).join('\n\n')
      body = body + '\n\n' + workMd
    } else if (pageId === 'education' && educationItems.length > 0) {
      const eduMd = educationItems.map(item => {
        const dateStr = `${item.data.startyear} — ${item.data.endyear || 'Present'}`
        return `### ${item.data.degree}\n**${item.data.institution}** | *${dateStr}*\n\n${item.content}`
      }).join('\n\n')
      body = body + '\n\n' + eduMd
    }

    return {
      id: pageId,
      order: data.order || 999,
      title: data.title,
      description: data.description,
      body
    }
  }).sort((a, b) => a.order - b.order)

  // 6. Insert home page at the beginning
  const allPages = [homePage, ...pages]

  // 6. Concatenate body content
  // We add title, description and no forced page breaks
  const combinedMarkdown = allPages.map(page => {
    let header = `# ${page.title}\n\n`
    if (page.description) {
      header += `*${page.description}*\n\n`
    }
    return `<!-- page: ${page.id} -->\n\n${header}${page.body}`
  }).join('\n\n')

  // 7. Generate PDF
  console.log('Converting Markdown to PDF...')
  try {
    await mdToPdf(
      { content: combinedMarkdown },
      {
        dest: outputPath,
        stylesheet: stylesheetPath,
        pdf_options: {
          format: 'A4',
          margin: 0,
          preferCSSPageSize: true,
          displayHeaderFooter: true,
          headerTemplate: `
            <div style="font-size: 10px; width: 100%; text-align: center; font-family: 'Noto Sans', sans-serif;">
              ${authorName}
            </div>
          `,
          footerTemplate: `
            <div style="font-size: 10px; width: 100%; text-align: center; font-family: 'Noto Sans', sans-serif;">
              <span class="pageNumber"></span>
            </div>
          `,
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
