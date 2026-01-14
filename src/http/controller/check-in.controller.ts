import { makeCheckInUseCase } from "@/application/use-cases/factories/user/make-check-in-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


const checkInSchema = z.object({
    gymId: z.uuid(),
    userId: z.uuid(),
    latitude: z.number(),
    longitude: z.number()
})

export async function checkInController(request: FastifyRequest, reply: FastifyReply) {
    const body = checkInSchema.parse(request.body)
    const checkIn = makeCheckInUseCase()
    await checkIn.execute({
        gymId: body.gymId,
        userId: body.userId,
        latitude: body.latitude,
        longitude: body.longitude
    })
    reply.status(201).send()

}