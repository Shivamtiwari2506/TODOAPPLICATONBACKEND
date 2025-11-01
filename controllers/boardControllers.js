import { get } from "mongoose";
import { Board } from "../models/boardModels.js";

export const boardControllers = {
   createBoard: async (req, res) => {
      try {
         const { boardName } = req.body;
         if (!boardName) {
            return res.status(400).json({success: false, message: "Board name is required" });
         }
         const isExist = await Board.find({ boardName });
         if (isExist.length > 0) {
            return res.status(400).json({ success: false, message: `Board  with name ${boardName} already exists` });
         }
         await Board.create({ boardName });
         return res.status(200).json({success: true, message: "Board created successfully"});
      } catch (error) {
         return res.status(500).json({ success: false, message: error.message });
      }
   },
   getAllBoards: async (req, res) => {
      try {
         const boards = await Board.find().sort({ createdAt: -1 });
         if(boards.length === 0){
            return res.status(404).json({ success: false, message: "No boards found. Create new Board" });
         };
         return res.status(200).json({ success: true, boards });
      } catch (error) {
         return res.status(500).json({ success: false, message: error.message });
      }
   },
   deleteBoard: async (req, res) => {
      try {
         const { boardId } = req.params;
        if(!boardId){
         return res.status(400).json({success: false, message: "Board ID is required"});
        }
         await Board.findByIdAndDelete(boardId);
         return res.status(200).json({success: true, message: "Board deleted successfully"})
      } catch (error) {
         return res.status(500).json({success: false, message: error.message});
      }
   }
};