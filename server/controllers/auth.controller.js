const { UserModel } = require('../models/')
const bcrypt = require('bcrypt')    // encrypting the password before storing

const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const isPresent = await UserModel.findOne({ "email": email });
        console.log(isPresent);

        if (isPresent) {
            return res.status(400).json({ 
                success: false,
                message: "Email already exists" 
            });
        }

        // hashing the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({ email, password: hashedPassword });
        await user.save();

        res.status(201).json({
            success: true,
            message: 'User Created Successfully!',
            user: user.email,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error creating user',
            error: error
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist!" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Invalid Password!" });
        }

        res.status(200).json({
            success: true,
            message: "Login Successful!",
            user: user.email,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error logging in user',
        });
    }
}



module.exports = {
    createUser,
    loginUser,
}