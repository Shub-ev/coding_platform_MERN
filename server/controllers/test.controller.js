const { TestModel, TestResultModel } = require('../models');
const bcrypt = require('bcrypt');

const createTest = async (req, res) => {
    const { email, testTitle, testPass, testQuestions, private } = await req.body;

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
            testQuestions,
            private
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
    const { script, email, testTitle, questionIndex } = req.body;

    try {
        const index = parseInt(questionIndex);

        const test = await TestModel.findOne({ testTitle });
        if (!test) {
            return res.status(400).json({
                success: false,
                message: "Test not found!",
            });
        }

        const jdoodleResponse = await fetch('https://api.jdoodle.com/v1/execute', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                clientId: "668fac826c290d705dd4da9a37b58679",
                clientSecret: "71b42e369f89cb6860a57f6f4ca6eae281d96bae389765c0354df125c3c22c51",
                script,
                stdin: "",
                language: "cpp",
                versionIndex: "3",
                compileOnly: false,
            })
        });

        const jdoodleData = await jdoodleResponse.json();
        console.log(jdoodleData);
        const { output, error } = jdoodleData;

        if (error) {
            return res.status(400).json({
                success: false,
                message: "Compilation Error: " + error,
            });
        }

        const correctAnswer = test.testQuestions[index].answer.trim();
        const isAnswerCorrect = output.trim() === correctAnswer;

        await TestResultModel.updateOne(
            { testTitle },
            {
                $addToSet: { attempted: email },
                ...(isAnswerCorrect
                    ? {
                        $addToSet: { correctResults: email },
                        $pull: { incorrectResult: email },
                    }
                    : {
                        $addToSet: { incorrectResult: email },
                        $pull: { correctResults: email },
                    })
            }
        );

        return res.status(200).json({
            success: isAnswerCorrect,
            message: isAnswerCorrect
                ? "Answer is correct! Test marked as successful."
                : "Answer is incorrect! Test marked as unsuccessful.",
        });
    } catch (error) {
        console.error('Error during test check:', error.message);

        return res.status(500).json({
            success: false,
            message: 'An error occurred while checking the test.',
            error: error.message,
        });
    }
};


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

const checkPassword = async (req, res) => {
    const { testTitle, password } = req.body;

    try {
        const test = await TestModel.findOne({ testTitle });

        if (!test) {
            return res.status(404).json({
                success: false,
                message: 'Test not found.',
            });
        }

        console.log(test);

        const match = await bcrypt.compare(password, test.testPassword);
        if (!match) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect password.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Password verified successfully.',
            test: {
                testTitle: test.testTitle,
                isPrivate: test.private,
                questions: test.questions,
            },
        });
    } catch (error) {
        console.error('Error checking password:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while checking the password.',
            error: error.message,
        });
    }
};


module.exports = {
    createTest,
    checkTest,
    getTests,
    checkPassword,
}