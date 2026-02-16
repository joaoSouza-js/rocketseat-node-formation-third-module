import { makeRegisterGymUseCase } from '@/application/use-cases/factories/make-register-gym-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'



const registerGymSchema = z.object({
    title: z.string().min(1),
    description: z.string().nullable(),
    phone: z.string(),
    latitude: z.number(),
    longitude: z.number(),
})


export async function registerGymController(
    request: FastifyRequest,
    reply: FastifyReply
) {

    const body = registerGymSchema.parse(request.body)

    const userId = request.user.id

    const registerGymUseCase = makeRegisterGymUseCase()

    const { gym } = await registerGymUseCase.execute({
        userId,
        gym: body
    })

    return reply.status(201).send({
        gym
    })
}
