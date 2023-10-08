import {BookmarkEntity} from "./entity/bookmark.entity";
import {DataSource, Repository} from "typeorm";
import {BookmarkedPost} from "./model/bookmarkedPost";
import {UserId} from "../user/types/userIdType";
import {PostId} from "../post/model/post-id";
import {PostEntity} from "../post/entity/post.entity";
import {UserEntity} from "../user/entity/user.entity";


export interface IBookmarkRepository {
    bookmarkPost(postId: PostId, userId: UserId): Promise<boolean>

    unBookmarkPost(postId: PostId, userId: UserId): Promise<boolean>

    getAllBookmarkedPost(userId: UserId): Promise<BookmarkedPost[]>
}

export class BookmarkRepository implements IBookmarkRepository {
    private bookmarkRep: Repository<BookmarkEntity>;

    constructor(private AppDataSource: DataSource) {
        this.bookmarkRep = AppDataSource.getRepository(BookmarkEntity)
    }

    async bookmarkPost(postId: PostId, userId: UserId): Promise<boolean> {
        return await this.AppDataSource.manager.transaction(async (manager) => {
            const bookmarkRepo = manager.getRepository(BookmarkEntity);
            const postRepo = manager.getRepository(PostEntity);
            await bookmarkRepo.save({
                post_id: postId,
                user_id: userId,
            });

            await postRepo.update(
                {id: postId},
                {bookmarkCount: () => "bookmarkCount + 1"}
            );
            return true
        })
    }

    async unBookmarkPost(postId: PostId, userId: UserId): Promise<boolean> {
        return await this.AppDataSource.manager.transaction(async (manager) => {
            const bookmarkRepo = manager.getRepository(BookmarkEntity);
            const postRepo = manager.getRepository(PostEntity);
            await bookmarkRepo.delete({
                post_id: postId,
                user_id: userId,
            });

            await postRepo.update(
                {id: postId},
                {bookmarkCount: () => "bookmarkCount - 1"}
            );
            return true
        })
    }
 async isPostBookmarked(postId: PostId, userId: UserId): Promise<boolean> {
        const result = await this.bookmarkRep.findOne({where: {post_id: postId, user_id: userId}})
        return !!result
 }
    async getAllBookmarkedPost(userId: UserId): Promise<BookmarkedPost[]> {
        const bookmarkedPosts = await this.bookmarkRep.find({where: {user_id: userId}});
        const postRepo = this.AppDataSource.manager.getRepository(PostEntity);

        const posts: (BookmarkedPost | null)[] = await Promise.all(
            bookmarkedPosts.map(async (bookmark) => {
                const post = await postRepo.findOne({ where: { id: bookmark.post_id } ,
                    relations: {
                        tags: true,
                        images: true,
                    },});
                if (post) {
                    const bookmarkedPost: BookmarkedPost = {
                        id: post.id,
                        body: post.body,
                        userId: post.userId,
                        images: post.images,
                        tags: post.tags,
                    };
                    return bookmarkedPost;
                }
                return null;
            })
        );

        return posts.filter(
            (post): post is BookmarkedPost => post !== null
        );


    }
    async getBookmarkedPostCount(postId:PostId): Promise<number> {
        return await this.bookmarkRep.count({where: {post_id: postId}})
    }
}