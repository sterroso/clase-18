import { Router } from "express";
import * as UserController from "../controllers/user.controller.js";

const router = Router();

router.get("/", UserController.getAllUsers);

router.get("/:userId", UserController.getUserById);

router.get("/email/:email", UserController.getUserByEmail);

router.post("/", UserController.createUser);

router.put("/:userId", UserController.updateUserById);

router.put("/:userId/role/:role", UserController.addRoleToUser);

router.delete("/:userId", UserController.deleteUserById);

router.delete("/:userId/role/:role", UserController.removeRoleFromUser);

export default router;
