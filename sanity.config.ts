'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { presentationTool } from 'sanity/presentation'
import { schemaTypes } from '@/sanity/schemaTypes'
import { structure } from '@/sanity/structure'
import { resolve } from '@/sanity/presentation/resolve'

export default defineConfig({
  name: 'katies-krops',
  title: "Katie's Krops",
  projectId: 'hg1dwww9',
  dataset: 'production',
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve,
    }),
    visionTool({ defaultApiVersion: '2026-02-01' }),
  ],
  schema: {
    types: schemaTypes,
  },
})
