/**
 * @swagger
 *  components:
 *   schemas:
 *    updateProfileSchema:
 *     type: object
 *     properties:
 *      avatar:
 *       type: file
 *       format: binary
 *      first_name:
 *       type: string
 *      last_name:
 *       type: string
 *      brith_date:
 *       type: string
 *       description: "format iso"
 *
 */
/**
 * @swagger
 *  /user/get-profile/{id}:
 *   get:
 *    summary: get user profile.
 *    tags:
 *      -  User
 *    parameters:
 *         -    in: path
 *              name: id
 *              type: string
 *              required: true
 *    responses:
 *     200:
 *      description: success
 */
/**
 * @swagger
 *  /user/profile-update/{id}:
 *   post:
 *    summary: update user profile.
 *    tags:
 *      -  User
 *    parameters:
 *         -    in: path
 *              name: id
 *              type: string
 *              required: true
 *    requestBody:
 *     content:
 *      multipart/form-data:
 *       schema:
 *        $ref: "./#/components/schemas/updateProfileSchema"
 *    responses:
 *     200:
 *      description: success
 */
