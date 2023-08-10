const path = require('path')

function defaultIndexTemplate(filePaths) {
  const importEntries = [
    "import React from 'react'",
    ...filePaths.map((filePath) => {
      const basename = path.basename(filePath, path.extname(filePath))
      const importName = /^\d/.test(basename) ? `Svg${basename}` : basename
      return `import Svg${importName} from './${basename}'`
    }),
  ]

  const exportData = filePaths.map((filePath) => {
    const basename = path.basename(filePath, path.extname(filePath))
    const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename
    return `if (props.name === "${exportName}") {
      return <Svg${exportName} {...props} />
    }`
  })

  const exportEntries = `
    export const Icon = (props) => {
      ${exportData.join('\n')}
    }
  `

  const exportPropTypes = `
    export const PropTypes = [${filePaths.map(
      (filePath) => `'${path.basename(filePath, path.extname(filePath))}'`,
    )}]
  `

  return `${importEntries.join('\n')}\n${exportEntries}\n${exportPropTypes}`
}

module.exports = defaultIndexTemplate
