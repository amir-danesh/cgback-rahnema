/**
 * @swagger
 * /api/comment/create:
 *   post:
 *     summary: Create a comment with text, postId, and parent comment id if applicable
 *     tags:
 *       - Comment
 *     description: |
 *       This endpoint allows users to create a comment. If the comment is not a reply to another comment, DO NOT send the parent field in the request. Remember to set a header token, as the user is detected with it.
 *     security:
 *        - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               postId:
 *                 type: string
 *               parentCommentId:
 *                 type: string
 *                 required: false
 *     responses:
 *       '201':
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *       '400':
 *         description: Failed to create comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 * components:
 *  securitySchemes:
 *    JWT:
 *      type: apiKey
 *      in: header
 *      name: Authorization
 */
/**
 * @swagger
 * /api/comment/{commentId}:
 *   get:
 *     summary: get a single comment by comment id
 *     tags:
 *       - Comment
 *     description: |
 *       This endpoint allows users to get a single comment by comment id
 *     security:
 *        - JWT: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: number
 *         required: true
 *         description: comment id
 * 
 *     responses:
 *       '200':
 *         description: Comment fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       '400':
 *         description: comment does not exists or comment id is not valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 * components:
 *  securitySchemes:
 *    JWT:
 *      type: apiKey
 *      in: header
 *      name: Authorization
 */
/**
 * @swagger
 * /api/comment/post/{postId}:
 *   get:
 *     summary: get all comments for a single post
 *     tags:
 *       - Comment
 *     description: |
 *       This endpoint allows users to get all comments for a single post
 *     security:
 *        - JWT: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: number
 *         required: true
 *         description: post id
 * 
 *     responses:
 *       '200':
 *         description: Comments fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       '400':
 *         description: post does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 * components:
 *  securitySchemes:
 *    JWT:
 *      type: apiKey
 *      in: header
 *      name: Authorization
 */