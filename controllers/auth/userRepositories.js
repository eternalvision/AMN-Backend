const { Auth } = require("../../models");
// const projection = { _id: 0, token: 0, password: 0 };

const handleDatabaseOperation = async (operation) => {
    try {
        return await operation();
    } catch (error) {
        throw error;
    }
};

const UserRepositories = {
    createUser: async (userInfo, password) => {
        return handleDatabaseOperation(async () => {
            const user = new Auth(userInfo);
            user.setPassword(password);
            return await user.save();
        });
    },
    findUserById: async (_id) => {
        return handleDatabaseOperation(async () => Auth.findById({ _id }));
    },
    findAllUsers: async () => {
        return handleDatabaseOperation(async () => Auth.find({}));
    },
    findByEmail: async (email) => {
        return handleDatabaseOperation(async () => Auth.findOne({ email }));
    },
    findByUsername: async (username) => {
        return handleDatabaseOperation(async () => Auth.findOne({ username }));
    },
    findByPhoneNumber: async (phoneNumber) => {
        return handleDatabaseOperation(async () =>
            Auth.findOne({ phoneNumber })
        );
    },
    findByWorkerId: async (workerId) => {
        return handleDatabaseOperation(async () => Auth.findOne({ workerId }));
    },
    findOneAndUpdate: async (req, workerId) => {
        return handleDatabaseOperation(async () =>
            Auth.findOneAndUpdate({ workerId }, { ...req.body }, { new: true })
        );
    },
    updatePassword: async (workerId, password) => {
        return handleDatabaseOperation(async () => {
            const user = await Auth.findOne({ workerId });
            user.setPassword(password);
            return await user.save();
        });
    },
    updateToken: async (id, token) => {
        return handleDatabaseOperation(async () =>
            Auth.updateOne({ _id: id }, { token }, { new: true })
        );
    },
    deleteUserInfo: async (workerId) => {
        return handleDatabaseOperation(async () =>
            Auth.findOneAndDelete({ workerId })
        );
    },
};

module.exports = {
    UserRepositories,
};
