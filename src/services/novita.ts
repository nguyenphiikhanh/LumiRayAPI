import { NOVITA_CONFIG } from "../config/novita";
import { SAMPER_NAME } from "../enums/samper_names.enum";
import { get_inpaint_extra } from "../helpers/inpaintHelper";
import { IInpaintingRequest } from "../types/request.type";

const DEFAULT_NEGATIVE_PROMPT = "(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime), text, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck, BadDream, UnrealisticDream"
const MODEL_NAME = 'realisticVisionV40_v40VAE-inpainting_81543.safetensors';
const IMAGE_NUM = 1;
const STEPS = 25;
const SEED = -1;
const GUIDANCE_SCALE = 7.5;
const CLIP_SKIP = -1;
const MASK_BLUR = 1
const INPAITING_FULL_RES = 1
const INPAITING_FULL_RES_PADDING = 32
const INPAITING_MASK_INVERT = 0
const INITIAL_NOISE_MULTIPLIER = 1
const STRENGTH = 0.85

export async function createInpaintTask(base64image: string, base64mask: string, prompt: string) {
  const request: IInpaintingRequest = {
    model_name: MODEL_NAME,
    image_base64: base64image,
    mask_image_base64: base64mask,
    prompt,
    negative_prompt: DEFAULT_NEGATIVE_PROMPT,
    image_num: IMAGE_NUM,
    steps: STEPS,
    guidance_scale: GUIDANCE_SCALE,
    seed: SEED,
    clip_skip: CLIP_SKIP,
    sampler_name: SAMPER_NAME.Euler_a,
    mask_blur: MASK_BLUR,
    inpainting_full_res: INPAITING_FULL_RES,
    inpainting_full_res_padding: INPAITING_FULL_RES_PADDING,
    inpainting_mask_invert: INPAITING_MASK_INVERT,
    initial_noise_multiplier: INITIAL_NOISE_MULTIPLIER,
    strength: STRENGTH,
  }
  const res = await fetch(`${NOVITA_CONFIG.BASE_URL}/async/inpainting`, {
    method: "POST",
    headers: NOVITA_CONFIG.headers,
    body: JSON.stringify({
      extra: get_inpaint_extra(),
      request: {...request},
    })
  });

  const data = await res.json();
  return data.task_id;
}