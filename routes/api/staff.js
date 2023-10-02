const express = require("express");

const { ctrlWrapper, validation, auth } = require("../../middlewares");
const { staff: ctrl } = require("../../controllers");
const Schema = require("../../models");

const router = express.Router();

router.post(
    "/create",
    auth,
    validation(Schema.joiStaffSchema, "Zkus to znovu!"),
    ctrlWrapper(ctrl.addStaff)
);

router.get("/", auth, ctrlWrapper(ctrl.getStaff));

router.get("/:workerId", auth, ctrlWrapper(ctrl.getStaffWithId));

router.put(
    "/update/:workerId",
    auth,
    validation(Schema.joiStaffEditSchema, "Zkus to znovu!"),
    ctrlWrapper(ctrl.editStaff)
);

router.patch(
    "/updatePatch/:workerId",
    auth,
    validation(Schema.joiStaffEditSchema, "Zkus to znovu!"),
    ctrlWrapper(ctrl.patchStaff)
);

router.delete("/delete/:workerId", auth, ctrlWrapper(ctrl.deleteStaff));

module.exports = router;
