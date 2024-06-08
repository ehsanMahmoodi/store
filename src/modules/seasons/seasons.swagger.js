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
