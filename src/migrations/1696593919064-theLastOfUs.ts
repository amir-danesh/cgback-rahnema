import { MigrationInterface, QueryRunner } from "typeorm";

export class TheLastOfUs1696593919064 implements MigrationInterface {
    name = 'TheLastOfUs1696593919064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`post_image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`urlImage\` varchar(255) NOT NULL, \`postId\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tags\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_d90243459a697eadb8ad56e909\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post_likes\` (\`post_id\` int NOT NULL, \`user_id\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`post_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post-like-notification\` (\`sourceUserId\` int NOT NULL, \`targetUserId\` int NOT NULL, \`postId\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`sourceUserId\`, \`targetUserId\`, \`postId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`posts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`body\` varchar(255) NULL, \`userId\` int NOT NULL, \`likeCount\` int NOT NULL DEFAULT '0', \`bookmarkCount\` int NOT NULL DEFAULT '0', \`commentCount\` int NOT NULL DEFAULT '0', \`isCloseFriend\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comment-notification\` (\`sourceUserId\` int NOT NULL, \`targetUserId\` int NOT NULL, \`commentId\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`sourceUserId\`, \`targetUserId\`, \`commentId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`text\` varchar(2200) NOT NULL, \`likeCount\` int NOT NULL DEFAULT '0', \`timestamp\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` int NULL, \`postId\` int NULL, \`parent_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comment_likes\` (\`userId\` int NOT NULL, \`commentId\` int NOT NULL, \`timestamp\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`userId\`, \`commentId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`blocked_users\` (\`user_id\` int NOT NULL, \`blockUser_id\` int NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`user_id\`, \`blockUser_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`follow_list\` (\`userId\` int NOT NULL, \`followedUserId\` int NOT NULL, \`state\` enum ('pending', 'followed') NOT NULL DEFAULT 'pending', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`userId\`, \`followedUserId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`follow-state-notification\` (\`sourceUserId\` int NOT NULL, \`targetUserId\` int NOT NULL, \`action\` enum ('followed', 'follow-request', 'follow-accepted') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`sourceUserId\`, \`targetUserId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`firstName\` varchar(255) NULL, \`lastName\` varchar(255) NULL, \`isPrivate\` tinyint NOT NULL DEFAULT 1, \`status\` tinyint NOT NULL DEFAULT 0, \`profilePicture\` varchar(255) NULL, \`bio\` varchar(255) NULL, \`followerCount\` int NOT NULL DEFAULT '0', \`followingCount\` int NOT NULL DEFAULT '0', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_forget_password\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` varchar(255) NOT NULL, \`expireAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userIdId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`bookmark\` (\`post_id\` int NOT NULL, \`user_id\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`post_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`close_friends\` (\`user_id\` int NOT NULL, \`close_friend_id\` int NOT NULL, \`createAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`user_id\`, \`close_friend_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`posts_tags_tags\` (\`postsId\` int NOT NULL, \`tagsId\` int NOT NULL, INDEX \`IDX_cf364c7e6905b285c4b55a0034\` (\`postsId\`), INDEX \`IDX_ce163a967812183a51b044f740\` (\`tagsId\`), PRIMARY KEY (\`postsId\`, \`tagsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`post_image\` ADD CONSTRAINT \`FK_668c9fb892f2accb872670c7b1e\` FOREIGN KEY (\`postId\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_likes\` ADD CONSTRAINT \`FK_9b9a7fc5eeff133cf71b8e06a7b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_likes\` ADD CONSTRAINT \`FK_b40d37469c501092203d285af80\` FOREIGN KEY (\`post_id\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post-like-notification\` ADD CONSTRAINT \`FK_27a9d5e5ad3db3d66a6504ad24c\` FOREIGN KEY (\`sourceUserId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post-like-notification\` ADD CONSTRAINT \`FK_e260a1b0952309bac666f226037\` FOREIGN KEY (\`targetUserId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`posts\` ADD CONSTRAINT \`FK_ae05faaa55c866130abef6e1fee\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment-notification\` ADD CONSTRAINT \`FK_f2a8171182e74498b4ef666f318\` FOREIGN KEY (\`sourceUserId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment-notification\` ADD CONSTRAINT \`FK_201072096de71c5f40b5a13ed7a\` FOREIGN KEY (\`targetUserId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_980bfefe00ed11685f325d0bd4c\` FOREIGN KEY (\`created_by\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_e44ddaaa6d058cb4092f83ad61f\` FOREIGN KEY (\`postId\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_d6f93329801a93536da4241e386\` FOREIGN KEY (\`parent_id\`) REFERENCES \`comments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment_likes\` ADD CONSTRAINT \`FK_34d1f902a8a527dbc2502f87c88\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment_likes\` ADD CONSTRAINT \`FK_abbd506a94a424dd6a3a68d26f4\` FOREIGN KEY (\`commentId\`) REFERENCES \`comments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`blocked_users\` ADD CONSTRAINT \`FK_171336109e6fd263f27351b9a7a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`blocked_users\` ADD CONSTRAINT \`FK_9a1da12a362bffbb6b68bc21d9e\` FOREIGN KEY (\`blockUser_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`follow_list\` ADD CONSTRAINT \`FK_0426cab5fae6f10977a7dae3634\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`follow-state-notification\` ADD CONSTRAINT \`FK_dd561bbc71e19d010b81e01e838\` FOREIGN KEY (\`sourceUserId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`follow-state-notification\` ADD CONSTRAINT \`FK_e82c96a5fcf3e13360539c76d36\` FOREIGN KEY (\`targetUserId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_forget_password\` ADD CONSTRAINT \`FK_dc0052fdc54036d67fcc781eb8e\` FOREIGN KEY (\`userIdId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bookmark\` ADD CONSTRAINT \`FK_8f1a143c6ba8bba0e2a4f41e0d0\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`bookmark\` ADD CONSTRAINT \`FK_88d15be9a11888c73c7328a32fc\` FOREIGN KEY (\`post_id\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`close_friends\` ADD CONSTRAINT \`FK_498d2d1330eb4115af9deb02e2a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`close_friends\` ADD CONSTRAINT \`FK_c62633421477f591c26f641c88a\` FOREIGN KEY (\`close_friend_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`posts_tags_tags\` ADD CONSTRAINT \`FK_cf364c7e6905b285c4b55a00343\` FOREIGN KEY (\`postsId\`) REFERENCES \`posts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`posts_tags_tags\` ADD CONSTRAINT \`FK_ce163a967812183a51b044f7404\` FOREIGN KEY (\`tagsId\`) REFERENCES \`tags\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts_tags_tags\` DROP FOREIGN KEY \`FK_ce163a967812183a51b044f7404\``);
        await queryRunner.query(`ALTER TABLE \`posts_tags_tags\` DROP FOREIGN KEY \`FK_cf364c7e6905b285c4b55a00343\``);
        await queryRunner.query(`ALTER TABLE \`close_friends\` DROP FOREIGN KEY \`FK_c62633421477f591c26f641c88a\``);
        await queryRunner.query(`ALTER TABLE \`close_friends\` DROP FOREIGN KEY \`FK_498d2d1330eb4115af9deb02e2a\``);
        await queryRunner.query(`ALTER TABLE \`bookmark\` DROP FOREIGN KEY \`FK_88d15be9a11888c73c7328a32fc\``);
        await queryRunner.query(`ALTER TABLE \`bookmark\` DROP FOREIGN KEY \`FK_8f1a143c6ba8bba0e2a4f41e0d0\``);
        await queryRunner.query(`ALTER TABLE \`user_forget_password\` DROP FOREIGN KEY \`FK_dc0052fdc54036d67fcc781eb8e\``);
        await queryRunner.query(`ALTER TABLE \`follow-state-notification\` DROP FOREIGN KEY \`FK_e82c96a5fcf3e13360539c76d36\``);
        await queryRunner.query(`ALTER TABLE \`follow-state-notification\` DROP FOREIGN KEY \`FK_dd561bbc71e19d010b81e01e838\``);
        await queryRunner.query(`ALTER TABLE \`follow_list\` DROP FOREIGN KEY \`FK_0426cab5fae6f10977a7dae3634\``);
        await queryRunner.query(`ALTER TABLE \`blocked_users\` DROP FOREIGN KEY \`FK_9a1da12a362bffbb6b68bc21d9e\``);
        await queryRunner.query(`ALTER TABLE \`blocked_users\` DROP FOREIGN KEY \`FK_171336109e6fd263f27351b9a7a\``);
        await queryRunner.query(`ALTER TABLE \`comment_likes\` DROP FOREIGN KEY \`FK_abbd506a94a424dd6a3a68d26f4\``);
        await queryRunner.query(`ALTER TABLE \`comment_likes\` DROP FOREIGN KEY \`FK_34d1f902a8a527dbc2502f87c88\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_d6f93329801a93536da4241e386\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_e44ddaaa6d058cb4092f83ad61f\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_980bfefe00ed11685f325d0bd4c\``);
        await queryRunner.query(`ALTER TABLE \`comment-notification\` DROP FOREIGN KEY \`FK_201072096de71c5f40b5a13ed7a\``);
        await queryRunner.query(`ALTER TABLE \`comment-notification\` DROP FOREIGN KEY \`FK_f2a8171182e74498b4ef666f318\``);
        await queryRunner.query(`ALTER TABLE \`posts\` DROP FOREIGN KEY \`FK_ae05faaa55c866130abef6e1fee\``);
        await queryRunner.query(`ALTER TABLE \`post-like-notification\` DROP FOREIGN KEY \`FK_e260a1b0952309bac666f226037\``);
        await queryRunner.query(`ALTER TABLE \`post-like-notification\` DROP FOREIGN KEY \`FK_27a9d5e5ad3db3d66a6504ad24c\``);
        await queryRunner.query(`ALTER TABLE \`post_likes\` DROP FOREIGN KEY \`FK_b40d37469c501092203d285af80\``);
        await queryRunner.query(`ALTER TABLE \`post_likes\` DROP FOREIGN KEY \`FK_9b9a7fc5eeff133cf71b8e06a7b\``);
        await queryRunner.query(`ALTER TABLE \`post_image\` DROP FOREIGN KEY \`FK_668c9fb892f2accb872670c7b1e\``);
        await queryRunner.query(`DROP INDEX \`IDX_ce163a967812183a51b044f740\` ON \`posts_tags_tags\``);
        await queryRunner.query(`DROP INDEX \`IDX_cf364c7e6905b285c4b55a0034\` ON \`posts_tags_tags\``);
        await queryRunner.query(`DROP TABLE \`posts_tags_tags\``);
        await queryRunner.query(`DROP TABLE \`close_friends\``);
        await queryRunner.query(`DROP TABLE \`bookmark\``);
        await queryRunner.query(`DROP TABLE \`user_forget_password\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`follow-state-notification\``);
        await queryRunner.query(`DROP TABLE \`follow_list\``);
        await queryRunner.query(`DROP TABLE \`blocked_users\``);
        await queryRunner.query(`DROP TABLE \`comment_likes\``);
        await queryRunner.query(`DROP TABLE \`comments\``);
        await queryRunner.query(`DROP TABLE \`comment-notification\``);
        await queryRunner.query(`DROP TABLE \`posts\``);
        await queryRunner.query(`DROP TABLE \`post-like-notification\``);
        await queryRunner.query(`DROP TABLE \`post_likes\``);
        await queryRunner.query(`DROP INDEX \`IDX_d90243459a697eadb8ad56e909\` ON \`tags\``);
        await queryRunner.query(`DROP TABLE \`tags\``);
        await queryRunner.query(`DROP TABLE \`post_image\``);
    }

}
