import express from "express";
import taskControllers from "../controllers/taskControllers.js";

const router = express.Router();

router.post("/tasks", taskControllers.addTask);
router.put("/tasks/:taskId", taskControllers.updateTask);
router.delete("/tasks/:taskId", taskControllers.deleteTask);
router.get("/tasks/board", taskControllers.getAllTasks);

export default router;