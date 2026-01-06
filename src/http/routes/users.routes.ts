import type { FastifyInstance } from "fastify";
import { authenticationController } from "../controller/users/authentication.controller";
import { registerUserController } from "../controller/users/register-user-controller";

export function userRoutes(app: FastifyInstance) {
    app.post("/", registerUserController)
    app.post("/sessions", authenticationController)
}