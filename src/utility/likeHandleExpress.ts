import {PostLikeDto} from "../modules/post/postLike/dto/postLikeDto";
import {PostService} from "../modules/post/post.service";
import {DataNotFound} from "./errors";

export const likeHandleExpress = async <A>( dto:PostLikeDto,postService:PostService,fn: () => Promise<any>) => {
    if(await postService.isPostExist(dto.postId)){
        return await fn();
    }else{
        throw new DataNotFound("post not found")
    }
}