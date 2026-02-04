import { FastifyInstance } from "fastify";
import { checkInController } from "../controller/check-in.controller";
import { fetchUserCheckInHistoryController } from "../controller/fetch-user-check-in-history.controller";
import { getUserCheckInsController } from "../controller/get-user-check-ins.controller";

export function protectedRoutes(app: FastifyInstance) {
    app.addHook('onRequest', (request, _) => request.jwtVerify());
    app.post("/check-in", checkInController)
    app.get("/check-in/amount", getUserCheckInsController)
    app.get("/check-in/history", fetchUserCheckInHistoryController)
}