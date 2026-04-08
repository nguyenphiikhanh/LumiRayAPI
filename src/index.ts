import { Elysia } from "elysia";
import { config } from "dotenv";
import { inpaintRoutes } from "./routes/inpaint";

config();

const app = new Elysia()
  .use(inpaintRoutes)
  .get("/", () => "LumiRay AI Running");

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
