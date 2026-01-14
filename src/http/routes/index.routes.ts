import type { FastifyInstance } from "fastify";
import { protectedRoutes } from "./protected.routes";
import { userRoutes } from "./users.routes";

export function appRoutes(app: FastifyInstance) {
    app.register(userRoutes, { prefix: "/users" })
    app.register(protectedRoutes)
}