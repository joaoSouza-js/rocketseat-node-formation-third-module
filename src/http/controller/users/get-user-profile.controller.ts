import { makeGetUserProfileUseCase } from "@/application/use-cases/factories/user/make-get-user-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getUserProfileController(request: FastifyRequest, reply: FastifyReply) {
    const getProfileUseCase = makeGetUserProfileUseCase()
    const response = await getProfileUseCase.execute({ id: request.user.id })
    reply.send(response)
}