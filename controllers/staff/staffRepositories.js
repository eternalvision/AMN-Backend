const { Staff } = require("../../models");

const projection = { _id: 0, createdAt: 0, updatedAt: 0 };

const handleDatabaseOperation = async (operation) => {
    try {
        return await operation();
    } catch (error) {
        throw error;
    }
};

const StaffRepositories = {
    createStaff: async (req) => {
        return handleDatabaseOperation(async () => {
            return await Staff.create({
                ...req.body,
            });
        });
    },
    findAllStaffs: async () => {
        return handleDatabaseOperation(async () => {
            return await Staff.find({}, projection);
        });
    },
    findStaffByWorkerId: async (workerId) => {
        return handleDatabaseOperation(async () => {
            return await Staff.findOne({ workerId }, projection);
        });
    },
    findOneStaffAndUpdate: async (workerId, req) => {
        return handleDatabaseOperation(async () => {
            return await Staff.findOneAndUpdate(
                { workerId },
                { ...req.body },
                { new: true }
            );
        });
    },
    findOneStaffAndPatch: async (workerId, req) => {
        return handleDatabaseOperation(async () => {
            return await Staff.findOneAndUpdate(
                { workerId },
                { ...req.body },
                {
                    new: true,
                    upsert: true,
                }
            );
        });
    },
    deleteStaffInfo: async (workerId) => {
        return handleDatabaseOperation(async () => {
            Staff.findOneAndDelete({ workerId });
        });
    },
};

module.exports = {
    StaffRepositories,
};
