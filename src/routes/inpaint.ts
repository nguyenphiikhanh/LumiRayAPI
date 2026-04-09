import { Elysia, t } from "elysia";
import { createTask, getTask } from "../store/taskStore";
import { createInpaintTask } from "../services/novita.service";

export const inpaintRoutes = new Elysia()
  // tạo task
  .post("/inpaint", async ({ body }) => {
    const { base64image, base64mask, prompt } = body;

    const localTaskId = crypto.randomUUID();

    createTask(localTaskId);

    const novitaTaskId = await createInpaintTask(base64image, base64mask, prompt);

    return {
      taskId: localTaskId
    };
  }, {
    body: t.Object({
      base64image: t.String(),
      base64mask: t.String(),
      prompt: t.String()
    })
  })

  // polling
  .get("/task/:id", ({ params }) => {
    const task = getTask(params.id);

    if (!task) {
      return { error: "Task not found" };
    }

    return task;
  });