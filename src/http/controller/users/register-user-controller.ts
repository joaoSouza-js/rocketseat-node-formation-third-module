import { registerUser } from "@/application/use-cases/user/register-user";
import { EmailAlreadyUsedError } from "@/domain/error/email-already-used.error";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


const creteUserSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
})

export async function registerUserController(request: FastifyRequest, reply: FastifyReply) {
    const user = creteUserSchema.parse(request.body)

    try {
        await registerUser({
            email: user.email,
            name: user.name,
            password: user.password
        })
        reply.status(201).send()
    } catch (error) {
        const emailExistError = error instanceof EmailAlreadyUsedError

        if (emailExistError) {
            return reply.status(409).send({ message: error.message })
        }

    }

}