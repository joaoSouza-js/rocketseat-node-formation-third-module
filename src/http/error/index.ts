import { ApplicationError } from "@/application/error/application-error";
import type { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { ZodValidationError } from "./zod-validation-error";

export function errorHandler(error: unknown, _: FastifyRequest, reply: FastifyReply) {

    if (error instanceof ZodError) {
        error = new ZodValidationError(error)
    }

    if (error instanceof ApplicationError) {
        return reply.status(error.statusCode).send({
            error: {
                message: error.message,
            },
        })
    }

    return reply.status(500).send({
        error: {
            message: "Internal server error",
            code: "INTERNAL_ERROR",
        },
    })

}