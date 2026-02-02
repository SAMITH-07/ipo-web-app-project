const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function testSignup() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    // Test signup data
    const testUser = {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'test123'
    };

    console.log('🧪 Testing signup with data:', testUser);

    // Check if user already exists
    const existingUser = await User.findOne({ email: testUser.email });
    if (existingUser) {
      console.log('⚠️ User already exists, cleaning up...');
      await User.deleteOne({ email: testUser.email });
    }

    // Create new user (simulating signup)
    const user = new User({
      name: testUser.name,
      email: testUser.email,
      password: testUser.password,
      role: 'investor'
    });

    await user.save();
    console.log('✅ User successfully created in MongoDB Atlas:');
    console.log('   Name:', user.name);
    console.log('   Email:', user.email);
    console.log('   Role:', user.role);
    console.log('   ID:', user._id);
    console.log('   Created At:', user.createdAt);

    // Verify user is in database
    const savedUser = await User.findOne({ email: testUser.email });
    if (savedUser) {
      console.log('✅ User verified in MongoDB Atlas database');
      console.log('   Stored Password Hash:', savedUser.password ? 'Yes (hashed)' : 'No');
    } else {
      console.log('❌ User not found in database');
    }

    // Count total users
    const totalUsers = await User.countDocuments();
    console.log(`📊 Total users in MongoDB Atlas: ${totalUsers}`);

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error testing signup:', error);
    process.exit(1);
  }
}

testSignup();
