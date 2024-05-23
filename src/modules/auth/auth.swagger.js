/**
 * @swagger
 *  definitions:
 *   schemas:
 *    sendOtpDef200:
 *     type: object
 *     properties:
 *      statusCode:
 *       type: number
 *       example: 200
 *      data:
 *       type: object
 *       properties:
 *        otp:
 *         type: object
 *         properties:
 *          code:
 *           type: string
 *           example: 12345
 *          expiresIn:
 *           type: number
 *           example: 554542154
 *    sendOtpDef500:
 *     type: object
 *     properties:
 *      statusCode:
 *       type: number
 *       example: 500
 *      data:
 *       type: object
 *       properties:
 *        message:
 *         type: string
 *         example: رمز یکبار مصرف منقضی شده است.
 */
/**
 * @swagger
 *  components:
 *   schemas:
 *    sendOtpSchema:
 *     type: object
 *     required:
 *         -    phone
 *     properties:
 *      phone:
 *       type: string
 *       example: 09xxxxxxxxx
 *    checkOtpSchema:
 *     type: object
 *     required:
 *         -    phone
 *         -    code
 *     properties:
 *      phone:
 *       type: string
 *       example: 09xxxxxxxxx
 *      code:
 *       type: number
 *       example: 12345
 *    refreshTokenSchema:
 *     type: object
 *     required:
 *         -    refresh_token
 *     properties:
 *      refresh_token:
 *       type: string
 *       example: token
 */
/**
 * @swagger
 *  /auth/send-otp:
 *   post:
 *    summary: send otp-code for phone
 *    tags:
 *      -   Auth
 *    requestBody:
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "./#/components/schemas/sendOtpSchema"
 *      application/json:
 *       schema:
 *        $ref: "./#/components/schemas/sendOtpSchema"
 *    responses:
 *     200:
 *      description: success
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "./#/definitions/schemas/sendOtpDef200"
 *     400:
 *      description: bad request
 *     500:
 *      description: success
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "./#/definitions/schemas/sendOtpDef500"
 */
/**
 * @swagger
 *  /auth/check-otp:
 *   post:
 *    summary: verify otp-code
 *    tags:
 *      -   Auth
 *    requestBody:
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "./#/components/schemas/checkOtpSchema"
 *      application/json:
 *       schema:
 *        $ref: "./#/components/schemas/checkOtpSchema"
 *    responses:
 *     200:
 *      description: success
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "./#/definitions/schemas/sendOtpDef200"
 *     400:
 *      description: bad request
 *     500:
 *      description: success
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "./#/definitions/schemas/sendOtpDef500"
 */
/**
 * @swagger
 *  /auth/refresh-token:
 *   post:
 *    summary: get new accessToken and refreshToken
 *    tags:
 *      -   Auth
 *    requestBody:
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "./#/components/schemas/refreshTokenSchema"
 *      application/json:
 *       schema:
 *        $ref: "./#/components/schemas/refreshTokenSchema"
 *    responses:
 *     200:
 *      description: success
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "./#/definitions/schemas/sendOtpDef200"
 *     400:
 *      description: bad request
 *     500:
 *      description: success
 *      content:
 *       application/json:
 *        schema:
 *         $ref: "./#/definitions/schemas/sendOtpDef500"
 */
