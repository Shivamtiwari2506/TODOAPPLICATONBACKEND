import { Task } from "../models/taskModels.js";

const taskControllers = {
  addTask: async (req, res) => {
    try {
      const { title, description, status, priority, assignedTo, dueDate, boardId } = req.body;

      if (!title?.trim() || !description?.trim() || !status || !priority || !dueDate || !boardId) {
        return res.status(400).json({
          success: false,
          message: "Please send all the required fields",
        });
      }
      const isExisting  = await Task.findOne({ title: title.trim(), boardId });
      if(isExisting){
         return  res.status(400).json({
           success: false,
           message: "A task with the same title already exists in this board",
         });
      };

      await Task.create({
        title,
        description,
        status,
        priority,
        assignedTo,
        dueDate,
        boardId,
      });

      res.status(200).json({
        success: true,
        message: "Task added successfully"
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  updateTask: async (req, res) => {
    try {
      const { taskId } = req.params;
      const { title, description, status, priority, assignedTo, dueDate } = req.body;

      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ success: false, message: "Task not found" });
      }
      task.title = title ?? task.title;
      task.description = description ?? task.description;
      task.status = status ?? task.status;
      task.priority = priority ?? task.priority;
      task.assignedTo = assignedTo ?? task.assignedTo;
      task.dueDate = dueDate ?? task.dueDate;

      await task.save();

      res.status(200).json({
        success: true,
        message: "Task updated successfully",
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  deleteTask: async (req, res) => {
   try {
      const {taskId} = req.params;
      if(!taskId){
         return res.status(400).json({ success: false, message: "Task ID is required" });
      }
      await Task.findByIdAndDelete(taskId);
      return res.status(200).json({ success: true, message: "Task deleted successfully" });
   } catch (error) {
      res.status(500).json({ success: false, message: error.message });
   }
  },

  getAllTasks: async (req, res) => {
   try {
     const { boardId } = req.query;
 
     if (!boardId) {
       return res.status(400).json({
         success: false,
         message: "Board ID is required",
       });
     }
 
     const tasks = await Task.find({ boardId });
 
     res.status(200).json({
       success: true,
       message: "Tasks fetched successfully",
       tasks,
     });
   } catch (error) {
     res.status(500).json({
       success: false,
       message: error.message,
     });
   }
 }
};

export default taskControllers;
