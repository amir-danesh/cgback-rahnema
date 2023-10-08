import { BadRequestError } from "../../utility/errors";
import { CommentRepository } from "../comment/comment.repository";
import { CommentId } from "../comment/types/commenIdType";
import { FollowRepository } from "../follow/follow.repository";
import { PostId } from "../post/model/post-id";
import { PostRepository } from "../post/post.repository";
import { UserId } from "../user/types/userIdType";
import { Username } from "../user/types/usernameType";
import { UserRepository } from "../user/user.repository";
import { GetNotificationDto } from "./dto/getNotificationDto";
import { EFollowNotification } from "./entity/notificationUser.entity";
import { CommentNotificationsModel, isCommentNotification } from "./model/CommentNotifications";
import { PostLikeNotificationsModel, isPostLikeNotification } from "./model/PostLikeNotifications";
import { UserRelatedNotificationsModel, isUserRelatedNotification } from "./model/UserRelatedNotifications";
import { CombinedNotifications, NotificationRepository } from "./notification.repository";

export interface IFinedUserRelatedNotificaiton {
  subject: "follow";
  type: EFollowNotification
  userId: UserId;
  username: Username;
  displayName: string | Username;
  profilePicture: string | undefined;
  createdAt: Date;
}

export interface ISourceUser {
  userId: UserId;
  username: Username;
  displayName: string | undefined;
  profilePicture: string | undefined;
}

export interface IFinedUserRelatedNotificaitonFriends extends IFinedUserRelatedNotificaiton {
  sourceUser: ISourceUser;
}

interface IPostDetail {
  id: PostId;
  postImage: string;
}

interface IUserDetail {
  userId: UserId;
  displayName: string | Username;
  username: Username;
}

interface ICommentDetail {
  commentId: CommentId;
}

export interface IFinedPostLikeNotification {
  subject: "post-like";
  postDetails: IPostDetail;
  userDetails: IUserDetail;
  createdAt: Date;
}

export interface IFinedPostLikeNotificationFriends extends IFinedPostLikeNotification {
  sourceUser: ISourceUser;
}

export interface IFinedCommentNotification {
  subject: "comment";
  userDetail: IUserDetail;
  postDetail: IPostDetail;
  commentDetail: ICommentDetail;
  createdAt: Date;
}

export interface IFinedCommentNotificationFriends extends IFinedCommentNotification {
  sourceUser: ISourceUser;
}

export type IFinedCombinedNotification = IFinedUserRelatedNotificaiton | IFinedPostLikeNotification | IFinedCommentNotification | undefined

const getUniqueObjects = (array: (CommentNotificationsModel | UserRelatedNotificationsModel | PostLikeNotificationsModel)[]) => {
  const seen = new Set();
  return array.filter((obj) => {
    const stringified = JSON.stringify(obj);
    if (!seen.has(stringified)) {
      seen.add(stringified);
      return true;
    }
    return false;
  });
}

export class NotificationService {
  constructor(private notificationRepo: NotificationRepository,
              private userRepo: UserRepository,
              private postRepo: PostRepository,
              private commentRepo: CommentRepository,
              private followRepo: FollowRepository) {}

  private async transformRawFollow(notification: UserRelatedNotificationsModel): Promise<IFinedUserRelatedNotificaiton> {
    const targetUser = await this.userRepo.getUserByIdReturnModel(notification.targetUserId)
    if(!targetUser) throw new BadRequestError("user in notification not found")
    
    const { id, username, firstName, lastName, profilePicture } = targetUser;
    return {
      subject: "follow",
      type: notification.action,
      userId: id,
      username,
      displayName: firstName || lastName ? `${firstName + " "}${lastName}` : username,
      profilePicture,
      createdAt: notification.createdAt
    }
  }

  private async transformRawFollowFriends(notification: UserRelatedNotificationsModel): Promise<IFinedUserRelatedNotificaitonFriends> {
    const sourceUser = await this.userRepo.getUserByIdReturnModel(notification.sourceUserId)
    if(!sourceUser) throw new BadRequestError("user in notification not found")
    const targetUser = await this.userRepo.getUserByIdReturnModel(notification.targetUserId)
    if(!targetUser) throw new BadRequestError("user in notification not found")
    
    const { id, username, firstName, lastName, profilePicture } = targetUser;
    return {
      subject: "follow",
      "sourceUser": {
        userId: sourceUser.id,
        username: sourceUser.username,
        displayName: sourceUser.firstName || sourceUser.lastName ? `${sourceUser.firstName + " "}${sourceUser.lastName}` : sourceUser.username,
        profilePicture: sourceUser.profilePicture
      },
      type: notification.action,
      userId: id,
      username,
      displayName: firstName || lastName ? `${firstName + " "}${lastName}` : username,
      profilePicture,
      createdAt: notification.createdAt
    }
  }

  private async transformRawPostLike(notification: PostLikeNotificationsModel): Promise<IFinedPostLikeNotification> {
    const post = await this.postRepo.getPostById(notification.postId)
    if(!post) throw new BadRequestError("post notification does not exist")
    const postImage = post?.images[0].urlImage
    
    const targetUser = await this.userRepo.getUserByIdReturnModel(notification.targetUserId)
    if(!targetUser) throw new BadRequestError("user in notification not found")

    const { id, username, firstName, lastName } = targetUser;
    return {
      subject: "post-like",
      postDetails:{
        id: post.id,
        postImage
      },
      userDetails: {
        userId: id,
        displayName: firstName || lastName ? `${firstName + " "}${lastName}` : username,
        username 
      },
      createdAt: notification.createdAt
    }
  }

  private async transformRawPostLikeFriends(notification: PostLikeNotificationsModel): Promise<IFinedPostLikeNotificationFriends> {
    const post = await this.postRepo.getPostById(notification.postId)
    if(!post) throw new BadRequestError("post notification does not exist")
    const postImage = post?.images[0].urlImage

    const sourceUser = await this.userRepo.getUserByIdReturnModel(notification.sourceUserId)
    if(!sourceUser) throw new BadRequestError("user in notification not found")
    
    const targetUser = await this.userRepo.getUserByIdReturnModel(notification.targetUserId)
    if(!targetUser) throw new BadRequestError("user in notification not found")

    const { id, username, firstName, lastName } = targetUser;
    return {
      subject: "post-like",
      sourceUser: {
        userId: sourceUser.id,
        username: sourceUser.username,
        displayName: sourceUser.firstName || sourceUser.lastName ? `${sourceUser.firstName + " "}${sourceUser.lastName}` : sourceUser.username,
        profilePicture: sourceUser.profilePicture
      },
      postDetails:{
        id: post.id,
        postImage
      },
      userDetails: {
        userId: id,
        displayName: firstName || lastName ? `${firstName + " "}${lastName}` : username,
        username 
      },
      createdAt: notification.createdAt
    }
  }

  private async transfromRawComment(notification: CommentNotificationsModel): Promise<IFinedCommentNotification> {
    const commentOwner = await this.commentRepo.getCommentOwnerIdById(notification.commentId)
    if(!commentOwner) throw new BadRequestError("comment in notification not found")

    const postCommmentedOn = await this.postRepo.getPostById(commentOwner.postId)
    if (!postCommmentedOn) throw new BadRequestError("post commented on in notification not found")

    const postImage = postCommmentedOn.images[0].urlImage
    const postId = postCommmentedOn.id
    const { username, firstName, lastName, userId } = commentOwner
    const commentId = notification.commentId
    
    return {
      subject: "comment",
      userDetail: {
        username: username,
        userId,
        displayName: firstName || lastName ? `${firstName + " "}${lastName}` : username,
      },
      postDetail: {
        id: postId,
        postImage
      },
      commentDetail: {
        commentId
      },
      createdAt: notification.createdAt
    }
  }

  private async transfromRawCommentFriends(notification: CommentNotificationsModel): Promise<IFinedCommentNotificationFriends> {
    const commentOwner = await this.commentRepo.getCommentOwnerIdById(notification.commentId)
    if(!commentOwner) throw new BadRequestError("comment in notification not found")

    const postCommmentedOn = await this.postRepo.getPostById(commentOwner.postId)
    if (!postCommmentedOn) throw new BadRequestError("post commented on in notification not found")

    const sourceUser = await this.userRepo.getUserByIdReturnModel(postCommmentedOn.userId)
    if(!sourceUser) throw new BadRequestError("user in notification not found")

    const postImage = postCommmentedOn.images[0].urlImage
    const postId = postCommmentedOn.id
    const { username, firstName, lastName, userId } = commentOwner
    const commentId = notification.commentId
    
    return {
      subject: "comment",
      sourceUser: {
        userId: sourceUser.id,
        username: sourceUser.username,
        displayName: sourceUser.firstName || sourceUser.lastName ? `${sourceUser.firstName + " "}${sourceUser.lastName}` : sourceUser.username,
        profilePicture: sourceUser.profilePicture
      },
      userDetail: {
        username: username,
        userId,
        displayName: firstName || lastName ? `${firstName + " "}${lastName}` : username,
      },
      postDetail: {
        id: postId,
        postImage
      },
      commentDetail: {
        commentId
      },
      createdAt: notification.createdAt
    }
  }

  private async transformRawToUnderstandableNotifications(notifications: CombinedNotifications): Promise<(IFinedCommentNotification | IFinedUserRelatedNotificaiton | IFinedPostLikeNotification | undefined)[]> {
    return await Promise.all(notifications.map( async (notification) => {
      if (isUserRelatedNotification(notification)) {
        return await this.transformRawFollow(notification)
      } else if ( isPostLikeNotification(notification)){
        return await this.transformRawPostLike(notification)
      } else if (isCommentNotification(notification)){
        return await this.transfromRawComment(notification)
      }
    }))
  }

  private async transformRawToUnderstandableFriendsNotifications(notifications: CombinedNotifications): Promise<(IFinedCommentNotification | IFinedUserRelatedNotificaitonFriends | IFinedPostLikeNotificationFriends | undefined)[]> {
    return await Promise.all(notifications.map( async (notification) => {
      if (isUserRelatedNotification(notification)) {
        return await this.transformRawFollowFriends(notification)
      } else if ( isPostLikeNotification(notification)){
        return await this.transformRawPostLikeFriends(notification)
      } else if (isCommentNotification(notification)){
        return await this.transfromRawCommentFriends(notification)
      }
    }))
  }

  async getSelfNotifications(dto: GetNotificationDto){
      const rawNotifications = await this.notificationRepo.getNotificationsWithPagination(dto.userId, dto.page)
      const finedNotifications = await this.transformRawToUnderstandableNotifications(rawNotifications);
      
      return {
          statusCode: 200,
          response: {
              message: "notifications fetched successfully",
              data: finedNotifications
          }
      }
  }

  async getFriendsNotifications(dto: GetNotificationDto){
    const userFriends = await this.followRepo.getFollowingsByUserId(dto.userId)
    
    const friendsRawNotifications = await Promise.all(userFriends.map(async (userFriend) => {
      const friendRawNotifications = this.notificationRepo.getNotificationsWithPagination(userFriend.followedUserId, dto.page)
      return friendRawNotifications
    }))
    const flatFriendsRawNotifications = getUniqueObjects(friendsRawNotifications.flatMap((x) => x))
    
    const finedFriendsNotifications = await this.transformRawToUnderstandableFriendsNotifications(flatFriendsRawNotifications);
    
    return {
        statusCode: 200,
        response: {
            message: "notifications fetched successfully",
            data: finedFriendsNotifications
        }
    }
}

}
  