/** 
* @swagger
* /api/notification/self-notifications/{page}:
*   get:
*     summary: get notifications for a user
*     tags:
*       - notification
*     security:
*        - JWT: []
*     parameters:
*       - in: path
*         name: page
*         schema:
*           type: number
*         required: true
*         description: pagination for notification
*     responses:
*       200:
*         description: notifications fetched successfully
*       400:
*         description: Bad request - validation error
*       404:
*         description: Not found
* components:
*  securitySchemes:
*    JWT:
*      type: apiKey
*      in: header
*      name: Authorization
*/
/** 
* @swagger
* /api/notification/friends-notifications/{page}:
*   get:
*     summary: get notifications for a user friends
*     tags:
*       - notification
*     security:
*        - JWT: []
*     parameters:
*       - in: path
*         name: page
*         schema:
*           type: number
*         required: true
*         description: pagination for notification
*     responses:
*       200:
*         description: notifications fetched successfully
*       400:
*         description: Bad request - validation error
*       404:
*         description: Not found
* components:
*  securitySchemes:
*    JWT:
*      type: apiKey
*      in: header
*      name: Authorization
*/
