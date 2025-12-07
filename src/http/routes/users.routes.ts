import type { FastifyInstance } from "fastify";
import { registerUserController } from "../controller/users/register-user-controller";

export function userRoutes(app: FastifyInstance) {
    app.post("/", registerUserController)
}