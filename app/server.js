const mongoose = require("mongoose");
const app = require("../app");
const { UserRepositories } = require("../controllers/auth/userRepositories");
const adminData = require("./adminData.json");

const { PORT = 1594, DB_HOST } = process.env;
// const { DB_HOST } = process.env;
// const DB_HOST = process.env.MONGODB_URI;
// const client = new MongoClient(process.env["ATLAS_URI"]);

mongoose
    .connect(DB_HOST)
    .then(async () => {
        try {
            const users = await UserRepositories.findAllUsers();
            if (users.length === 0) {
                console.log("No users found, creating admin...");
                await UserRepositories.createUser(
                    adminData,
                    adminData.password
                );
                console.log(
                    `Admin created, login: ${adminData.username}, password: ${adminData.password}`
                );
            }
        } catch (error) {
            throw new Error(error);
        }

        console.log(`Server running on port ${PORT}`);
        app.listen(PORT);
    })
    .catch((error) => {
        console.log(error.message);
        process.exit(1);
    });
