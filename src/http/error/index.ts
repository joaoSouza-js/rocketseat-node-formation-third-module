import { BadRequestError } from "@/application/error/bad-request";
import { EmailAlreadyUsedError } from "@/application/error/email-not-founded.error";
import { UserCredentialsError } from "@/application/error/user-credentials-error";
import { env } from "@/env";
import type { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

export function errorHandler(error: unknown, _: FastifyRequest, reply: FastifyReply) {

    const isZodError = error instanceof ZodError
    const isBadRequestError = error instanceof BadRequestError
    const isEmailAlreadyUsed = error instanceof EmailAlreadyUsedError
    const isUserCredentialsError = error instanceof UserCredentialsError

    if (env.NODE_ENV !== "prod") {
        console.error(error)
    }

    if (isZodError) {
        return reply.status(400).send({
            errors: error.issues.map(issue => ({
                path: issue.path.join("."),
                message: issue.message,
                code: issue.code,
            }))[0]
        })
    }
    if (isBadRequestError) {
        return reply.status(400).send({ errors: { message: error.message } })
    }
    if (isEmailAlreadyUsed) {
        return reply.status(409).send({ errors: { message: error.message } })
    }

    if (isEmailAlreadyUsed) {
        return reply.status(409).send({ errors: { message: error.message } })
    }

    if (isUserCredentialsError) {
        return reply.status(409).send({ errors: { message: error.message } })
    }





    return reply.status(500).send({ errors: { message: "Internal server error" } })


}