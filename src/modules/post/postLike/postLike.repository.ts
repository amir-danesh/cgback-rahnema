import {PostId} from "../model/post-id";
import {DataSource, Repository} from "typeorm";
import {PostLikeEntity} from "./entity/postLike.entity";
import {UserId} from "../../user/types/userIdType";
import {LikeCount} from "../model/likeCount";
import {PostEntity} from "../entity/post.entity";
import {NotFoundError} from "../../../utility/errors";
import { PostLikeNotificationEntity } from "../../notification/entity/notificationPostLike.entity";

export interface IPostLikeRepository {
    likePost(postId: PostId, userId: UserId): Promise<LikeCount>;

    unlikePost(postId: PostId, userId: UserId): Promise<LikeCount>;
}

export class PostLikeRepository implements IPostLikeRepository {
    private postLikeRepo: Repository<PostLikeEntity>;

    constructor(private AppDataSource: DataSource) {
        this.postLikeRepo = AppDataSource.getRepository(PostLikeEntity)
    }

    async likePost(postId: PostId, userId: UserId): Promise<LikeCount> {
        let likeCount
        await this.AppDataSource.manager.transaction(async (manager) => {
            const postRepo = manager.getRepository(PostEntity)
            const postLikeNotificationRepo = manager.getRepository(PostLikeNotificationEntity);
            const postLikeRepository = manager.getRepository(PostLikeEntity)

            await postLikeRepository.save({post_id: postId, user_id: userId})
            await postRepo.update(
                {id: postId},
                {likeCount: () => "likeCount + 1"}
            )
            let result = await postRepo.findOneBy({id:postId})
            likeCount = result?.likeCount

            await postLikeNotificationRepo.save({
                sourceUserId: result?.userId,
                targetUserId: userId,
                postId: postId
            })
        })
        // return await this.postLikeRepo.count({where: {post_id: postId}}) as LikeCount
        if (!likeCount) throw new NotFoundError("post not found")
        return likeCount as LikeCount
    }

    async unlikePost(postId: PostId, userId: UserId): Promise<LikeCount> {
        let likeCount
        await this.AppDataSource.manager.transaction(async (manager) => {
            const postLikeRepository = manager.getRepository(PostLikeEntity)
            const postRepository = manager.getRepository(PostEntity)
            const postLikeNotificationRepo = manager.getRepository(PostLikeNotificationEntity);

            await postLikeRepository.delete({
                user_id: userId,
                post_id: postId
            })
            await postRepository.update(
                {id: postId},
                {likeCount: () => "likeCount - 1"}
            )
            let result = await postRepository.findOneBy({id:postId})
            likeCount = result?.likeCount

            await postLikeNotificationRepo.delete({
                sourceUserId: result?.userId,
                targetUserId: userId,
                postId: postId
            })
        })
        if (likeCount === null || likeCount === undefined) throw new NotFoundError("post not found")
        return likeCount as LikeCount

    }

    async isUserLikedPost(postId: PostId, userId: UserId) {
        const res =  await this.postLikeRepo.findOne({where: {post_id: postId, user_id: userId}});
        return !!res;
    }
}