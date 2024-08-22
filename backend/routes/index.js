import express from 'express';
import UserRouter from "./userRoute.js";
import questionRouter from "./questionRoute.js";
import quizRouter from "./quizRoute.js";
import scoreRouter from "./scoreRoute.js"
import testRouter from './ragRoute.js';
import subscriptionRouter from './subscriptionRoute.js';


const mainRouter=express.Router();

mainRouter.use("/user",UserRouter);
mainRouter.use("/quiz",quizRouter);
mainRouter.use("/question",questionRouter);
mainRouter.use("/score",scoreRouter);
mainRouter.use("/subscription",subscriptionRouter);
// mainRouter.use("/model",testRouter);




export default mainRouter;