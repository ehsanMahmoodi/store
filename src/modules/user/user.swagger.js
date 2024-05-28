/**
 * @swagger
 *  components:
 *   getProfileSchema:
 *    type: object
 *    required: id
 *    properties:
 *     id:
 *      type: string
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
