const mongoose = require('/server/services/mongoose.js');

const userSchema = new mongoose.Schema({
    name: { type: String,
            required: true },
    password: { type: String,
                required: true},
    email: { type: String,
            required: true },
    userType: { type: String,
                required: true,
                enum: ['admin', 'user'],
                default: 'user' },
    profilePicture: { data: Buffer,
                    contentType: String,
                    required: false },
    }, { timestamps: true }, {discriminatorKey: 'userType'});

const adminSchema = new mongoose.Schema({
    admin: { type: mongoose.Schema.Types.ObjectId,
            ref: 'User' },
    }, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Admin = User.discriminator('admin', adminSchema);

module.exports = { User, Admin };

