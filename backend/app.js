require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./model/user'); // Import the User model

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URL;

// MongoDB connection
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Signup API
app.post("/signup", async (req, res) => {
    try {
        const { 
            name, 
            contactNumber, 
            address: { streetName, streetNumber, apartmentName, city, state, postalCode }, 
            gender, 
            role, 
            emailid, 
            password 
        } = req.body;

        if (!name || !contactNumber || !streetName || !streetNumber || !city || !state || !postalCode || !gender || !role || !emailid || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existsUser = await User.findOne({ emailid });
        if (existsUser) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        const newUser = new User({
            name,
            contactNumber,
            address: { streetName, streetNumber, apartmentName, city, state, postalCode },
            gender,
            role,
            emailid,
            password
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Duplicate value detected. Please use a unique email.' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Login API
app.post("/login", async (req, res) => {
    try {
        const { emailid, password } = req.body;

        if (!emailid || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ emailid, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid login credentials' });
        }

        res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get all users API
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
