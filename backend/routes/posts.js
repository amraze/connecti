import express from "express"
import { verifyToken } from "../middleware/auth.js"
import { getFeedPosts, getUserPosts, likePost } from "../controllers/users.js"

const router = express.Router();

router.get('/:id', verifyToken, getFeedPosts);
router.get('/:userId/posts', verifyToken, getUserPosts);
router.patch('/:id/like', verifyToken, likePost);

export default router;
