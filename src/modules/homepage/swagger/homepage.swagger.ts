/**
 * @swagger
 * /api/homepage:
 *   get:
 *     summary: get all bookmarked posts
 *     tags:
 *       - Homepage
 *     security:
 *        - JWT: []
 *     responses:
 *       200:
 *         description: get all post of following and non-blocking posts
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