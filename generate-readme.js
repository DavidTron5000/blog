const fs = require('fs')
const path = require('path')
const url = require('url')
const matter = require('gray-matter')
const slugify = require('slugify')
const markdownMagic = require('markdown-magic')
const globby = require('markdown-magic').globby

const replacePattern = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-/g

// Make live netlify URL https://www.netlify.com/blog/2018/05/22/netlify-now-shows-your-deploy-status-on-its-favicon/
function generateLiveUrl(postPath, data) {
  let date = 'xx-xx-xxxx'
  const dateMatch = postPath.match(/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/g)
  if (dateMatch) {
    date = dateMatch[0].replace(/\-/g, '/')
  }

  const slugifiedTitle = slugify(data.title)

  const formattedPath = postPath.replace('posts/', '').replace('.md', '')
  const formattedPathNoDate = formattedPath.replace(replacePattern, '')
  return `https://www.netlify.com/blog/${date}/${slugifiedTitle}`
}

const config = {
  transforms: {
    /*
    In README.md the below comment block adds the list to the readme
    <!-- AUTO-GENERATED-CONTENT:START (LIST_ALL_POSTS)-->
      All posts will be listed here
    <!-- AUTO-GENERATED-CONTENT:END -->
     */
    LIST_ALL_POSTS() {
      const posts = globby.sync(['**/posts/**.md'])
      // Make table header
      let md = '| Post | Author  |\n'
      md += '|:--------------------------- |:-----|\n'
      posts.reverse().forEach((file) => {
        const str = fs.readFileSync(file, 'utf8')
        const frontMatter = matter(str)
        const data = frontMatter.data
        const url = generateLiveUrl(file, data)

        const author = data.author || 'Netlify'
        // add table rows
        md += `| [${data.title}](${url}) | ${author} |\n`
      })

      return md
    }
  },
}


const markdownPath = path.join(__dirname, 'README.md')
markdownMagic(markdownPath, config, () => {
  console.log('Readme updated!')
})