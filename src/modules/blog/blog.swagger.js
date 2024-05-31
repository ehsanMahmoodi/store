/**
 * @swagger
 *  components:
 *   schemas:
 *    createBlogSchema:
 *     type: object
 *     required:
 *        -   category_id
 *        -   title
 *        -   description
 *        -   body
 *     properties:
 *      category_id:
 *       type: string
 *       description: category id reference
 *      image:
 *       type: file
 *       format: binary
 *       description: blog image
 *      title:
 *       type: string
 *       description: blog title
 *      description:
 *       type: string
 *       description: blog description
 *      body:
 *       type: string
 *       description: blog content
 */

/**
 * @swagger
 *  /blog/new:
 *   post:
 *    summary: create new blog.
 *    tags:
 *      -  Blog
 *    requestBody:
 *     content:
 *      multipart/form-data:
 *       schema:
 *        $ref: "./#/components/schemas/createBlogSchema"
 *    responses:
 *     200:
 *      description: success
 */
/**
 * @swagger
 *  /blog/get:
 *   get:
 *    summary: get blogs.
 *    tags:
 *      -  Blog
 *    parameters:
 *         -    in: query
 *              name: search
 *              type: string
 *              required: false
 *              description: find blog
 *    responses:
 *     200:
 *      description: success
 */
