import type { FastifyInstance } from "fastify";
import { userRoutes } from "./users.routes";

export function appRoutes(app: FastifyInstance) {
    app.register(userRoutes, { prefix: "/users" })
}