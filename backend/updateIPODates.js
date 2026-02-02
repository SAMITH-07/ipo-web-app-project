const mongoose = require('mongoose');
const IPO = require('./models/IPO');
require('dotenv').config();

async function updateIPODates() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    const nextMonth = new Date(today);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    // Update open IPOs to have current dates
    await IPO.updateMany(
      { status: 'open' },
      { 
        $set: {
          openDate: today,
          closeDate: nextWeek
        }
      }
    );

    // Update upcoming IPOs to have future dates
    await IPO.updateMany(
      { status: 'upcoming' },
      { 
        $set: {
          openDate: nextWeek,
          closeDate: nextMonth
        }
      }
    );

    console.log('✅ Updated IPO dates to current timeframe');

    // Verify the updates
    const openIPOs = await IPO.find({ status: 'open' }).select('company status openDate closeDate');
    const upcomingIPOs = await IPO.find({ status: 'upcoming' }).select('company status openDate closeDate');

    console.log('\n📊 Updated Open IPOs:');
    openIPOs.forEach((ipo, index) => {
      console.log(`${index + 1}. ${ipo.company} - Open: ${ipo.openDate.toDateString()}, Close: ${ipo.closeDate.toDateString()}`);
    });

    console.log('\n📊 Updated Upcoming IPOs:');
    upcomingIPOs.slice(0, 5).forEach((ipo, index) => {
      console.log(`${index + 1}. ${ipo.company} - Open: ${ipo.openDate.toDateString()}, Close: ${ipo.closeDate.toDateString()}`);
    });

    mongoose.connection.close();
    console.log('\nDatabase connection closed');
  } catch (error) {
    console.error('Error updating IPO dates:', error);
    process.exit(1);
  }
}

updateIPODates();
