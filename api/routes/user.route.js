import express from "express"
import { getUser, getUsers, updateUser, deleteUser, savePost, profilePosts, getNotif } from "../controllers/user.controller.js"
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router()

router.get("/", getUsers)
// router.get("/:id", verifyToken, getUser)
router.get("/profilePosts", verifyToken, profilePosts)
router.put("/:id", verifyToken,updateUser)
router.delete("/:id", verifyToken,deleteUser)
router.post("/save", verifyToken, savePost)
router.get("/notification", verifyToken, getNotif)

export default router;
