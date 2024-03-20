import express from "express";
import router from "./routes/routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// ------------------------ //

export const app = express();

app.use(cors())
app.use(cookieParser());
app.use(express.json());


// LOAD ROUTES HERE
app.use("/api", router);

//HANDLE ERROR MIDDLEWARE
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
})

app.listen(8800, function () {
    console.log("Connected backend!!");
})