import { Extra } from "../types/extra.type";

const IS_TEST_MODE = process.env.NOVITA_TEST_MODE === "true";
const APP_URL = process.env.APP_URL;

enum RES_IMG_TYPE {
    PNG = 'png',
    JPEG = 'jpeg',
    WEBP = 'webp',
}

export enum TASK_STATUS {
    SUCCEED = 'TASK_STATUS_SUCCEED', // do not change string
    FAILED = 'TASK_STATUS_FAILED' // do not change string
}

export const get_inpaint_extra = () => {
    const inpaint_extra: Extra = {
        response_image_type: RES_IMG_TYPE.PNG,
        webhook: {
            url: `${APP_URL}/webhook/novita`,
        },
        enable_nsfw_detection: false
    }

    if (IS_TEST_MODE) {
        inpaint_extra.webhook.test_mode = {
            enabled: true,
            return_task_status: TASK_STATUS.SUCCEED // or TASK_STATUS.FAILED
        }
    }

    return inpaint_extra;
}