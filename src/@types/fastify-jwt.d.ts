import { UserRole } from "@/repositories/users-repository"
import "@fastify/jwt"

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: { id: string, role: UserRole } // payload type is used for signing and verifying

    }
}