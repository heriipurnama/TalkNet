const express = require('express');
const { sendMessage, viewMessages } = require('../controllers/chatController');
const router = express.Router();

/**
 * @swagger
 * /api/sendMessage:
 *   post:
 *     summary: Send a message
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               to:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       400:
 *         description: Bad request
 */
router.post('/sendMessage', sendMessage);

/**
 * @swagger
 * /api/viewMessages:
 *   get:
 *     summary: View messages
 *     tags: [Chat]
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 *       404:
 *         description: No messages found
 */
router.get('/viewMessages', viewMessages);

module.exports = router;
