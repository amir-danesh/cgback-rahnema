import { z } from "zod"
import { ZodWholeNumber } from "../../../data/wholeNumber"

export const collegegramiesDto = z.object({
    page : ZodWholeNumber
})

export type CreateUserDto = z.infer<typeof collegegramiesDto>