import { makeRegisterUseCase } from "@/application/use-cases/factories/make-register-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


const creteUserSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters" })
})

export async function registerUserController(request: FastifyRequest, reply: FastifyReply) {
    const user = creteUserSchema.parse(request.body)

    const registerUserUseCase = makeRegisterUseCase()
    await registerUserUseCase.execute(user)
    reply.status(201).send()

}