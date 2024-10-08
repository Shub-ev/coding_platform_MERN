const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth.route');
const { connectMongoose } = require('./config/db');

dotenv.config();

const PORT = process.env.PORT;

// creating express app
const app = express();

connectMongoose();

// install cors over app
app.use(cors());
app.use(express.json());

// in express app .on is event listener as express extends EventEmitter class
app.use('/user/coding_platform/', authRoute);

app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
})