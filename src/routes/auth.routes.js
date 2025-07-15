import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import catchAsync from "../utils/catchAsync.js";

const route = Router();

route.get("/verify", catchAsync(AuthController.verify));

route.post("/login", catchAsync(AuthController.login));
route.post("/logout", catchAsync(AuthController.logout));

export default route;
