const {
    HttpCode: {
        OK,
        CREATED,
        UNAUTHORIZED,
        NOT_FOUND_MESSAGE,
        CONFLICT,
        BAD_REQUEST,
    },
    Messages: {
        AGAIN,
        LOGIN_EMAIL_WRONG,
        LOGIN_EMAIL_USED,
        BAD_DATA_REQUEST,
        NOT_FOUND,
        CHANGE_PASS,
        CHANGE_USER_PROFILE,
        DELETE_PROFILE,
        STAFF_ID_USED,
    },
    Statuses: { ERROR, SUCCESS },
    Operations: { REGISTERED, LOGIN, LOGOUT },
    Processes: { GET, PUT, POST, DELETE },
    ServerStatuses: {
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
    },
} = require("./helpers");

const responseMap = {
    200: {
        Success: (options) => Success(options.res, OK, SUCCESS, options.data),
        Delete: (options) => Delete(options.res, OK, SUCCESS, DELETE),
        Login: (options) =>
            Login(options.res, OK, SUCCESS, LOGIN, options.data),
        Receipt: (options) =>
            Receipt(options.res, OK, SUCCESS, GET, options.data),
        ProfileUpdate: (options) =>
            ProfileUpdate(
                options.res,
                OK,
                SUCCESS,
                CHANGE_USER_PROFILE,
                options.req
            ),
        PasswordUpdate: (options) =>
            PasswordUpdate(options.res, OK, SUCCESS, CHANGE_PASS),
        ProfileDelete: (options) =>
            ProfileDelete(options.res, OK, SUCCESS, DELETE_PROFILE),
        Logout: (options) => Logout(options.res, OK, SUCCESS, LOGOUT),
    },
    201: {
        Created: (options) =>
            Created(options.res, CREATED, SUCCESS, POST, options.req),
        Register: (options) =>
            Register(
                options.res,
                CREATED,
                SUCCESS,
                REGISTERED,
                options.token,
                options.req
            ),
        Update: (options) => Update(options.res, OK, SUCCESS, PUT, options.req),
    },
    400: {
        BadRequest: (options) =>
            BadRequest(
                options.res,
                BAD_REQUEST,
                ERROR,
                BAD_DATA_REQUEST,
                options.error
            ),
    },
    401: {
        Unauthorized: (options) =>
            Unauthorized(options.res, UNAUTHORIZED, ERROR, LOGIN_EMAIL_WRONG),
    },
    404: {
        NotFound: (options) =>
            NotFound(options.res, NOT_FOUND, ERROR, NOT_FOUND_MESSAGE),
    },
    409: {
        Conflict: (options) => Conflict(options.res, CONFLICT, ERROR, AGAIN),
        LoginEmailUsed: (options) =>
            LoginEmailUsed(options.res, CONFLICT, ERROR, LOGIN_EMAIL_USED),
        StaffIdUsed: (options) =>
            LoginEmailUsed(options.res, CONFLICT, ERROR, STAFF_ID_USED),
    },
};
const SendDataResponse = (options) => {
    const responseFunc =
        responseMap[options.code] &&
        responseMap[options.code][options.processResponse];
    if (responseFunc) {
        return responseFunc(options);
    }
};

module.exports = { SendDataResponse };
