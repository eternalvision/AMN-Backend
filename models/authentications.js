const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);
const bcrypt = require("bcryptjs");

const authSchema = Schema(
    {
        username: {
            type: String,
            required: [true, "Uživatelské jméno je povinné!"],
            max: [15, "Maximálně 15 znaky!"],
            min: [5, "Minimální 5 znaky!"],
        },
        name: {
            type: String,
            required: [true, "Jméno je povinné!"],
            max: [20, "Maximálně 20 znaků!"],
            min: [3, "Minimální 3 znaky!"],
        },
        surname: {
            type: String,
            required: [true, "Příjmení je povinné!"],
            max: [20, "Maximálně 20 znaků!"],
            min: [3, "Minimální 3 znaky!"],
        },
        password: {
            type: String,
            required: [true, "Heslo je povinné!"],
            min: [8, "Minimální 8 znaků!"],
        },
        phoneNumber: {
            type: String,
            required: [true, "Telefonní číslo je povinné!"],
            max: [15, "Maximálně 15 znaků!"],
        },
        email: {
            type: String,
            required: [true, "E-mail je povinný!"],
            max: [256, "Maximálně 256 znaků"],
            unique: true,
        },
        token: {
            type: String,
            default: null,
        },
        workerId: {
            type: String,
            default: null,
        },
        linkToPhoto: {
            type: String,
            default:
                "https://i.ibb.co/bRLH3S4/istockphoto-1276619045-612x612.jpg",
        },
        asmisToken: {
            type: String,
            default: process.env.ASMIS_TOKEN,
        },
        theme: {
            type: String,
            default: "light",
        },
        language: {
            type: String,
            default: "cz",
        },
        profileType: {
            type: String,
            default: "user",
        },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

authSchema.methods.setPassword = function (password) {
    return (this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10)));
};

authSchema.methods.comparePassword = function (password) {
    if (!password || !this.password) {
        throw new Error("Neplatné nebo chybějící heslo!");
    }
    return bcrypt.compareSync(password, this.password);
};

const joiSignUpSchema = Joi.object({
    username: Joi.string().min(5).max(15).required(),
    linkToPhoto: Joi.string(),
    theme: Joi.string().valid("light", "dark"),
    language: Joi.string().valid("cz", "en", "ua", "ru"),
    profileType: Joi.string().valid("user", "admin").required(),
    name: Joi.string().min(3).max(20).required(),
    surname: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().max(256).required(),
    phoneNumber: Joi.string().max(15).required(),
    password: joiPassword.string().min(8).required(),
    asmisToken: Joi.string(),
});

const joiLogInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const joiUpdatePasswordSchema = Joi.object({
    password: joiPassword.string().min(8).required(),
});

const joiUpdateSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    surname: Joi.string().min(3).max(20),
    username: Joi.string().min(5).max(15),
    email: Joi.string().email().max(256),
    phoneNumber: Joi.string().max(15),
    linkToPhoto: Joi.string(),
    theme: Joi.string().valid("light", "dark"),
    language: Joi.string().valid("cz", "en", "ua", "ru"),
    profileType: Joi.string().valid("user", "admin"),
});

const joiSearchSchema = Joi.object({
    linkToPhoto: Joi.string(),
    email: Joi.string(),
    firm: Joi.string(),
    name: Joi.string().min(3),
    workingContractType: Joi.string(),
    phoneNumber: Joi.string(),
});

const Auth = model("auth", authSchema);

module.exports = {
    Auth,
    joiSignUpSchema,
    joiLogInSchema,
    joiUpdateSchema,
    joiUpdatePasswordSchema,
    joiSearchSchema,
};
