import express from "express";
import { registerUser, loginUser, googleAuth } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
router.post("/register", registerUser);

// @route   POST /api/auth/login
// @desc    Login user and get token
router.post("/login", loginUser);

// @route   POST /api/auth/google
// @desc    Google OAuth authentication
router.post("/google", googleAuth);

// @route   GET /api/auth/profile
// @desc    Get logged-in user info (protected)
// @access  Private
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Access granted to protected route",
    user: req.user,
  });
});

export default router;