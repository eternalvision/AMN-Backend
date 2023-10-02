const {
    register,
    login,
    logout,
    deleteUser,
    getCurrent,
    getAnotherUser,
    getAllUsers,
    updateUserFinanceInfo,
    updateUserPassword,
    getAllWithText,
    updateAnotherUserPassword,
    deleteAnotherUser,
} = require("./userControllers");

module.exports = {
    register,
    login,
    logout,
    getCurrent,
    getAnotherUser,
    getAllUsers,
    updateUserFinanceInfo,
    deleteUser,
    updateUserPassword,
    getAllWithText,
    updateAnotherUserPassword,
    deleteAnotherUser,
};