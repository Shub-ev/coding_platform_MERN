const mongoose = require('mongoose');
const { regex } = require('../validation/');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,       // only marking unique is not sufficient 
        validate: {
            validator: function (v) {
                return regex.emailRegex.test(v);
            },
            message: 'Enter Correct Email!',
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be 8 characters long!"],
        validate: {
            validator: function (v) {
                return regex.passwordRegex.test(v);
            },
            message: 'Password must contain at least one letter, one number, and one special character.',
        },
    },
});

// we have to enforce index to mongo
userSchema.index({ email: 1 }, { unique: true });

const UserModel = mongoose.model('Users', userSchema);

module.exports = UserModel;