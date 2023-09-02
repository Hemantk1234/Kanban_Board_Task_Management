const router = require("express").Router();
const { param } = require("express-validator");
const validation = require("../handlers/validation");
const tokenHandler = require("../handlers/tokenHandler");
const boardController = require("../controllers/board");

// Create a new board
router.post(
  "/",
  tokenHandler.verifyToken, // Verify user authentication using JWT
  boardController.create // Controller to create a new board
);

// Get all boards
router.get(
  "/",
  tokenHandler.verifyToken,
  boardController.getAll // Controller to get all boards
);

// Update the positions of boards
router.put(
  "/",
  tokenHandler.verifyToken,
  boardController.updatePosition // Controller to update the positions of boards
);

// Get user's favorite boards
router.get(
  "/favourites",
  tokenHandler.verifyToken,
  boardController.getFavourites // Controller to get user's favorite boards
);

// Update the positions of favorite boards
router.put(
  "/favourites",
  tokenHandler.verifyToken,
  boardController.updateFavouritePosition // Controller to update the positions of favorite boards
);

// Get details of a specific board by ID
router.get(
  "/:boardId",
  param("boardId").custom((value) => {
    // Validation middleware to check for errors
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid id");
    } else return Promise.resolve();
  }),
  validation.validate, // Validation middleware to check for errors
  tokenHandler.verifyToken, // Verify user authentication using JWT token
  boardController.getOne // Controller to get details of a specific board
);

// Update details of a specific board by ID
router.put(
  "/:boardId",
  param("boardId").custom((value) => {
    // Custom validation to check if boardId is a valid ObjectId
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid id");
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  boardController.update // Controller to update details of a specific board
);

// Delete a specific board by ID
router.delete(
  "/:boardId",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid id");
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  boardController.delete // Controller to delete a specific board
);

module.exports = router;
