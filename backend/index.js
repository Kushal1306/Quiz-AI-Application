import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from 'cors';
import connectToDB from "./config/db.js";
import mainRouter from "./routes/index.js";
// import UserRouter from "./routes/userRoute.js";
// import questionRouter from "./routes/questionRoute.js";
// import quizRouter from "./routes/quizRoute.js";

dotenv.config();

const app = express();
const port=process.env.port||3000;

app.use(express.json());
// app.use(cors());
app.use(
    cors({
      origin: "*",
    })
);


// Handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', allowedOrigins);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});


app.use(mainRouter);

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