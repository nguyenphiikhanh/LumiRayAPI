export interface Extra {
    response_image_type: string,
    webhook: {
        url: string,
        test_mode?: {
            enabled?: boolean 
            return_task_status?: string
        }
    },
    custom_storage?: {
        aws_s3: {
            region: string,
            bucket: string,
            path: string,
            save_to_path_directly: boolean
        }
    },
    enterprise_plan?: { 
        enabled: boolean
     },
    enable_nsfw_detection: boolean, // must false, $0.015/image if true
    nsfw_detection_level?: number,
}