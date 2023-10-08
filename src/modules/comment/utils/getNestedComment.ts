import { CommentId } from "../types/commenIdType";
import { CommentText } from "../types/commentTextType";
import { CommentLikeCount } from "../types/commentNumberOfLikesType";
import { CommentEntity } from "../entity/comment.entity";
import { UserId } from "../../user/types/userIdType";
import { Username } from "../../user/types/usernameType";
import { ProfilePicture, isProfilePicture } from "../../user/types/profilePictureType";

export interface commentOwner {
    userId: UserId,
    username: Username,
    displayName: string | Username
    profilePicture: string | null
}

export interface CommentWitoutFullParent {
    id: CommentId;
    text: CommentText;
    likeCount: CommentLikeCount;
    timestamp: Date;
    parent: null | CommentId;
    createdBy: commentOwner;
}

export interface CommentWithChildren {
    id: CommentId;
    text: CommentText;
    likeCount: CommentLikeCount;
    timestamp: Date;
    children: CommentWitoutChildren[] | null;
    isCommentLiked?: boolean;
}

export interface CommentWitoutChildren {
    id: CommentId;
    text: CommentText;
    likeCount: CommentLikeCount;
    timestamp: Date;
    isCommentLiked?: boolean;
}
  

export const sortCommentsByDate = (comments: CommentEntity[]): CommentEntity[] => {
    return comments.slice().sort((a, b) => {
        const timestampA = new Date(a.timestamp).getTime();
        const timestampB = new Date(b.timestamp).getTime();
        return timestampA - timestampB;
    });
}

export const removeParentAdditives = (comments: CommentEntity[]): CommentWitoutFullParent[] => {
    return comments.map(comment => ({
        ...comment,
        parent: comment.parent ? comment.parent.id : null,
        createdBy: {
            userId: comment.createdBy.id,
            username: comment.createdBy.username,
            displayName: comment.createdBy.firstName || comment.createdBy.lastName ? `${comment.createdBy.firstName} ${comment.createdBy.lastName}` : comment.createdBy.username,
            profilePicture: comment.createdBy.profilePicture
        }
    }));
}

export const updateParentToRoot = (comment: CommentWitoutFullParent, comments: CommentWitoutFullParent[]): CommentWitoutFullParent => {
    if (comment.parent === null) {
        return comment;
    } else {
        const rootParentId = findRootParentId(comment, comments);
        
        comment.parent = rootParentId;
        return comment;
    }
}

export const findRootParentId = (comment: CommentWitoutFullParent, comments: CommentWitoutFullParent[]): CommentId => {
    if (comment.parent === null) {
        return comment.id;
    } else {
        const parent = comments.find(c => c.id === comment.parent);
        if (parent) {
        return findRootParentId(parent, comments);
        }
        return comment.id;
    }
}

export const transformToNestedStructure = (inputArray:CommentWitoutFullParent[]):CommentWithChildren[] => {
    const map = new Map();
    const result = [];

    for (const item of inputArray) {
        if (!map.has(item.id)) {
        map.set(item.id, { ...item, children: [] });
        }

        if (item.parent !== null) {
        if (!map.has(item.parent)) {
            map.set(item.parent, { children: [] });
        }
        map.get(item.parent).children.push(map.get(item.id));
        } else {
        result.push(map.get(item.id));
        }
    }

    for (const item of result) {
        if (item.children.length === 0) {
        delete item.children;
        }
    }

    return result;
}