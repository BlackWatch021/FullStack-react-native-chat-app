import express from "express";
import authRoutes from "./routes/authRoutes";
import chatRoutes from "./routes/chatRoutes";
import messageRoutes from "./routes/messageRoutes";
import userRoutes from "./routes/userRoutes";
import { clerkMiddleware } from "@clerk/express";
import { errorHandler } from "./middleware/errorHandler";
const app = express();

app.use(express.json()); // To parse incoming requests

app.use(clerkMiddleware());
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "server is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Error handlers always comes after all the routes and other middlwares so they can catch errors passed with next(err) or thrown inside async handlers
app.use(errorHandler);
export default app;
