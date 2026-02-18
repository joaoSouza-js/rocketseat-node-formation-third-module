import "dotenv/config"
import { execSync } from "node:child_process"
import { randomUUID } from "node:crypto"
import type { Environment } from "vitest/environments"
import { prisma } from "../../src/infra/prisma/index"

export function generateDatabaseUrl(schema: string) {
    const rootDbUrl = process.env.DATABASE_URL

    if (!rootDbUrl) {
        throw new Error("DATABASE_URL is not defined")
    }

    const url = new URL(rootDbUrl)

    url.searchParams.set("schema", schema)

    return url.toString()
}

export default <Environment>{
    name: "prisma",
    viteEnvironment: "ssr",
    async setup() {
        const schema = randomUUID()
        const databseUrl = generateDatabaseUrl(schema)
        process.env.DATABASE_URL = databseUrl
        console.log(`Database url is ${databseUrl}`)

        execSync("npx prisma db push")
        return {
            async teardown() {
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
                await prisma.$disconnect()
            }
        }
    }
}