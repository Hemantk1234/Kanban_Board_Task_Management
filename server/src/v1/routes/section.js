const router = require("express").Router({ mergeParams: true });
const { param } = require("express-validator");
const tokenHandler = require("../handlers/tokenHandler");
const sectionController = require("../controllers/section");
const validation = require("../handlers/validation");

// Create a new section for a specific board
router.post(
  "/",
  param("boardId").custom((value) => {
    // Custom validation to check if boardId is a valid ObjectId
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid id");
    } else return Promise.resolve();
  }),
  validation.validate, // Validation middleware to check for errors
  tokenHandler.verifyToken, // Verify user authentication using JWT token
  sectionController.create // Controller to create a new section
);

// Update details of a specific section by ID
router.put(
  "/:sectionId",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid board id");
    } else return Promise.resolve();
  }),
  param("sectionId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid section id");
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  sectionController.update // Controller to update details of a specific section
);

// Delete a specific section by ID
router.delete(
  "/:sectionId",
  param("boardId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid board id");
    } else return Promise.resolve();
  }),
  param("sectionId").custom((value) => {
    if (!validation.isObjectId(value)) {
      return Promise.reject("invalid section id");
    } else return Promise.resolve();
  }),
  validation.validate,
  tokenHandler.verifyToken,
  sectionController.delete // Controller to delete a specific section
);

module.exports = router;
