export interface IInpaintingRequest {
    model_name: string,
    image_base64: string,
    mask_image_base64: string,
    prompt: string, // Range [1, 1024]
    image_num: number, // Range [1 -> 8]
    steps: number, // Range [1, 100]
    guidance_scale: number, //Range [1, 30]
    sampler_name: string,
    mask_blur?: number, //Range [0, 64]
    negative_prompt?: string // Range [1, 1024]
    sd_vae?: string,
    seed?: number,
    loras?: LoRA[],
    embeddings?: Embedding[],
    clip_skip?: number // Range [1, 12]
    strength?: number | null // float
    inpainting_full_res?: number
    inpainting_full_res_padding?: number
    inpainting_mask_invert?: number
    initial_noise_multiplier?: number
}

type LoRA = {
    model_name: string,
    strength: number
}

type Embedding = {
    model_name: string
}