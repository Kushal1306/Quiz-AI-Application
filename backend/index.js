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
// const corsOptions = {
//     origin: ['http://localhost:5173', 'https://www.quizai.tech'], // Add your frontend domain
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     optionsSuccessStatus: 200
//   };
  
// app.use(cors(corsOptions));
  
//   // Handle OPTIONS requests
// app.options('*', cors(corsOptions));
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