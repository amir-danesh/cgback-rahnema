import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PostEntity } from "../../entity/post.entity";
import { PostId } from "../../model/post-id";
import { PostImageId } from "../model/postImage-id";
import { PostImageUrl } from "../model/postImageCreatePost";
@Entity("post_image")
export class PostImageEntity {
  @PrimaryGeneratedColumn()
  id!: PostImageId;

  @Column()
  urlImage!: PostImageUrl;

  @Column()
  postId!: PostId;

  @ManyToOne(() => PostEntity, (post) => post.images)
  post!: PostEntity;

  @CreateDateColumn()
  createdAt!: Date;
}