import express from 'express';
import UserRouter from "./userRoute.js";
import questionRouter from "./questionRoute.js";
import quizRouter from "./quizRoute.js";
import scoreRouter from "./scoreRoute.js"

const mainRouter=express.Router();

mainRouter.use("/user",UserRouter);
mainRouter.use("/quiz",quizRouter);
mainRouter.use("/question",questionRouter);
mainRouter.use("/score",scoreRouter);



export default mainRouter;