const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function checkUsers() {
    try {
        const mongoUri = 'mongodb://localhost:27017/ipo_db';
        await mongoose.connect(mongoUri);
        
        console.log('Checking users in database...');
        
        const users = await User.find({});
        console.log(`Found ${users.length} users:`);
        
        users.forEach(user => {
            console.log(`- ${user.name} (${user.email}) - Role: ${user.role}`);
        });
        
        // Test admin user
        const admin = await User.findOne({ email: 'admin@ipo.com' });
        if (admin) {
            console.log('\n✅ Admin user found:', admin.email);
            const isValid = await admin.comparePassword('admin123');
            console.log('Password verification:', isValid ? '✅ Valid' : '❌ Invalid');
        } else {
            console.log('\n❌ Admin user not found');
        }
        
        // Test demo user
        const demoUser = await User.findOne({ email: 'user@ipo.com' });
        if (demoUser) {
            console.log('\n✅ Demo user found:', demoUser.email);
            const isValid = await demoUser.comparePassword('user123');
            console.log('Password verification:', isValid ? '✅ Valid' : '❌ Invalid');
        } else {
            console.log('\n❌ Demo user not found');
        }
        
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

checkUsers();
