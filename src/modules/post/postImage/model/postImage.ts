import { object, z } from "zod";
import { PostImageId, postImageId } from "./postImage-id";
import { UrlImage, urlImage } from "./urlIlmage";

export type PostImage = {
  id: PostImageId;
  urlImage: UrlImage;
};

export module postImage {
  export const is = (object: object): object is PostImage => {
    return (
      "urlImage" in object &&
      "id" in object &&
      typeof object.urlImage == "string" &&
      typeof object.id == "number" &&
      postImageId.is(object.id) &&
      urlImage.is(object.urlImage)
    );
  };
  export const zod = z
    .object({ id: postImageId.zod, urlImage: urlImage.zod })
    .refine(is);
}
