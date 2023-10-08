/**
 * @swagger
 * /api/post/create-post:
 *   post:
 *     summary: create a new post
 *     tags:
 *       - post
 *     security:
 *        - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *               tags:
 *                 type: string
 *               isCloseFriend:
 *                 type: boolean
 *                 default: false
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Form submitted successfully
 *       400:
 *         description: Bad request - validation error
 * components:
 *  securitySchemes:
 *    JWT:
 *      type: apiKey
 *      in: header
 *      name: Authorization
 *
 */
/**
 * @swagger
 * /api/post/view-post/{postId}:
 *   get:
 *     summary: View a post
 *     tags:
 *       - post
 *     security:
 *        - JWT: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: number
 *         required: true
 *         description: ID of the post to view
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *       400:
 *         description: No valid post id provided
 * components:
 *  securitySchemes:
 *    JWT:
 *      type: apiKey
 *      in: header
 *      name: Authorization
 */
/**
 * @swagger
 * /api/post/edit-post/:
 *   put:
 *     summary: edit post
 *     tags:
 *       - post
 *     security:
 *        - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *               tags:
 *                 type: string
 *               postId:
 *                 type: number
 *               isCloseFriend:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *       400:
 *         description: No valid post id provided
 * components:
 *  securitySchemes:
 *    JWT:
 *      type: apiKey
 *      in: header
 *      name: Authorization
 *
 */
/**
 * @swagger
 * /api/post/like:
 *   post:
 *     summary: like post by post id
 *     tags:
 *       - post
 *     security:
 *        - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: number
 *     responses:
 *       200:
 *         description: post liked successfully
 *       400:
 *         description: Bad request - validation error
 * components:
 *  securitySchemes:
 *    JWT:
 *      type: apiKey
 *      in: header
 *      name: Authorization
 *
 */
/**
 * @swagger
 * /api/post/unlike:
 *   delete:
 *     summary: unlike post by post id
 *     tags:
 *       - post
 *     security:
 *        - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: number
 *     responses:
 *       200:
 *         description: post liked successfully
 *       400:
 *         description: Bad request - validation error
 * components:
 *  securitySchemes:
 *    JWT:
 *      type: apiKey
 *      in: header
 *      name: Authorization
 *
 */
/**
 * @swagger
 * /api/post/{username}:
 *   get:
 *     summary: get all posts by username
 *     tags:
 *       - post
 *     security:
 *        - JWT: []
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to view
 *     responses:
 *       200:
 *         description: get all posts by username
 *       400:
 *         description: No valid username provided
 * components:
 *  securitySchemes:
 *    JWT:
 *      type: apiKey
 *      in: header
 *      name: Authorization
 */
/**
 * @swagger
 * /api/post/search/{value}:
 *   get:
 *     summary: get all posts by tag
 *     tags:
 *       - post
 *     security:
 *        - JWT: []
 *     parameters:
 *       - in: path
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *         description: value of tag
 *     responses:
 *       200:
 *         description: get all posts by tag
 *       400:
 *         description: No valid username provided
 * components:
 *  securitySchemes:
 *    JWT:
 *      type: apiKey
 *      in: header
 *      name: Authorization
 */
/**
 * @swagger
 * /api/post/isLiked/{postId}:
 *   get:
 *     summary: check is user liked post
 *     tags:
 *       - post
 *     security:
 *        - JWT: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: number
 *         required: true
 *         description: ID of the post to view
 *     responses:
 *       200:
 *         description: get post is liked or not
 *       400:
 *         description: No valid post id provided
 * components:
 *  securitySchemes:
 *    JWT:
 *      type: apiKey
 *      in: header
 *      name: Authorization
 */