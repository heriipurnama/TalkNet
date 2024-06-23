const express = require('express');
const { createProfile, getProfile, updateProfile } = require('../controllers/profileController');
const router = express.Router();

/**
 * @swagger
 * /api/createProfile:
 *   post:
 *     summary: Create a new profile
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               horoscope:
 *                 type: string
 *               zodiac:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       201:
 *         description: Profile created successfully
 *       400:
 *         description: Bad request
 */
router.post('/createProfile', createProfile);

/**
 * @swagger
 * /api/getProfile:
 *   get:
 *     summary: Get user profile
 *     tags: [Profile]
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       404:
 *         description: Profile not found
 */
router.get('/getProfile', getProfile);

/**
 * @swagger
 * /api/updateProfile:
 *   put:
 *     summary: Update user profile
 *     tags: [Profile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               horoscope:
 *                 type: string
 *               zodiac:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Bad request
 */
router.put('/updateProfile', updateProfile);

module.exports = router;
