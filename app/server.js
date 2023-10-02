const mongoose = require("mongoose");
const app = require("../app");

const { PORT = 1594, DB_HOST } = process.env;
// const { DB_HOST } = process.env;
// const DB_HOST = process.env.MONGODB_URI;
// const client = new MongoClient(process.env["ATLAS_URI"]);

mongoose
    .connect(DB_HOST)
    .then(() => {
        console.log(`${PORT}, connected`);
        app.listen(PORT);
    })
    .catch((error) => {
        console.log(error.message);
        process.exit(1);
    });
