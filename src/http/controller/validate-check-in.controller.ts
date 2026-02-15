import { makeValidateCheckInUseCase } from "@/application/use-cases/factories/check-in/make-validade-check-in"
import { FastifyReply, FastifyRequest } from "fastify"
import z from "zod"

const validadeCheckInParams = z.object({
    checkInId: z.string()
})

export async function validateCheckInController(request: FastifyRequest, reply: FastifyReply) {
    const { checkInId } = validadeCheckInParams.parse(request.params)
    const validateCheckInUseCase = makeValidateCheckInUseCase()
    await validateCheckInUseCase.execute({ checkInId: checkInId, userId: request.user.id })
    reply.status(204).send()
}