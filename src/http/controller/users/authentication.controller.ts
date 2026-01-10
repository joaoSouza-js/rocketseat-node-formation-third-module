import { makeAuthenticationUseCase } from "@/application/use-cases/factories/user/make-authentication-use-case"
import type { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

const authenticationSchema = z.object({
    email: z.email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters" })
})


export async function authenticationController(request: FastifyRequest, reply: FastifyReply) {

    const user = authenticationSchema.parse(request.body)
    const authenticationUseCase = makeAuthenticationUseCase()
    const response = await authenticationUseCase.execute(user)

    const oneWeek = 30 * 60 * 24 * 7
    const token = await reply.jwtSign({
        id: response.user.id,

    }, { expiresIn: oneWeek })

    reply.status(200).send({
        user: {
            id: response.user.id,
            name: response.user.name,
            email: response.user.email
        },
        token: token
    })
}