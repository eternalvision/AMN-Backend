const { SendDataResponse } = require("../../sendDataResponse");
const {
    StaffRepositories: {
        createStaff,
        findAllStaffs,
        findStaffByWorkerId,
        findOneStaffAndUpdate,
        findOneStaffAndPatch,
        deleteStaffInfo,
    },
} = require("./staffRepositories");

const addStaff = async (req, res, next) => {
    try {
        const { workerId } = req.body;
        const getStaffByWorkerId = await findStaffByWorkerId(workerId);
        if (!getStaffByWorkerId) {
            const data = await createStaff(req);
            if (data) {
                return SendDataResponse({
                    res: res,
                    code: 201,
                    processResponse: "Created",
                    req: req,
                });
            } else {
                return SendDataResponse({
                    res: res,
                    code: 409,
                    processResponse: "Conflict",
                });
            }
        } else {
            return SendDataResponse({
                res: res,
                code: 409,
                processResponse: "StaffIdUsed",
            });
        }
    } catch (error) {
        return next(error);
    }
};

const getStaffWithId = async (req, res, next) => {
    try {
        const data = await findStaffByWorkerId(req.params.workerId);
        if (data) {
            return SendDataResponse({
                res: res,
                code: 200,
                processResponse: "Success",
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

const getStaff = async (req, res, next) => {
    try {
        const data = await findAllStaffs();

        if (data) {
            return SendDataResponse({
                res: res,
                code: 200,
                processResponse: "Success",
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

const editStaff = async (req, res, next) => {
    try {
        const data = await findOneStaffAndUpdate(req.params.workerId, req);
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

const patchStaff = async (req, res, next) => {
    try {
        const data = await findOneStaffAndPatch(req.params.workerId, req);
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
                processResponse: "Updated",
                data: data,
            });
        }
    } catch (error) {
        next(error);
    }
};

const deleteStaff = async (req, res, next) => {
    try {
        const data = await deleteStaffInfo(req.params.workerId);
        if (data) {
            return SendDataResponse({
                res: res,
                code: 200,
                processResponse: "Delete",
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

module.exports = {
    addStaff,
    editStaff,
    patchStaff,
    deleteStaff,
    getStaff,
    getStaffWithId,
};
