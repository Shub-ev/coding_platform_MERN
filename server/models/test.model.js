const mongoose = require('mongoose');

const testQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    answer: {
        type: String,
        required: true,
    }
})

const testSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    testTitle: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [2, "Enter valid test Title!"],
    },
    testPassword: {
        type: String,
        required: true,
        minlength: [8, 'Test Password should atleast 8 characters long!'],
    },
    testQuestions: {
        type: [testQuestionSchema],
        required: true,
    },
    private: {
        type: Boolean,
        default: false,
    }
});

const TestModel = mongoose.model('test', testSchema);

module.exports = TestModel;