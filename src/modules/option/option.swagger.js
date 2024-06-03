/**
 * @swagger
 *  components:
 *   schemas:
 *    createOptionSchema:
 *     type: object
 *     required:
 *        -   product_id
 *        -   name
 *        -   key
 *        -   field_type
 *     properties:
 *      product_id:
 *       type: string
 *       description: product id reference
 *      name:
 *       type: string
 *       description: option name
 *      key:
 *       type: string
 *       description: option key
 *      description:
 *       type: string
 *       description: option description
 *      field_type:
 *       type: string
 *       description: option type
 *       enum:
 *         -  string
 *         -  number
 *         -  boolean
 *         -  array
 *      is_required:
 *       type: boolean
 *       description: option required or not
 *      enums:
 *       type: array
 *       description: option enums
 */

/**
 * @swagger
 *  /option/create:
 *   post:
 *    summary: create new option.
 *    tags:
 *      -  Option
 *    requestBody:
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "./#/components/schemas/createOptionSchema"
 *      application/json:
 *       schema:
 *        $ref: "./#/components/schemas/createOptionSchema"
 *    responses:
 *     200:
 *      description: success
 */
