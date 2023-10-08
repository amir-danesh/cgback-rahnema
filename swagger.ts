import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv-flow";

dotenv.config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CollegeGeram Api",
      version: "1.0.0",
    },
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },

    servers: [
      {
        url: process.env.SERVER_SWAGGER_URL,
      },
    ],
  },
  apis: [
    "./src/modules/user/swagger/user.swagger.ts",
    "./src/modules/post/swagger/post.swagger.ts",
    "./src/modules/comment/swagger/comment.swagger.ts",
    "./src/modules/bookmark/swagger/bookmark.swagger.ts",
    "./src/modules/comment-like/swagger/commentLike.swagger.ts",
    "./src/modules/follow/swagger/follow.swagger.ts",
    "./src/modules/show-image/swagger/show-image.swagger.ts",
    "./src/modules/homepage/swagger/homepage.swagger.ts",
    "./src/modules/closefriends/swagger/closeFriends.swagger.ts",
    "./src/modules/collegegramies/swagger/collegegramies.swagger.ts",
    "src/modules/notification/swagger/notification.swagger.ts"
  ],
};

export const specs = swaggerJsdoc(options);
