import express from 'express';
import UserRouter from "./userRoute.js";
import questionRouter from "./questionRoute.js";
import quizRouter from "./quizRoute.js";

const mainRouter=express.Router();

mainRouter.use("/user",UserRouter);
mainRouter.use("/quiz",quizRouter);
mainRouter.use("/question",questionRouter);



export default mainRouter;