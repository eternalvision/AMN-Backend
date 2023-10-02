const {
    StaffRepositories: {
        createStaff,
        findAllStaffs,
        findStaffByWorkerId,
        findOneStaffAndUpdate,
        deleteStaffInfo,
    },
} = require("./staffRepositories");

module.exports = (io) => {
    io.on("connection", (socket) => {
        socket.on("addStaff", async (data) => {
            const { workerId } = data;
            const getStaffByWorkerId = await findStaffByWorkerId(workerId);
            if (!getStaffByWorkerId) {
                const result = await createStaff(data);
                if (result) {
                    return socket.emit("staffAdded", result);
                } else {
                    return socket.emit("error", {
                        code: 409,
                        processResponse: "Conflict",
                    });
                }
            } else {
                return socket.emit("error", {
                    code: 409,
                    processResponse: "StaffIdUsed",
                });
            }
        });
        socket.on("getStaffWithId", async (workerId) => {
            const data = await findStaffByWorkerId(workerId);
            if (data) {
                return socket.emit("staffWithId", data);
            } else {
                return socket.emit("error", {
                    code: 409,
                    processResponse: "Conflict",
                });
            }
        });
        socket.on("getStaff", async () => {
            const data = await findAllStaffs();
            if (data) {
                return socket.emit("allStaff", data);
            } else {
                return socket.emit("error", {
                    code: 409,
                    processResponse: "Conflict",
                });
            }
        });
        socket.on("editStaff", async (data) => {
            const result = await findOneStaffAndUpdate(data.workerId, data);
            if (result) {
                return socket.emit("staffEdited", result);
            } else {
                return socket.emit("error", {
                    code: 409,
                    processResponse: "Conflict",
                });
            }
        });
        socket.on("deleteStaff", async (workerId) => {
            const result = await deleteStaffInfo(workerId);
            if (result) {
                return socket.emit("staffDeleted", { success: true });
            } else {
                return socket.emit("error", {
                    code: 409,
                    processResponse: "Conflict",
                });
            }
        });
    });
};
