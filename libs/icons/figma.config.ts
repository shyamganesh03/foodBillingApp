import dotenv from 'dotenv'

dotenv.config()

const fileId: string | undefined = process.env.FILE_ID
const figmaToken: string | undefined = process.env.FIGMA_TOKEN
const figmaPageName: string | undefined = process.env.FIGMA_PAGE_NAME

const outputs = [
  require('@figma-export/output-components-as-svg')({ output: './dist' }),
]

interface FigmaComponentsCommand {
  fileId: string | undefined
  onlyFromPages: string | undefined
  outputs: any[] // Replace 'any[]' with the appropriate output type if available
}

interface CustomFigmaExportRC {
  figmaToken?: string
  commands: [string, FigmaComponentsCommand][] // Custom type for the commands property
}

const config: CustomFigmaExportRC = {
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
