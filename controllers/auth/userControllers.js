const SECRET_KEY = process.env.SECRET_KEY;
const short = require("short-uuid");
const jwt = require("jsonwebtoken");
const { SendDataResponse } = require("../../sendDataResponse");
const {
    UserRepositories: {
        findOneAndUpdate,
        findByWorkerId,
        findAllUsers,
        findByEmail,
        findByPhoneNumber,
        findByUsername,
        createUser,
        deleteUserInfo,
        updatePassword,
        updateToken,
    },
} = require("./userRepositories");

const register = async (req, res, next) => {
    try {
        const workerId = short.generate();
        const { email, phoneNumber, password } = req.body;
        const existingEmail = await findByEmail(email);
        const existingPhoneNumber = await findByPhoneNumber(phoneNumber);
        req.body.workerId = workerId;
        req.body.expiresToken = "3600";
        if (existingEmail || existingPhoneNumber) {
            return SendDataResponse({
                res: res,
                code: 409,
                processResponse: "LoginEmailUsed",
            });
        }
        const newUser = await createUser(req.body, password);
        if (!newUser) {
            return SendDataResponse({
                res: res,
                code: 409,
                processResponse: "Conflict",
            });
        }
        const payload = {
            id: newUser._id,
        };
        const token = jwt.sign(payload, SECRET_KEY, {
            expiresIn: "1d",
        });
        await updateToken(payload.id, token);
        return SendDataResponse({
            res: res,
            code: 201,
            processResponse: "Register",
            token,
            req,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return BadRequest({
                res: res,
                code: 400,
                error: error.message,
            });
        } else if (error.name === "MongoError" && error.code === 11000) {
            return SendDataResponse({
                res: res,
                code: 409,
                processResponse: "LoginEmailUsed",
            });
        } else {
            return next(error);
        }
    }
};

const login = async (req, res, next) => {
    try {
        const user = await findByEmail(req.body.email);
        const isValidPassword = await user.comparePassword(req.body.password);
        if (!user || !isValidPassword) {
            return SendDataResponse({
                res: res,
                code: 401,
                processResponse: "Unauthorized",
            });
        }
        const { name, surname, workerId, phoneNumber, email, username } = user;
        const payload = {
            id: user._id,
        };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
        await updateToken(payload.id, token);

        let data = {
            token,
            workerId: workerId,
            name,
            surname,
            username,
            phoneNumber,
            email,
            expiresToken: "3600",
        };

        if (res.status(200)) {
            return SendDataResponse({
                res: res,
                code: 200,
                processResponse: "Login",
                data: data,
            });
        } else {
            return SendDataResponse({
                res: res,
                code: 409,
                processResponse: "Conflict",
            });
        }
    } catch (error) {
        next(error);
    }
};

const updateUserPassword = async (req, res, next) => {
    try {
        await updatePassword(req.user.workerId, req.body.password);
        await updateToken(req.user._id, null);
        return SendDataResponse({
            res: res,
            code: 200,
            processResponse: "PasswordUpdate",
        });
    } catch (error) {
        next(error);
    }
};

const updateAnotherUserPassword = async (req, res, next) => {
    try {
        const { workerId } = req.params;
        const data = await findByWorkerId(workerId);
        await updatePassword(workerId, req.body.password);
        await updateToken(data, null);
        return SendDataResponse({
            res: res,
            code: 200,
            processResponse: "PasswordUpdate",
        });
    } catch (error) {
        next(error);
    }
};

const updateUserFinanceInfo = async (req, res, next) => {
    try {
        const data = await findOneAndUpdate(req, req.user.workerId);

        if (!data) {
            return SendDataResponse({
                res: res,
                code: 409,
                processResponse: "Conflict",
            });
        } else {
            return SendDataResponse({
                res: res,
                code: 201,
                processResponse: "Update",
                req: req,
            });
        }
    } catch (error) {
        next(error);
    }
};

const getCurrent = async (req, res, next) => {
    try {
        const data = await findByWorkerId(req.user.workerId);

        if (!data) {
            SendDataResponse({
                res: res,
                code: 409,
                processResponse: "Conflict",
            });
        } else {
            SendDataResponse({
                res: res,
                code: 200,
                processResponse: "Receipt",
                data: data,
            });
        }
    } catch (error) {
        next(error);
    }
};

const getAnotherUser = async (req, res, next) => {
    try {
        const data = await findByWorkerId(req.params.workerId);
        if (!data) {
            return SendDataResponse({
                res: res,
                code: 409,
                processResponse: "Conflict",
            });
        } else {
            return SendDataResponse({
                res: res,
                code: 200,
                processResponse: "Success",
                data: data,
            });
        }
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const data = await findAllUsers();
        if (!data) {
            return SendDataResponse({
                res: res,
                code: 409,
                processResponse: "Conflict",
            });
        } else {
            return SendDataResponse({
                res: res,
                code: 200,
                processResponse: "Success",
                data: data,
            });
        }
    } catch (error) {
        next(error);
    }
};

const getUserByUsername = async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await findByUsername(username);

        if (!user) {
            return SendDataResponse({
                res: res,
                code: 404,
                processResponse: "UserNotFound",
            });
        }

        return SendDataResponse({
            res: res,
            code: 200,
            processResponse: "Success",
            data: user,
        });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        const _id = req.user;
        await updateToken(_id, null);
        return res.status(204).json({});
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const user = await deleteUserInfo(req.user.workerId);
        if (!user) {
            return SendDataResponse({
                res: res,
                code: 409,
                processResponse: "Conflict",
            });
        } else {
            return SendDataResponse({
                res: res,
                code: 200,
                processResponse: "ProfileDelete",
            });
        }
    } catch (error) {
        next(error);
    }
};

const deleteAnotherUser = async (req, res, next) => {
    try {
        const user = await deleteUserInfo(req.params.workerId);
        if (!user) {
            return SendDataResponse({
                res: res,
                code: 409,
                processResponse: "Conflict",
            });
        } else {
            return SendDataResponse({
                res: res,
                code: 200,
                processResponse: "ProfileDelete",
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    logout,
    deleteUser,
    getCurrent,
    getAnotherUser,
    getAllUsers,
    updateAnotherUserPassword,
    updateUserPassword,
    updateUserFinanceInfo,
    deleteAnotherUser,
    getUserByUsername,
};
