import { RegisterUserUseCase } from "@/application/use-cases/user/register-user";
import { EmailAlreadyUsedError } from "@/domain/error/email-already-used.error";
import { Argon2Hasher } from "@/infra/hash/argon-hasher";
import { inMemoryUserRepositories } from "@/repositories/in-memory-user-repositories";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


const creteUserSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
})
const userRepository = new inMemoryUserRepositories()

export async function registerUserController(request: FastifyRequest, reply: FastifyReply) {
    const user = creteUserSchema.parse(request.body)
    const hasher = new Argon2Hasher()
    try {
        const registerUserUseCase = new RegisterUserUseCase(userRepository, hasher)
        await registerUserUseCase.execute(user)
        reply.status(201).send()
    } catch (error) {
        const emailExistError = error instanceof EmailAlreadyUsedError

        if (emailExistError) {
            return reply.status(409).send({ message: error.message })
        }

    }

}