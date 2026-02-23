const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function createDemoUser() {
    const email = 'user@ipo.com';
    const password = 'user123';
    const name = 'Demo User';

    try {
        const mongoUri = 'mongodb://localhost:27017/ipo_db';
        await mongoose.connect(mongoUri);
        
        let user = await User.findOne({ email });
        if (user) {
            console.log('Demo user already exists.');
            process.exit(0);
        }

        user = new User({ name, email, password, role: 'investor' });
        await user.save();
        console.log('Demo user created:', email);
        process.exit(0);
    } catch (err) {
        console.error('Error creating demo user:', err);
        process.exit(1);
    }
}

createDemoUser();
