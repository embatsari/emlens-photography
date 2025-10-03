const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');
require('dotenv').config();

const createAdmin = async () => {
    await connectDB();
    const username = 'admin';
    const password = 'admin123'; // Change this in production!
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();
    console.log('Admin created');
    mongoose.connection.close();
};

createAdmin();