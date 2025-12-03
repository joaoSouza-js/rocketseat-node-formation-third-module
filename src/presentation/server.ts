
import { env } from "@/env";
import { app } from "@/presentation/app";

app.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
    console.log("Server is running on http://localhost:3333");
});