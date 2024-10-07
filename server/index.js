const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv');
const { userRouter } = require("./routes/user.routes");

dotenv.config();

const PORT = process.env.PORT;

// creating express app
const app = express();

// install cors over app
app.use(cors());
app.use(express.json());

// in express app .on is event listener as express extends EventEmitter class
app.use('/', userRouter);

app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
})