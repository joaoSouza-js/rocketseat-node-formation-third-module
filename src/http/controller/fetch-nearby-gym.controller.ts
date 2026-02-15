import { makeFetchNearbyGymUseCase } from "@/application/use-cases/factories/make-fetch-nearby-gym-use-case"
import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

const fetchNearbyGymQueryParams = z.object({
    limit: z.coerce.number().optional().default(20),
    page: z.coerce.number().optional().default(1),
    lat: z.coerce.number(),
    lng: z.coerce.number()
})


export async function fetchNearbyGymController(request: FastifyRequest, reply: FastifyReply) {
    const { limit, page, lat, lng } = fetchNearbyGymQueryParams.parse(request.query)
    const fetchNearbyGymUseCase = makeFetchNearbyGymUseCase()
    const response = await fetchNearbyGymUseCase.execute({
        limit: limit,
        page: page,
        coordinate: { latitude: lat, longitude: lng },
        userId: request.id
    })
    reply.send(response)
}