const mongoose = require('../services/mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String,
            required: true },
    password: { type: String,
                required: true},
    email: {type: String,
            required: true },
    userType: { type: String,
                required: true,
                enum: ['manager', 'visitor'],
                default: 'user' },
    profilePicture: { data: Buffer,
                      contentType: String},
    },
    { timestamps: true },
            {discriminatorKey: 'userType'});

const managerSchema = new mongoose.Schema({
    manager: { type: mongoose.Schema.Types.ObjectId,
            ref: 'User' },
    }, { timestamps: true });

const visitorSchema = new mongoose.Schema({
    visitor: { type: mongoose.Schema.Types.ObjectId,
                ref: 'User' },
    }, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Manager = User.discriminator('manager', managerSchema);
const Visitor = User.discriminator('visitor', visitorSchema);

module.exports = {User, Manager, Visitor};