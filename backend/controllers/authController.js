const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const JWT_SECRET = 'graviti'; 

//User Registration
exports.register = async (req, res) => {
    const { username, password, isAdmin } = req.body;
    console.log('Request Body:', req.body);
    try {
        //User already registered
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        //If user doesn't exist
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword,isAdmin });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// User Login
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        //Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        //Password matching
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        //Token Generation 
        const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '12h' });
        res.json({ token, isAdmin: user.isAdmin });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
