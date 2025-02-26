const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NeuroStack Task Management System API",
      version: "1.0.0",
      description: "API documentation for the NeuroStack task management system",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(options);
module.exports = swaggerDocs;

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         assignedTo:
 *           type: string
 *         status:
 *           type: string
 *           enum: [Pending, In Progress, Completed]
 *         deadline:
 *           type: string
 *           format: date
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         taskId:
 *           type: string
 *         userId:
 *           type: string
 *         comment:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */
