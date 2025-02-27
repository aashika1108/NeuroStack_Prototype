const express = require("express");
const { createComment, getComments } = require("../controllers/commentController");
const authorizeUser = require("../middleware/authorizeUser");
const router = express.Router();

// /**
//  * @swagger
//  * /api/comments:
//  *   post:
//  *     summary: Create a new comment for a task
//  *     tags: [Comments]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               taskId:
//  *                 type: string
//  *               userId:
//  *                 type: string
//  *               comment:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Comment created successfully
//  *       500:
//  *         description: Error creating comment
//  */
// router.post("/", createComment);

// /**
//  * @swagger
//  * /api/comments:
//  *   get:
//  *     summary: Get all comments
//  *     tags: [Comments]
//  *     responses:
//  *       200:
//  *         description: List of all comments
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               
//  *       500:
//  *         description: Error fetching comments
//  */
// router.get("/", getComments);

/**
 * @swagger
 * /api/tasks/{id}/comments:
 *   post:
 *     summary: Create a comment for a task
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []  # Authentication needed
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added
 *       500:
 *         description: Error adding comment
 */
router.post("/:id/comments", authorizeUser, createComment);

/**
 * @swagger
 * /api/tasks/{id}/comments:
 *   get:
 *     summary: Get all comments for a task
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []  # Authentication needed
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of comments for the task
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Error fetching comments
 */
router.get("/:id/comments", authorizeUser, getComments);

module.exports = router;
