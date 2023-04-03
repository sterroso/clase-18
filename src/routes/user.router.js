import { Router } from "express";
import * as UserController from "../controllers/user.controller.js";

const router = Router();

router.get("/", UserController.getAllUsers);

router.get("/:userId", UserController.getUserById);

router.get("/email/:email", UserController.getUserByEmail);

router.post("/", UserController.createUser);

router.put("/:userId", UserController.updateUserById);

router.delete("/:userId", UserController.deleteUserById);

export default router;
