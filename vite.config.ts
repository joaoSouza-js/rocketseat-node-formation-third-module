import path from 'node:path'
import { defineConfig } from 'vitest/config'
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    dir: "src",
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          dir: "src/application/use-cases",
        }
      }, {
        extends: true,
        test: {
          name: "e2e",
          dir: "src/http/controller",
          environment: "./prisma/vitest-environment-prisma/prisma-test-environment"
        }
      }
    ]
  }
})
