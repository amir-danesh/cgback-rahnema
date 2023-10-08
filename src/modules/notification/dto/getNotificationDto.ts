import { z } from "zod"
import { ZodUserId } from "../../user/types/userIdType"
import { zodPaginationBy10 } from "../types/pagination.types"

export const getNotificationDto = z.object({
    userId: ZodUserId,
    page: zodPaginationBy10
})

export type GetNotificationDto = z.infer<typeof getNotificationDto>