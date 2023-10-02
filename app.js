const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { HttpCode } = require("./helpers");
require("dotenv").config();

const authRouter = require("./routes/api/auth");
const staffRouter = require("./routes/api/staff");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/staff", staffRouter);

app.use((req, res) => {
    res.status(HttpCode.NOT_FOUND).json({
        code: HttpCode.NOT_FOUND,
        message: "Not found",
    });
    res.status(HttpCode.BAD_REQUEST).json({
        code: HttpCode.BAD_REQUEST,
        message: "Bad request",
    });
});

app.use((err, req, res, next) => {
    const {
        status = HttpCode.INTERNAL_SERVER_ERROR,
        message = "Server error",
    } = err;
    res.status(status).json({ message });
});

module.exports = app;
