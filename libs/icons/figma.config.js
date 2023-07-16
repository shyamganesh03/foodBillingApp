import dotenv from 'dotenv'
import { FigmaExportRC } from '@figma-export/types'

dotenv.config()

const fileId = process.env.FILE_ID
const figmaToken = process.env.FIGMA_TOKEN
const figmaPageName = process.env.FIGMA_PAGE_NAME

const outputs = [
  require('@figma-export/output-components-as-svg')({ output: './dist' }),
]

const config: FigmaExportRC = {
  figmaToken,
  commands: [
    [
      'components',
      {
        fileId,
        onlyFromPages: figmaPageName,
        outputs,
      },
    ],
  ],
}

export default config
