import Express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data";
import User from "../models/UserModel";

const userRouter = Express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createUsers = await User.insertMany(data.users);
    res.send({ createUsers });
  })
);

export default userRouter;
