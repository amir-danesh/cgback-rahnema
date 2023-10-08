/**
 * @swagger
 * /api/images/{imageName}:
 *   get:
 *     summary: get an image
 *     tags:
 *      - Image
 *     security:
 *        - JWT: []
 *     parameters:
 *         - in: path
 *           name: imageName
 *           schema:
 *             type: string
 *           required: true
 *     responses:
 *        '200':
 *          description: get an image
 *        '404':
 *          description: image not found
 *components:
 *  securitySchemes:
 *    JWT:
 *      type: apiKey
 *      in: header
 *      name: Authorization
 *
 *
 *
 */
