const sendErrorResponse = async (
    res,
    error,
    message = "Něco se pokazilo. Prosím zkuste to znovu později."
) => {
    try {
        return res.status(500).json({
            code: 500,
            status: "Chyba",
            message,
            error,
        });
    } catch (err) {
        console.log(err);
    }
};

const Success = async (res, code, status, data) => {
    try {
        return res.status(code).json({
            code,
            status,
            data,
        });
    } catch (error) {
        return sendErrorResponse(res, error);
    }
};

const Receipt = async (res, code, status, message, data) => {
    try {
        return res.status(code).json({
            code,
            status,
            message,
            data,
        });
    } catch (error) {
        return sendErrorResponse(res, error);
    }
};

const Created = async (res, code, status, message, req) => {
    try {
        return res.status(code).json({
            code,
            status,
            message,
            data: {
                ...req.body,
            },
        });
    } catch (error) {
        return sendErrorResponse(res, error);
    }
};

const Login = async (res, code, status, message, data) => {
    try {
        return res.status(code).json({
            code,
            status,
            message,
            data,
        });
    } catch (error) {
        return sendErrorResponse(res, error);
    }
};

const Logout = async (res, code, status, message) => {
    try {
        return res.status(code).json({
            code,
            status,
            message,
        });
    } catch (error) {
        return sendErrorResponse(res, error);
    }
};

const Register = async (res, code, status, message, token, req) => {
    try {
        return res.status(code).json({
            code,
            status,
            message,
            data: {
                token,
                ...req.body,
            },
        });
    } catch (error) {
        return sendErrorResponse(res, error);
    }
};

const Update = async (res, code, status, message, req) => {
    try {
        return res.status(code).json({
            code,
            status,
            message,
            data: {
                ...req.body,
            },
        });
    } catch (error) {
        return sendErrorResponse(res, error);
    }
};

const ProfileUpdate = async (res, code, status, message, req) => {
    try {
        return res.status(code).json({
            code,
            status,
            message,
            data: {
                ...req.body,
            },
        });
    } catch (error) {
        return sendErrorResponse(res, error);
    }
};

const ProfileDelete = (res, code, status, message) => {
    return res.status(code).json({
        code,
        status,
        message,
    });
};

const PasswordUpdate = async (res, code, status, message) => {
    try {
        return res.status(code).json({
            code,
            status,
            message,
        });
    } catch (error) {
        return sendErrorResponse(res, error);
    }
};

const Delete = async (res, code, status, message) => {
    try {
        return res.status(code).json({
            code,
            status,
            message,
        });
    } catch (error) {
        return sendErrorResponse(res, error);
    }
};

const Conflict = async (res, code, status, message) => {
    try {
        return res.status(code).json({
            code,
            status,
            message,
        });
    } catch (error) {
        return sendErrorResponse(res, error);
    }
};

const LoginEmailUsed = async (res, code, status, message) => {
    try {
        return res.status(code).json({
            code,
            status,
            message,
        });
    } catch (error) {
        return sendErrorResponse(res, error);
    }
};

const NotFound = async (res, code, status, message) => {
    try {
        return res.status(code).json({
            code,
            status,
            message,
        });
    } catch (error) {
        return sendErrorResponse(res, error);
    }
};

const Unauthorized = async (res, code, status, message) => {
    try {
        return res.status(code).json({
            code,
            status,
            message,
        });
    } catch (error) {
        return sendErrorResponse(res, error);
    }
};

const BadRequest = async (res, code, status, message, error) => {
    try {
        return res.status(code).json({
            code,
            status,
            message,
            error,
        });
    } catch (error) {
        return sendErrorResponse(res, error);
    }
};

const ServerStatuses = {
    Success,
    Receipt,
    Created,
    Login,
    Logout,
    Register,
    Update,
    ProfileUpdate,
    ProfileDelete,
    PasswordUpdate,
    Delete,
    Conflict,
    LoginEmailUsed,
    NotFound,
    Unauthorized,
    BadRequest,
};

module.exports = {
    ServerStatuses,
};
