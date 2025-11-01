// index.js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./DB/connectDB.js";
import cors from "cors";

import boardRoutes from "./routes/boardRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api", boardRoutes);
app.use("/api", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
