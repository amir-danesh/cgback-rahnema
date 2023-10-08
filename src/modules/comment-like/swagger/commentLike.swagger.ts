/**
 * @swagger
 * /api/comment-like/like/{commentId}:
 *   post:
 *     summary: like a commnet
 *     tags:
 *       - Comment Like
 *     description: |
 *       This endpoint allows users to like a comment if applicable. you need to provide the commentId only
 *     security:
 *        - JWT: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: number
 *         required: true
 *         description: comment id
 *     responses:
 *       '201':
 *         description: Comment liked successfully
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
 *                     userId:
 *                       type: number
 *                     commentId:
 *                       type: number
 *       '400':
 *         description: Failed to like a comment
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
 * /api/comment-like/unlike/{commentId}:
 *   delete:
 *     summary: unlike a commnet
 *     tags:
 *       - Comment Like
 *     description: |
 *       This endpoint allows users to unlike a comment if applicable. you need to provide the commentId only
 *     security:
 *        - JWT: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: number
 *         required: true
 *         description: comment id
 *     responses:
 *       '200':
 *         description: Comment liked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '400':
 *         description: Failed to unlike a comment
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