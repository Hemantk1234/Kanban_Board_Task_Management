const router = require("express").Router();
const userController = require("../controllers/user");
const { body } = require("express-validator");
const validation = require("../handlers/validation");
const tokenHandler = require("../handlers/tokenHandler");
const User = require("../models/user");

// Route for user registration
router.post(
  "/signup",
  // Validation checks for username, password, and confirmPassword
  body("username")
    .isLength({ min: 8 })
    .withMessage("username must be at least 8 characters"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("confirmPassword must be at least 8 characters"),
  // Custom validation to check if username is already used
  body("username").custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("username already used");
      }
    });
  }),
  // Validation middleware to check for errors
  validation.validate,
  // User registration controller
  userController.register
);

// Route for user login
router.post(
  "/login",
  // Validation checks for username and password
  body("username")
    .isLength({ min: 8 })
    .withMessage("username must be at least 8 characters"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
  // Validation middleware to check for errors
  validation.validate,
  // User login controller
  userController.login
);

// Route to verify JWT token and return user data
router.post(
  "/verify-token",
  // Middleware to verify user authentication using JWT token
  tokenHandler.verifyToken,
  (req, res) => {
    // Return user data from the request object
    res.status(200).json({ user: req.user });
  }
);

module.exports = router;
