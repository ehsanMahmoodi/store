/**
 * @swagger
 *  components:
 *   schemas:
 *    createProductSchema:
 *     type: object
 *     required:
 *        -   category_id
 *        -   seller_id
 *        -   name
 *        -   description
 *        -   price
 *        -   images
 *     properties:
 *      category_id:
 *       type: string
 *       description: category id reference
 *      seller_id:
 *       type: string
 *       description: seller id reference
 *      images:
 *       type: array
 *       description: product images
 *       items:
 *        type: string
 *        format: binary
 *      name:
 *       type: string
 *       description: product name
 *      description:
 *       type: string
 *       description: product description
 *      price:
 *       type: number
 *       description: product price
 *      discount_code:
 *       type: string
 *       description: product discount code
 *      discount_percentage:
 *       type: number
 *       description: product discount percentage
 *      stock:
 *       type: number
 *       description: product stock
 *       example: 1 or 2 or ....
 *      status:
 *       type: string
 *       description: product price
 *       enum:
 *        - available
 *        - out of stock
 *        - pre-order
 *      tags:
 *       type: array
 *       description: product tags
 *       example: #product1,#product2 or product1,product2
 *      type:
 *       type: string
 *       description: product type
 *       enum:
 *         -  physical
 *         -  virtual
 */

/**
 * @swagger
 *  /product/create:
 *   post:
 *    summary: create new product.
 *    tags:
 *      -  Product
 *    requestBody:
 *     content:
 *      multipart/form-data:
 *       schema:
 *        $ref: "./#/components/schemas/createProductSchema"
 *    responses:
 *     200:
 *      description: success
 */
