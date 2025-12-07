import { Argon2Hasher } from "@/infra/hash/argon-hasher";
import { prisma } from "@/infra/prisma";
import type { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";


const creteUserSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string(),
})

export async function registerUserController(request: FastifyRequest, reply: FastifyReply) {
    const user = creteUserSchema.parse(request.body)
    const userExist = await prisma.user.findUnique({
        where: {
            email: user.email
        }
    })

    if (userExist) {
        return reply.status(409).send({
            message: "User already exists"
        })
    }

    const hashedPassword = await Argon2Hasher().hash(user.password)

    await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password_hash: hashedPassword
        }
    })

    reply.status(201).send()
}