const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: "Get the logged-in user's profile"
 *     description: "Fetch the profile information of the logged-in user (authenticated route)."
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: "User profile found"
 *       400:
 *         description: "Invalid user ID"
 *       404:
 *         description: "User not found"
 *       500:
 *         description: "Internal server error"
 */
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Şifreyi göndermiyoruz
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


/**
 * @swagger
 * /users:
 *   get:
 *     summary: "Get all users"
 *     description: "Fetch a list of all users."
 *     responses:
 *       200:
 *         description: "A list of users"
 *       500:
 *         description: "Internal server error"
 */
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: "Add a new user"
 *     description: "Create a new user with the given details."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       201:
 *         description: "User created successfully"
 *       400:
 *         description: "Bad request"
 */
router.post('/', async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const newUser = new User({ name, email, age });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: "Get a user by ID"
 *     description: "Fetch a specific user using their ID."
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         description: "User's ID"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "User found"
 *       404:
 *         description: "User not found"
 */
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: "Update a user"
 *     description: "Update the details of a specific user."
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         description: "User's ID"
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: "User updated successfully"
 *       404:
 *         description: "User not found"
 *       400:
 *         description: "Bad request"
 */
router.put('/:id', async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { name, email, age }, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: "Delete a user"
 *     description: "Delete a specific user by ID."
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         description: "User's ID"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "User deleted successfully"
 *       404:
 *         description: "User not found"
 */
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;
