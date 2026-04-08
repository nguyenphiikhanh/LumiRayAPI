import { updateTask } from "../store/taskStore";

const BASE_URL = process.env.NOVITA_BASE_URL!;
const API_KEY = process.env.NOVITA_API_KEY!;

export async function createInpaintTask(image: string, mask: string, prompt: string) {
  const res = await fetch(`${BASE_URL}/async/inpainting`, {
    method: "POST",
    headers: {
      Authorization: API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      request: {
        model_name: "sdxl-inpainting",
        image_base64: image,
        mask_image_base64: mask,
        prompt: `cinematic sunlight rays, volumetric lighting, ${prompt}`,
        negative_prompt: "low quality, blurry",
        steps: 30,
        guidance_scale: 7,
        strength: 0.8,
        mask_blur: 8
      }
    })
  });

  const data = await res.json();
  return data.task_id;
}

export async function pollResult(taskId: string, localTaskId: string) {
  try {
    updateTask(localTaskId, { status: "processing" });

    let tries = 0;

    while (tries < 40) {
      const res = await fetch(
        `${BASE_URL}/async/task-result?task_id=${taskId}`,
        {
          headers: { Authorization: API_KEY }
        }
      );

      const data = await res.json();

      if (data.task?.status === "succeeded") {
        const image = data.images?.[0]?.image_base64;

        updateTask(localTaskId, {
          status: "done",
          result: image
        });

        return;
      }

      if (data.task?.status === "failed") {
        updateTask(localTaskId, {
          status: "failed",
          error: "AI failed"
        });
        return;
      }

      await new Promise(r => setTimeout(r, 2000));
      tries++;
    }

    updateTask(localTaskId, {
      status: "failed",
      error: "Timeout"
    });
  } catch (err: any) {
    updateTask(localTaskId, {
      status: "failed",
      error: err.message
    });
  }
}