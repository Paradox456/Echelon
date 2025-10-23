import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register new user
router.post("/register", registerUser);

// @route   POST /api/users/login
// @desc    Login user and get token
router.post("/login", loginUser);

// @route   GET /api/users/profile
// @desc    Get logged-in user info (protected)
// @access  Private
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Access granted to protected route",
    user: req.user,
  });
});

export default router;

