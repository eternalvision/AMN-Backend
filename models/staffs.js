const { Schema, model } = require("mongoose");
const Joi = require("joi");

const staffSchema = Schema(
    {
        workerId: {
            type: String,
            required: true,
        },
        gross_wages: {
            type: String,
            default: "",
        },
        total_deductions: {
            type: String,
            default: "",
        },
        compensation: {
            type: String,
            default: "",
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

const joiStaffSchema = Joi.object({
    workerId: Joi.string().required(),
    gross_wages: Joi.string(),
    total_deductions: Joi.string(),
    compensation: Joi.string(),
});

const joiStaffEditSchema = Joi.object({
    gross_wages: Joi.string().allow(""),
    total_deductions: Joi.string().allow(""),
    compensation: Joi.string().allow(""),
});

const Staff = model("staff", staffSchema);

module.exports = {
    Staff,
    joiStaffSchema,
    joiStaffEditSchema,
};
