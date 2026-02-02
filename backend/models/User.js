const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: function() {
            // Password is not required for Google OAuth users
            return !this.googleId;
        }
    },
    role: {
        type: String,
        enum: ['investor', 'admin', 'manager'],
        default: 'investor'
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true // Allows multiple null values
    },
    picture: {
        type: String,
        default: null
    },
    portfolio: {
        totalInvested: {
            type: Number,
            default: 0
        },
        currentValue: {
            type: Number,
            default: 0
        },
        holdings: [
            {
                ipoId: mongoose.Schema.Types.ObjectId,
                quantity: Number,
                investmentAmount: Number,
                currentValue: Number
            }
        ]
    },
    watchlist: [mongoose.Schema.Types.ObjectId],
    subscriptions: [
        {
            ipoId: mongoose.Schema.Types.ObjectId,
            appliedAmount: Number,
            appliedDate: Date,
            status: {
                type: String,
                enum: ['pending', 'allotted', 'rejected'],
                default: 'pending'
            },
            allottedQuantity: Number
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
