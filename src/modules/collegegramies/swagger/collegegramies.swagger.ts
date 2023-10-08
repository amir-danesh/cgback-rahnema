/**
 * @swagger
 * /api/collegegramies:
 *   get:
 *     summary: get collegegramies
 *     tags:
 *       - collegegramies
 *     security:
 *        - JWT: []
 *     parameters:    
 *      - in: query
 *        name: page
 *        schema:
 *           type: integer
 *        description: page number to see collegegramies           
 *     responses:
 *       200:
 *         description: get notfollowed and not blocked users with last 4 posts
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