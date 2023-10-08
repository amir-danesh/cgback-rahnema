import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinTable} from "typeorm";
import { TagId } from "../model/tag-id";
import { TagName } from "../model/tag-name";
import { PostEntity } from "../../entity/post.entity";

@Entity("tags")
export class TagEntity {
  @PrimaryGeneratedColumn()
  id!: TagId;

  @Column({ unique: true })
  name!: TagName;

  @ManyToMany(() => PostEntity, (post) => post.tags)
  posts!: PostEntity[];
}
