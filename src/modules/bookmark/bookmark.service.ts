import {BookmarkDto} from "./dto/bookmarkDto";
import {HttpResponseType} from "../../routes/utils/HTTPResponse";
import {UserId} from "../user/types/userIdType";
import {BookmarkRepository} from "./bookmark.repository";
import {PostService} from "../post/post.service";
import {BadRequestError, DataNotFound} from "../../utility/errors";
import {PostId} from "../post/model/post-id";


export interface IBookmarkService {
    bookmarkPost(dto: BookmarkDto): Promise<HttpResponseType>
    unBookmarkPost(dto: BookmarkDto): Promise<HttpResponseType>
    getAllBookmarks(userId: UserId): Promise<HttpResponseType>
}

export class BookmarkService implements IBookmarkService {
    constructor(private bookmarkRepository: BookmarkRepository, private postService:PostService) {
    }
    async bookmarkPost(dto: BookmarkDto): Promise<HttpResponseType> {
        await this.checkPostExists(dto.postId)
        if (await this.bookmarkRepository.isPostBookmarked(dto.postId, dto.userId)) {
            throw new BadRequestError("user already bookmarked this post")
        }
        const result = await this.bookmarkRepository.bookmarkPost(dto.postId, dto.userId)
        return this.createResponse("bookmarked successfully", {bookmark: result})
    }

    async unBookmarkPost(dto: BookmarkDto): Promise<HttpResponseType> {
        await this.checkPostExists(dto.postId);
        if (!await this.bookmarkRepository.isPostBookmarked(dto.postId, dto.userId)) {
            throw new BadRequestError("user not bookmarked this post, so can't unBookmark this")
        }
        const result = await this.bookmarkRepository.unBookmarkPost(dto.postId, dto.userId)
        return this.createResponse("unBookmarked successfully", {bookmark: result})

    }
    async getAllBookmarks(userId: UserId): Promise<HttpResponseType> {
        const result =await this.bookmarkRepository.getAllBookmarkedPost(userId)
        return this.createResponse("bookmarks", {bookmarks: result})
    }
    private async checkPostExists(postId: PostId) {
        const postExists = await this.postService.isPostExist(postId);
        if (!postExists) {
            throw new DataNotFound("Post not found");
        }
    }
    private createResponse(message: string, data: any): HttpResponseType {
        return {
            statusCode: 200,
            response: {
                message: message,
                data: data
            }
        };
    }
}