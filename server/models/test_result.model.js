const mongoose = require('mongoose');
const express = require('express');

const testResultSchema = new mongoose.Schema({
    testTitle: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    correctResults: {
        type: [String],
        default: [],
    },
    incorrectResult: {
        type: [String],
        default: [],
    },
    attempted: {
        type: [String],
        default: [],
    }
});

const TestResultModel = mongoose.model('test_results', testResultSchema);

module.exports = TestResultModel;