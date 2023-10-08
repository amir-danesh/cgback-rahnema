/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Register user with username , email and password
 *     tags:
 *       - user
 *     description: |
 *             This endpoint allows users to sign up using either their username , email along with their password.
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *     responses:
 *        '201':
 *          description: User Created
 *        '400':
 *          description: bad request
 *
 *
 *
 *
 */
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: login user with username or email and password
 *     tags:
 *       - user
 *     description: |
 *             This endpoint allows users to log in using either their username or email along with their password.
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                 loginIdentifier:
 *                   type: string
 *                 password:
 *                   type: string
 *     responses:
 *        '201':
 *          description: login successfull
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                    isSuccess:
 *                        type: boolean
 *                    message:
 *                        type: string
 *        '401':
 *          description: fail login
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                    isSuccess:
 *                        type: boolean
 *                        default: false
 *                    message:
 *                        type: string
 *
 *
 */
/**
 * @swagger
 * /api/user/forget-password:
 *   post:
 *     summary: user can send request forget password with username or email
 *     tags:
 *       - user
 *     description: |
 *             This endpoint will send a password change email to users if their username is correct.
 *     parameters:
 *         - in: query
 *           name: username
 *           schema:
 *             type: string
 *           required: true
 *           description: username of the user to get
 *     responses:
 *        '200':
 *          description: send email successfully
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                    message:
 *                        type: string
 *        '404':
 *          description: cannot find user
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                    message:
 *                        type: string
 *
 *
 */
/**
 * @swagger
 * /api/user/reset-password/{token}:
 *   get:
 *     summary: user can send request forget password with toke received in email
 *     tags:
 *       - user
 *     description: |
 *             If the token is valid, the endpoint sets it in the header and sends it back.
 *     parameters:
 *         - in: path
 *           name: token
 *           schema:
 *             type: string
 *           required: true
 *           description: token received in email
 *     responses:
 *        '200':
 *          description: get token is valid message with token
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                    message:
 *                        type: string
 *                    data:
 *                        type: object
 *        '404':
 *          description: token not valid
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                    message:
 *                        type: string
 *
 *
 */
/**
 * @swagger
 * /api/user/reset-password:
 *   post:
 *     summary: reset password for user with token in header and password in body
 *     tags:
 *       - user
 *     security:
 *        - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 required: true
 *               token:
 *                 type: string
 *                 required: true
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
 * /api/user:
 *   post:
 *     summary: Edit User
 *     tags:
 *       - user
 *     security:
 *        - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 required: false
 *               isPrivate:
 *                 type: boolean
 *                 default: true
 *               profile:
 *                 type: string
 *                 format: binary
 *               bio:
 *                 type: string
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
 * /api/user/block:
 *   get:
 *     summary: get blocked users
 *     tags:
 *       - user
 *     security:
 *        - JWT: []
 *     responses:
 *       200:
 *         description: get blocked users successfully
 *       400:
 *         description: Bad request
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
 * /api/user/block:
 *   post:
 *     summary: block user by userId
 *     tags:
 *       - user
 *     security:
 *        - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blockUserName:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: blocked user successfully
 *       400:
 *         description: Bad request - you can not block this user
 *       404:
 *         description: user not found
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
 * /api/user/unblock:
 *   delete:
 *     summary: block user by userId
 *     tags:
 *       - user
 *     security:
 *        - JWT: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blockUserName:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: unblocked user successfully
 *       400:
 *         description: Bad request - you can not unblock this user
 *       404:
 *         description: user not found
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
 * /api/user:
 *   get:
 *     summary: Get user detail
 *     tags:
 *       - user
 *     security:
 *        - JWT: []
 *     responses:
 *        '200':
 *          description: success
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                    message:
 *                        type: string
 *                    data:
 *                        type: object
 *        '401':
 *          description: Unauthorized
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                    message:
 *                        type: string
 *
 */
/**
 * @swagger
 * /api/user/another/{username}:
 *   get:
 *     summary: Get another user detail
 *     tags:
 *       - user
 *     security:
 *        - JWT: []
 *     description: |
 *             This endpoint allows users to get another user detail.
 *     parameters:
 *         - in: path
 *           name: username
 *           schema:
 *             type: string
 *           required: true
 *           description: username of the user to get
 *     responses:
 *        '200':
 *          description: success
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                    message:
 *                        type: string
 *                    data:
 *                        type: object
 *        '404':
 *          description: user not found
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                    message:
 *                        type: string
 *   components:
 *    securitySchemes:
 *      JWT:
 *        type: apiKey
 *        in: header
 *        name: Authorization
 *
 */


