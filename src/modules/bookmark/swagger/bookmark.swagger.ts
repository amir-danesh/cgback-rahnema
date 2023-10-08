/**
 * @swagger
 * /api/post/bookmark:
 *   post:
 *     summary: bookmark post by post id
 *     tags:
 *       - Bookmark
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
 *         description: post bookmarked successfully
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
 * /api/post/bookmark:
 *   delete:
 *     summary: unBookmark post by post id
 *     tags:
 *       - Bookmark
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
 *         description: post bookmarked successfully
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
 * /api/post/bookmark:
 *   get:
 *     summary: get all bookmarked posts
 *     tags:
 *       - Bookmark
 *     security:
 *        - JWT: []
 *     responses:
 *       200:
 *         description: get all bookmarked posts
 *       400:
 *         description: Bad request - validation error
 *       404:
 *         description: post not found
 * components:
 *  securitySchemes:
 *    JWT:
 *      type: apiKey
 *      in: header
 *      name: Authorization
 *
 */
