import { Brand } from "../../../../utility/brand";
import z from "zod";

export type PostImageUrl = Brand<string, "postImage">;

export const isPostImageUrl = (value: string): value is PostImageUrl =>
    value.includes(".png") || value.includes(".jpg") || value.includes(".jpeg")
    
const bodyErrorMessage = "image file is not valid"

export const zodPostImageUrl = z.coerce.string().refine(isPostImageUrl, {
    message: bodyErrorMessage
});
