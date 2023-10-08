import { z } from "zod";

export const uploadProfileImageDto = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string().refine((value) => {
    return value === "image/jpeg" || value === "image/png" || value === "image/jpg";
  }),
  destination: z.string(),
  filename: z.string(),
  path: z.string(),
  size: z.number().refine((value) => value <= 5 * 1024 * 1024), //5Mb
});
export type UploadProfileImageDto = z.infer<typeof uploadProfileImageDto>;
