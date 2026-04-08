import { Elysia } from "elysia";
import { createTask, getTask } from "../store/taskStore";
import { createInpaintTask } from "../services/novita";

export const inpaintRoutes = new Elysia()
  // tạo task
  .post("/inpaint", async ({ body }) => {
    const { image, mask, prompt } = body as any;

    if (!image || !mask) {
      return { error: "Missing image or mask" };
    }

    const localTaskId = crypto.randomUUID();

    createTask(localTaskId);

    const novitaTaskId = await createInpaintTask(image, mask, prompt);

    return {
      taskId: localTaskId
    };
  })

  // polling
  .get("/task/:id", ({ params }) => {
    const task = getTask(params.id);

    if (!task) {
      return { error: "Task not found" };
    }

    return task;
  });