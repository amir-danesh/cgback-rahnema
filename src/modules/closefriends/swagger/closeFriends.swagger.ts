/**
 * @swagger
 * /api/closeFriends:
 *   get:
 *     summary: user can get all followers
 *     tags:
 *       - CloseFriends
 *     security:
 *        - JWT: []
 *     responses:
 *        '200':
 *          description: get all close friends
 *        '400':
 *          description: cannot find user
 *components:
 *  securitySchemes:
 *    JWT:
 *      type: apiKey
 *      in: header
 *      name: Authorization
 *
 */
/**
 * @swagger
 * /api/setcloseFriends:
 *   post:
 *     summary: user send  add close friend
 *     tags:
 *       - CloseFriends
 *     description: |
 *       This endpoint allows users to send request add close friend. you need to provide the closeFriendId only
 *     security:
 *        - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *     responses:
 *       '201':
 *         description: close friend request sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 *       '400':
 *         description: Failed to send close friend request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
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
 * /api/deletecloseFriends:
 *   delete:
 *     summary: user remove close friend
 *     tags:
 *       - CloseFriends
 *     description: |
 *       This endpoint allows users to remove close friend. you need to provide the closeFriendId only
 *     security:
 *        - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *               
 *     responses:
 *       '201':
 *         description: close friend request sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 *       '400':
 *         description: Failed to send close friend request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
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
 * /api/iscloseFriends/{closeFriendId}:
 *   get:
 *     summary: check if user is close friend
 *     tags:
 *       - CloseFriends
 *     description: |
 *       This endpoint allows users to check if user is close friend. you need to provide the closeFriendId only
 *     security:
 *        - JWT: []
 *     parameters:
 *       - in: path
 *         name: closeFriendId
 *         schema:
 *           type: number
 *         required: true
 *         description: close friend id
 *     responses:
 *       '201':
 *         description: close friend request sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 *       '400':
 *         description: Failed to send close friend request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 * components:
 *  securitySchemes:
 *    JWT:
 *      type: apiKey
 *      in: header
 *      name: Authorization
 */
