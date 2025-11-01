import express from "express";
import { boardControllers } from "../controllers/boardControllers.js";

const router = express.Router();

router.get("/boards", boardControllers.getAllBoards);
router.post("/boards", boardControllers.createBoard);
router.delete("/boards/:boardId", boardControllers.deleteBoard);

export default router;