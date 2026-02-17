import type { FastifyInstance } from "fastify";
import { authenticationRoutes } from "./authentication.routes";
import { protectedRoutes } from "./protected.routes";

export function appRoutes(app: FastifyInstance) {
    app.register(authenticationRoutes, { prefix: "/auth" })
    app.register(protectedRoutes)
}