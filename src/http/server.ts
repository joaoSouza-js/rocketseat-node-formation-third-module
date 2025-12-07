
import { env } from "@/env";
import { app } from "@/http/app";
import { appRoutes } from "./routes/index.routes";

app.register(appRoutes, { prefix: "/api" })

app.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
    console.log("Server is running on http://localhost:3333");
});