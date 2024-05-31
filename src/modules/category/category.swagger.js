/**
 * @swagger
 *  components:
 *   schemas:
 *    createCategorySchema:
 *     type: object
 *     required:
 *          -   fa_name
 *          -   en_name
 *          -   slug
 *     properties:
 *      fa_name:
 *       type: string
 *       description: persian category name.
 *      en_name:
 *       type: string
 *       description: english category name.
 *      slug:
 *       type: string
 *       description: category slug.
 *      icon:
 *       type: string
 *       description: category icon.
 *      parent:
 *       type: string
 *       description: category parent id.
 */
/**
 * @swagger
 *  /category/new:
 *   post:
 *    summary: create new category.
 *    tags:
 *      -  Category
 *    requestBody:
 *     content:
 *      application/x-www-form-urlencoded:
 *       schema:
 *        $ref: "./#/components/schemas/createCategorySchema"
 *      application/json:
 *       schema:
 *        $ref: "./#/components/schemas/createCategorySchema"
 *    responses:
 *     200:
 *      description: success
 */
