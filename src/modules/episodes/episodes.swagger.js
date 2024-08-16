/**
 * @swagger
 *  components:
 *   schemas:
 *    createEpisodeSchema:
 *     type: object
 *     required:
 *         -  course_id
 *         -  season_id
 *         -  title
 *     properties:
 *         course_id:
 *          type: string
 *          description: course id refrence
 *         season_id:
 *          type: string
 *          description: season id refrence
 *         title:
 *          type: string
 *          description: title of episode
 *         description:
 *          type: string
 *          description: description of episode
 *         isFreeAccess:
 *          type: boolean
 *          description: episode is free or not
 *          enum:
 *           - true
 *           - false
 *         attachment:
 *          type: file
 *          format: binary
 */

/**
 * @swagger
 *  /episode/new:
 *   post:
 *    summary: create new episode for season
 *    description: add episode to season by courseId and seasonId
 *    tags:
 *      -  Episode
 *    requestBody:
 *     content:
 *      multipart/form-data:
 *       schema:
 *        $ref: './#/components/schemas/createEpisodeSchema'
 *    responses:
 *     200:
 *      description: success
 */
