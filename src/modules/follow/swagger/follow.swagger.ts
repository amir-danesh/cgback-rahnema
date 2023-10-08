/** 
* @swagger
* /api/user/follow:
*   post:
*     summary: follow user by userId
*     tags:
*       - Follow
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
*       200:
*         description: follow user by userId successfully
*       400:
*         description: Bad request - validation error
* components:
*  securitySchemes:
*    JWT:
*      type: apiKey
*      in: header
*      name: Authorization
*/
/**
 * @swagger
 * /api/user/unfollow:
 *   delete:
 *     summary: unfollow user by userId
 *     tags:
 *       - Follow
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
 *       200:
 *         description: unfollow user by userId successfully
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
 * /api/user/accept:
 *   post:
 *     summary: accept follow user by userId
 *     tags:
 *       - Follow
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
 *       200:
 *         description: accept follow user by userId user by userId successfully
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
 * /api/user/deny:
 *   delete:
 *     summary: deny follow user by userId
 *     tags:
 *       - Follow
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
 *       200:
 *         description: deny follow user by userId user by userId successfully
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
 * /api/user/followers:
 *   get:
 *     summary: user can get all followers
 *     tags:
 *       - Follow
 *     security:
 *        - JWT: []
 *     responses:
 *        '200':
 *          description: get all followers
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
 * /api/user/followings:
 *   get:
 *     summary: user can get all followings
 *     tags:
 *       - Follow
 *     security:
 *        - JWT: []
 *     responses:
 *        '200':
 *          description: get all followings
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