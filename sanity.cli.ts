import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'hg1dwww9',
    dataset: 'production',
  },
  studioHost: 'katies-krops',
  typegen: {
    generates: './src/sanity/types.ts',
  },
})
