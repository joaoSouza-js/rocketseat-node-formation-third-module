import { RegisterUserUseCase } from "@/application/use-cases/user/register-user";
import { Argon2Hasher } from "@/infra/hash/argon-hasher";
import { CryptoUUidGenerator } from "@/infra/id-generator/crypto-uuid-generator";
import { inMemoryUserRepositories } from "@/repositories/in-memory/in-memory-user-repositories";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


const creteUserSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters" })
})
const userRepository = new inMemoryUserRepositories()

export async function registerUserController(request: FastifyRequest, reply: FastifyReply) {
    const user = creteUserSchema.parse(request.body)
    const hasher = new Argon2Hasher()
    const idGenerator = new CryptoUUidGenerator()
    const registerUserUseCase = new RegisterUserUseCase(userRepository, hasher, idGenerator)
    await registerUserUseCase.execute(user)
    reply.status(201).send()

}