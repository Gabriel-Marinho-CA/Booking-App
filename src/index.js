import express from "express";
import startConnectionDb from "./db/db.js";
import router from "./routes/routes.js";
// import { syncModels } from "./db/syncModels.js";

// ------------------------ //

export const app = express();
app.use(express.json());

// START DB
// startConnectionDb();

// SYNC MODELS
// syncModels();

// LOAD ROUTES
app.use("/api/",router);



app.listen(8800, function () {
    console.log("Connected backend!!");
})