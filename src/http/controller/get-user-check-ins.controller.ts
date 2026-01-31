import { makeGetUserCheckInAmountUseCase } from "@/application/use-cases/factories/check-in/make-get-user-check-in-amount";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function getUserCheckInsController(request: FastifyRequest, reply: FastifyReply) {
    const getUserCheckInAmountUseCase = makeGetUserCheckInAmountUseCase()
    const response = await getUserCheckInAmountUseCase.execute({ userId: request.user.id })
    reply.status(200).send(response)
}