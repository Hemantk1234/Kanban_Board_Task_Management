const router = require("express").Router({ mergeParams: true });
const { param, body } = require("express-validator");
const tokenHandler = require("../handlers/tokenHandler");
const validation = require("../handlers/validation");
const taskController = require("../controllers/task");

// Create a new task for a specific section and board
router.post(
  "/",
  param("boardId").custom((value) => {
    // Custom validation to check if boardId is a valid ObjectId
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid board id");
    } else return Promise.resolve();
  }),
  body("sectionId").custom((value) => {
    // Custom validation to check if sectionId is a valid ObjectId
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid section id");
    } else return Promise.resolve();
  }),
  validation.validate, // Validation middleware to check for errors
  tokenHandler.verifyToken, // Verify user authentication using JWT token
  taskController.create // Controller to create a new task
);

// Update the position of tasks within a board
router.put(
  "/update-position",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid board id");
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.updatePosition // Controller to update task positions within a board
);

// Delete a specific task by ID
router.delete(
  "/:taskId",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid board id");
    } else return Promise.resolve();
  }),
  param("taskId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid task id");
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.delete // Controller to delete a specific task
);

// Update details of a specific task by ID
router.put(
  "/:taskId",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid board id");
    } else return Promise.resolve();
  }),
  param("taskId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid task id");
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  taskController.update // Controller to update details of a specific task
);

module.exports = router;
