const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    console.log('Token:', token); // Log the token for debugging
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }

    try {
        const verified = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        console.log('Verified Token:', verified); // Log the verified token for debugging
        req.user = verified;
        req.user.userId = verified.userId;
        console.log('Converted User ID:', req.user.userId);
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = authMiddleware;
