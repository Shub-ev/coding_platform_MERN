const { TestModel, TestResultModel } = require('../models');
const bcrypt = require('bcrypt');

const createTest = async (req, res) => {
    const { email, testTitle, testPass, testQuestions } = await req.body;

    try {
        const isPresent = await TestModel.findOne({ testTitle });

        if (isPresent) {
            res.status(409);
            res.end({
                success: false,
                message: "Test Title already exist select another!",
            })
        }

        if (typeof testPass !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Invalid test password format!"
            });
        }

        const hashedPassword = await bcrypt.hash(testPass, 10);

        const test = new TestModel({
            testTitle,
            email,
            testPassword: hashedPassword,
            testQuestions
        });

        const test_results = new TestResultModel({
            testTitle,
        })

        const savedTestResult = await test_results.save();
        const savedTest = await test.save();

        res.status(201).json({
            success: true,
            message: 'Test Created Successfully!',
            testId: savedTest._id,
            testResultId: savedTestResult._id,
        });
    }
    catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: 'An error occurred while creating the test.',
            error: error.message
        });
    }
}

const checkTest = async (req, res) => {
    const { result, email, testTitle, questionIndex } = await req.body;

    try {
        const index = parseInt(questionIndex);

        const test = await TestModel.findOne({ testTitle });

        await TestResultModel.updateOne(
            { testTitle },
            {
                $addToSet: { attempted: email },
            }
        );

        if (!test) {
            return res.status(400).json({
                success: false,
                message: "Test not found!",
            });
        }

        const correctAnswer = test.testQuestions[index].answer;
        const isAnswerCorrect = result === correctAnswer;

        if (isAnswerCorrect) {
            await TestResultModel.updateOne(
                { testTitle },
                {
                    $addToSet: { correctResults: email },
                    $pull: { incorrectResult: email }
                }
            );
        } 
        else {
            await TestResultModel.updateOne(
                { testTitle },
                {
                    $addToSet: { incorrectResult: email },
                    $pull: { correctResults: email }
                }
            );
        }

        return res.status(200).json({
            success: isAnswerCorrect,
            message: isAnswerCorrect ? "Answer is correct! Test marked as successful." : "Answer is incorrect! Test marked as unsuccessful."
        });
    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'An error occurred while checking the test.',
            error: error.message
        });
    }
}

const getTests = async (req, res) => {
    try {
        const tests = await TestModel.find(); // Fetch all tests

        if (!tests.length) {
            return res.status(404).json({
                success: false,
                message: "No tests found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Tests retrieved successfully.",
            tests,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while retrieving tests.',
            error: error.message,
        });
    }
};


module.exports = {
    createTest,
    checkTest,
    getTests,
}