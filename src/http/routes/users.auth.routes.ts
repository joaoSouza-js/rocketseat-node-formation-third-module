import { FastifyInstance } from "fastify";
import { getUserProfileController } from "../controller/users/get-user-profile.controller";

export function userAuthRoutes(app: FastifyInstance) {
    app.addHook('onRequest', (request, _) => request.jwtVerify());
    app.get("/profile", getUserProfileController)
}