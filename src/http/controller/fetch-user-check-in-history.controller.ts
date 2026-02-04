import { makeFetchUserCheckInHistory } from "@/application/use-cases/factories/check-in/make-fetch-user-check-in-history";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const fetchUserCheckInHistoryQueryParams = z.object({
    limit: z.number().optional().default(20),
    page: z.number().optional().default(1)
})

export async function fetchUserCheckInHistoryController(request: FastifyRequest, reply: FastifyReply) {
    const { limit, page } = fetchUserCheckInHistoryQueryParams.parse(request.params)
    const fetchUserCheckInHistory = makeFetchUserCheckInHistory()
    const response = await fetchUserCheckInHistory.execute({
        limit: limit,
        page: page,
        userId: request.id
    })
    reply.send(response)
}