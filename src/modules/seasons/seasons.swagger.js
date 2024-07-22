/**
 * @swagger
 *  components:
 *   schemas:
 *    createSeasonSchema:
 *     type: object
 *     required:
 *        -   course_id
 *        -   name
 *     properties:
 *      course_id:
 *       type: string
 *       description: course id reference
 *      name:
 *       type: string
 *       description: season name
 *      description:
 *       type: string
 *       description: season description
 *      order:
 *       type: number
 *       description: season order
 *    updateSeasonSchema:
 *     type: object
 *     required:
 *        -   course_id
 *     properties:
 *      course_id:
 *       type: string
 *       description: course id reference
 *      name:
 *       type: string
 *       description: season name
 *      description:
 *       type: string
 *       description: season description
 *      order:
 *       type: number
 *       description: season order
 *    removeSeasonSchema:
 *     type: object
 *     required:
 *        -   course_id
 *     properties:
 *      course_id:
 *       type: string
 *       description: course id reference
 */

/**
 * @swagger
 *  /season/new:
 *   post:
 *    summary: create new season.
 *    tags:
 *      -  Season
 *    requestBody:
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "./#/components/schemas/createSeasonSchema"
 *      application/json:
 *       schema:
 *        $ref: "./#/components/schemas/createSeasonSchema"
 *    responses:
 *     200:
 *      description: success
 */
/**
 * @swagger
 *  /season/update/{id}:
 *   patch:
 *    summary: update season.
 *    tags:
 *      -  Season
 *    parameters:
 *      -   in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: season id reference
 *    requestBody:
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "./#/components/schemas/updateSeasonSchema"
 *      application/json:
 *       schema:
 *        $ref: "./#/components/schemas/updateSeasonSchema"
 *    responses:
 *     200:
 *      description: success
 */
/**
 * @swagger
 *  /season/remove/{id}:
 *   delete:
 *    summary: remove one of the season.
 *    tags:
 *      -  Season
 *    parameters:
 *      -   in: path
 *          name: id
 *          type: string
 *          required: true
 *          description: season id reference
 *    requestBody:
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "./#/components/schemas/removeSeasonSchema"
 *      application/json:
 *       schema:
 *        $ref: "./#/components/schemas/removeSeasonSchema"
 *    responses:
 *     200:
 *      description: success
 */
/**
 * @swagger
 *  /season/get-all/{id}:
 *   get:
 *    summary: get all seasons of course by courseId
 *    tags:
 *      -   Season
 *    parameters:
 *        -   in: path
 *            name: id
 *            required: true
 *            type: string
 *    responses:
 *     200:
 *      description: success
 */