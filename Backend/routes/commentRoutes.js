const express = require("express");
const { createComment, getComments } = require("../controllers/commentController");

const router = express.Router();

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create a new comment for a task
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *               userId:
 *                 type: string
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       500:
 *         description: Error creating comment
 */
router.post("/", createComment);

/**
 * @swagger
 * /api/comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: List of all comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               
 *       500:
 *         description: Error fetching comments
 */
router.get("/", getComments);

module.exports = router;
