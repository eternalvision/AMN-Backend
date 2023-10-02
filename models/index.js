const {
    Auth,
    joiSignUpSchema,
    joiLogInSchema,
    joiUpdateSchema,
    joiUpdatePasswordSchema,
} = require("./authentications");

const { Staff, joiStaffSchema, joiStaffEditSchema } = require("./staffs");

module.exports = {
    Auth,
    joiSignUpSchema,
    joiLogInSchema,
    joiUpdateSchema,
    joiUpdatePasswordSchema,
    Staff,
    joiStaffSchema,
    joiStaffEditSchema,
};
