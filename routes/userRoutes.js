import e from "express";
import * as UserService from '../services/userService.js';

const userRouter = e.Router();

userRouter.get('/', UserService.getUsers);
userRouter.post('/',UserService.createUser);
userRouter.post('/auth',UserService.authenticationUser);
export default userRouter;