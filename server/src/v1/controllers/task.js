const Task = require("../models/task");
const Section = require("../models/section");

// Create a new task within a specific section
exports.create = async (req, res) => {
  const { sectionId } = req.body;
  try {
    // Find the section associated with the provided sectionId
    const section = await Section.findById(sectionId);

    // Count the number of tasks within the section
    const tasksCount = await Task.find({ section: sectionId }).count();

    // Create a new task associated with the section, and set its position
    const task = await Task.create({
      section: sectionId,
      position: tasksCount > 0 ? tasksCount : 0,
    });
    // Attach the section data to the task for response
    task._doc.section = section;
    // Return the created task
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a task's details
exports.update = async (req, res) => {
  const { taskId } = req.params;
  try {
    // Update the task with the provided taskId using the request body
    const task = await Task.findByIdAndUpdate(taskId, { $set: req.body });
    // Return the updated task
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Delete a task and update positions of remaining tasks in the same section
exports.delete = async (req, res) => {
  const { taskId } = req.params;
  try {
    // Find the current task by taskId
    const currentTask = await Task.findById(taskId);
    // Delete the current task
    await Task.deleteOne({ _id: taskId });
    // Find all tasks in the same section and sort them by position
    const tasks = await Task.find({ section: currentTask.section }).sort(
      "postition"
    );
    // Update positions of the remaining tasks in the same section
    for (const key in tasks) {
      await Task.findByIdAndUpdate(tasks[key].id, { $set: { position: key } });
    }
    // Return a success message
    res.status(200).json("deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update task positions when moving tasks between sections
exports.updatePosition = async (req, res) => {
  const {
    resourceList,
    destinationList,
    resourceSectionId,
    destinationSectionId,
  } = req.body;
  const resourceListReverse = resourceList.reverse();
  const destinationListReverse = destinationList.reverse();
  try {
    // Check if tasks are moved between different sections
    if (resourceSectionId !== destinationSectionId) {
      for (const key in resourceListReverse) {
        // Update section and position for tasks in the resource section
        await Task.findByIdAndUpdate(resourceListReverse[key].id, {
          $set: {
            section: resourceSectionId,
            position: key,
          },
        });
      }
    }
    for (const key in destinationListReverse) {
      // Update section and position for tasks in the destination section
      await Task.findByIdAndUpdate(destinationListReverse[key].id, {
        $set: {
          section: destinationSectionId,
          position: key,
        },
      });
    }
    // Return a success message
    res.status(200).json("updated");
  } catch (err) {
    res.status(500).json(err);
  }
};
