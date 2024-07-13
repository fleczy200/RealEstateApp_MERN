import express from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.controller.js"
import {verifyToken} from "../middleware/verifyToken.js"
const router = express.Router()

router.get("/", verifyToken, getUsers)
router.get("/:id", verifyToken, getUser)
router.put("/:id", verifyToken, updateUser)
router.post("/:id", verifyToken, deleteUser)

export default router