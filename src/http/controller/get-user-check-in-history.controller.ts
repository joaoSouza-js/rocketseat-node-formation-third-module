import { makeGetUserCheckInHistory } from "@/application/use-cases/factories/check-in/make-get-user-check-in-history";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const getUserCheckInHistoryQueryParams = z.object({
    limit: z.number().optional().default(20),
    page: z.number().optional().default(1)
})

export async function getUserCheckInHistoryController(request: FastifyRequest, reply: FastifyReply) {
    const { limit, page } = getUserCheckInHistoryQueryParams.parse(request.params)
    const getUserCheckInHistory = makeGetUserCheckInHistory()
    const response = await getUserCheckInHistory.execute({
        limit: limit,
        page: page,
        userId: request.id
    })
    reply.send(response)
}