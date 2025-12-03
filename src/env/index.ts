import 'dotenv/config'
import z from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
    DATABASE_URL: z.url(),
    PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
    console.error('❌ Invalid environment variables:', z.treeifyError(_env.error).properties)
    throw new Error('❌ Invalid environment variables.')
}
export const env = _env.data
