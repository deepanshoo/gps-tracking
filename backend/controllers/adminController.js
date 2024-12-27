const User = require('../model/User');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'graviti');
        if (!decoded.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};