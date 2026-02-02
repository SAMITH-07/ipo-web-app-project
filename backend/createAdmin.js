const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function createAdmin() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const name = process.env.ADMIN_NAME || 'Administrator';

    if (!email || !password) {
        console.error('Please set ADMIN_EMAIL and ADMIN_PASSWORD in .env');
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        let user = await User.findOne({ email });
        if (user) {
            console.log('Admin user already exists.');
            process.exit(0);
        }

        user = new User({ name, email, password, role: 'manager' });
        await user.save();
        console.log('Admin (manager) user created:', email);
        process.exit(0);
    } catch (err) {
        console.error('Error creating admin:', err);
        process.exit(1);
    }
}

createAdmin();
