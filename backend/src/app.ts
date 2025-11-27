import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

// Import routes
import apiRouter from "./routes/authRoutes";        // you’ll create this
// import authRouter from "./routes/auth";  // optional: for authentication

dotenv.config();

const app: Application = express();

// Middlewares
app.use(helmet());                      // security headers
app.use(cors({                          // configure as needed
  origin: process.env.CORS_ORIGIN || "*",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));                 // logging of requests


// Health check / root route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Echelon Backend API 🚀" });
});

// API routes
app.use("/api", apiRouter);
// app.use("/auth", authRouter);        // uncomment if you add auth

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || "Internal Server Error",
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Echelon backend listening on port ${PORT}`);
});

export default app;
