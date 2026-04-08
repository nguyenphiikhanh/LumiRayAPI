import { Elysia } from "elysia";
import { config } from "dotenv";
import { inpaintRoutes } from "./routes/inpaint";
import { webhookRoutes } from "./routes/webhook";

config();

const APP_PORT = process.env.APP_PORT || 5000

const app = new Elysia()
  .use(inpaintRoutes)
  .use(webhookRoutes)
  .get("/", () => "LumiRay AI Running");

app.listen(APP_PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
