import { Elysia } from "elysia";
import { updateTask } from "../store/taskStore";

export const webhookRoutes = new Elysia()
    .post("/webhook/novita", async ({ body }) => {
        const data = body as any;
        console.log("Webhook payload:", JSON.stringify(data, null, 2));

        const taskId = data?.metadata?.local_task_id;
        const status = data?.task?.status;

        if (!taskId) return { ok: false };

        switch (status) {
            case "TASK_STATUS_SUCCEED":
                await updateTask(taskId, {
                    status: "done",
                    result: data?.images?.[0]?.image_base64 || null
                });
                break;

            case "TASK_STATUS_FAILED":
                await updateTask(taskId, {
                    status: "failed",
                    error: "Novita failed"
                });
                break;

            default:
                await updateTask(taskId, {
                    status: "processing"
                });
        }

        return { ok: true };
    });