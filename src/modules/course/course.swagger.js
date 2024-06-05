/**
 * @swagger
 *  components:
 *   schemas:
 *    createCourseSchema:
 *     type: object
 *     required:
 *        -   category_id
 *        -   name
 *        -   description
 *        -   teacher
 *        -   price
 *        -   level
 *        -   format
 *     properties:
 *      category_id:
 *       type: string
 *       description: category id reference
 *      name:
 *       type: string
 *       description: course name
 *      description:
 *       type: string
 *       description: course description
 *      price:
 *       type: number
 *       description: course price
 *      teacher:
 *       type: array
 *       description: teacher id reference
 *       items:
 *        type: string
 *      images:
 *       type: array
 *       description: course images
 *       items:
 *        type: string
 *        format: binary
 *      startDate:
 *       type: string
 *       format: date
 *       description: course start date
 *      endDate:
 *       type: string
 *       format: date
 *       description: course end date
 *      duration:
 *       type: number
 *       description: course duration
 *      level:
 *       type: string
 *       description: course level
 *       enum:
 *         -  مبتدی
 *         -  متوسط
 *         -  پیشرفته
 *      format:
 *       type: string
 *       description: course format
 *       enum:
 *         -  آنلاین
 *         -  حضوری
 *      materials:
 *       type: array
 *       description: course materials
 *       items:
 *        type: string
 *      prerequisites:
 *       type: array
 *       description: course prerequisites
 *       items:
 *        type: string
 *      topics:
 *       type: array
 *       description: course topics
 *       items:
 *        type: string
 *      type:
 *        type: string
 *        description: course type
 *        enum:
 *          -  عادی
 *          -  ویژه
 *      capacity:
 *        type: number
 *        description: course capacity
 *      students:
 *        type: array
 *        description: students id reference
 *        items:
 *         type: string
 *    updateCourseSchema:
 *     type: object
 *     properties:
 *      category_id:
 *       type: string
 *       description: category id reference
 *      name:
 *       type: string
 *       description: course name
 *      description:
 *       type: string
 *       description: course description
 *      price:
 *       type: number
 *       description: course price
 *      teacher:
 *       type: array
 *       description: teacher id reference
 *       items:
 *        type: string
 *      images:
 *       type: array
 *       description: course images
 *       items:
 *        type: string
 *        format: binary
 *      startDate:
 *       type: string
 *       format: date
 *       description: course start date
 *      endDate:
 *       type: string
 *       format: date
 *       description: course end date
 *      duration:
 *       type: number
 *       description: course duration
 *      level:
 *       type: string
 *       description: course level
 *       enum:
 *         -  مبتدی
 *         -  متوسط
 *         -  پیشرفته
 *      format:
 *       type: string
 *       description: course format
 *       enum:
 *         -  آنلاین
 *         -  حضوری
 *      materials:
 *       type: array
 *       description: course materials
 *       items:
 *        type: string
 *      prerequisites:
 *       type: array
 *       description: course prerequisites
 *       items:
 *        type: string
 *      topics:
 *       type: array
 *       description: course topics
 *       items:
 *        type: string
 *      type:
 *        type: string
 *        description: course type
 *        enum:
 *          -  عادی
 *          -  ویژه
 *      capacity:
 *        type: number
 *        description: course capacity
 *      students:
 *        type: array
 *        description: students id reference
 *        items:
 *         type: string
 */

/**
 * @swagger
 *  /course/new:
 *   post:
 *    summary: create new course.
 *    tags:
 *      -  Course
 *    requestBody:
 *     content:
 *      multipart/form-data:
 *       schema:
 *        $ref: "./#/components/schemas/createCourseSchema"
 *    responses:
 *     200:
 *      description: success
 */
/**
 * @swagger
 *  /course/update/{id}:
 *   patch:
 *    summary: update course by id
 *    tags:
 *      -  Course
 *    parameters:
 *        -   in: path
 *            name: id
 *            type: string
 *            required: true
 *            description: course id
 *    requestBody:
 *     content:
 *      multipart/form-data:
 *       schema:
 *        $ref: "./#/components/schemas/updateCourseSchema"
 *    responses:
 *     200:
 *      description: success
 */
