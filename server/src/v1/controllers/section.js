const Section = require("../models/section");
const Task = require("../models/task");

// Create a new section within a specific board
exports.create = async (req, res) => {
  const { boardId } = req.params;
  try {
    // Create a new section associated with the specified board
    const section = await Section.create({ board: boardId });
    // Initialize an empty tasks array in the section's data
    section._doc.tasks = [];
    // Return the created section
    res.status(201).json(section);
  } catch (err) {
    res.status(500).josn(err);
  }
};

// Update a section's details
exports.update = async (req, res) => {
  const { sectionId } = req.params;
  try {
    // Update the section with the provided sectionId using the request body
    const section = await Section.findByIdAndUpdate(sectionId, {
      $set: req.body,
    });
    // Initialize an empty tasks array in the section's data
    section._doc.tasks = [];
    // Return the updated section
    res.status(200).json(section);
  } catch (err) {
    res.status(500).josn(err);
  }
};

// Delete a section, including its associated tasks
exports.delete = async (req, res) => {
  const { sectionId } = req.params;
  try {
    // Delete all tasks associated with the section
    await Task.deleteMany({ section: sectionId });
    // Delete the section itself
    await Section.deleteOne({ _id: sectionId });
    // Return a success message
    res.status(200).json("deleted");
  } catch (err) {
    res.status(500).josn(err);
  }
};
