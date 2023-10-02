const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const { Auth } = require("../models/authentications");

const { SECRET_KEY } = process.env;

const isJwtError = (error) =>
    ["JsonWebTokenError", "TokenExpiredError"].includes(error.name);

const auth = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [scheme, token] = authorization.split(" ");

    if (!token || scheme !== "Bearer") {
        return next(new Unauthorized("Neautorizovaný!"));
    }

    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await Auth.findById(id);

        if (!user || !user.token) {
            throw new Unauthorized("Neautorizovaný!");
        }

        req.user = user;
        next();
    } catch (error) {
        if (isJwtError(error)) {
            error = new Unauthorized("Neautorizovaný!");
        }
        next(error);
    }
};

module.exports = auth;
