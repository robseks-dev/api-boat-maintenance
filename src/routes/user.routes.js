import { Router } from "express";
import UserController from "../controllers/user.controller.js";
import catchAsync from "../utils/catchAsync.js";

const route = Router();

route.post("/", catchAsync(UserController.create));

export default route;
