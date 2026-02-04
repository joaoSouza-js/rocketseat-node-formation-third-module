import { makeFetchGymUseCase } from "@/application/use-cases/factories/make-fetch-gym-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

const fetchGymQueryParams = z.object({
    limit: z.number().optional().default(20),
    page: z.number().optional().default(1)
})
const fetchGymParams = z.object({
    query: z.uuid()
})

export async function fetchGymController(request: FastifyRequest, reply: FastifyReply) {
    const { limit, page } = fetchGymQueryParams.parse(request.query)
    const { query } = fetchGymParams.parse(request.params)
    const fetchGymUseCase = makeFetchGymUseCase()
    const response = fetchGymUseCase.execute({
        limit: limit,
        page: page,
        query: query,
        userid: request.id
    })
    reply.send(response)

}