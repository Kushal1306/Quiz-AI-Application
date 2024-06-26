import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from 'cors';
import connectToDB from "./config/db.js";
import UserRouter from "./routes/userRoute.js";

dotenv.config();

const app = express();
const port=process.env.port||3000;

app.use(express.json());
app.use(cors());

app.use("/launch",UserRouter);

connectToDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Listening on PORT ${port}`);
        });
    }).catch((error) => {
        console.error('Error connecting to database:', error);
        process.exit(1);
    });

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});